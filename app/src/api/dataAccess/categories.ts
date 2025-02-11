import { ITask } from 'pg-promise';
import db from '../../db';
import { DatabaseError } from '../errors/general';

/**
 * Fetch all category dependencies and structure them hierarchically.
 */

export async function fetchMaincategories() {
  try {
    const main_categoriesc = await db.manyOrNone(`
    SELECT id, label as name, description as aboutUrl , false as inactive, color
    FROM main_categories
    ORDER BY main_categories.order ASC`);
    return (main_categoriesc)
  }
  catch (error) {
    console.error('Error fetching main_categoris dependencies:', error);
    throw new DatabaseError(error);
  }

}
export async function fetchCategoryDependencies(categoryId: number, t?: ITask<any>): Promise<any> {
  console.log(`Fetching data for categoryId: ${categoryId}`);
  try {

    // Fetch categories
    const categories = await (t || db).manyOrNone(`
      SELECT id, label as name 
      FROM main_categories  
      WHERE id = $1;
    `, [categoryId]);

    // Fetch subcategories
    const subcategories = await (t || db).manyOrNone(`
      SELECT id, main_category_id as category_id, parent_id, label as name 
      FROM subcategories 
      WHERE main_category_id = $1;
    `, [categoryId]);

    // Fetch fields
    const fields = await (t || db).manyOrNone(`
  SELECT 
    subcategory_fields.id AS id,
    subcategory_fields.subcategory_id,
    subcategory_fields.type,
    subcategory_fields.label AS title,
    subcategory_fields.id AS slug,
    subcategory_fields.hint AS tooltip,
    subcategory_fields.options,
    subcategory_fields.hint AS placeholder,
    0 AS is_url
    FROM 
        subcategory_fields
    JOIN 
        subcategories 
    ON 
        subcategory_fields.subcategory_id = subcategories.id
    WHERE 
        subcategories.main_category_id = $1
    ORDER BY 
        subcategory_fields.order Desc;

    `, [categoryId]);

    // Build hierarchical structure for subcategories
    const buildHierarchy = (parentId: number | null) => {
      return subcategories
        .filter((subcategory) => subcategory.parent_id === parentId)
        .map((subcategory) => ({
          id: subcategory.id,
          name: subcategory.name,
          categoryId: subcategory.category_id,
          fields: fields
            .filter((field) => field.subcategory_id === subcategory.id)
            .map((field) => ({
              type: field.type,
              title: field.title,
              slug: field.slug,
              tooltip: field.tooltip,
              options: field.options ? field.options.split(',') : [],
              placeholder: field.placeholder,
              isUrl: field.is_url,
            })),
          children: buildHierarchy(subcategory.id), // Recursively build children
        }));
    };

    // Build dataset
    const dataset = {
      subcategories: buildHierarchy(null),
       };

    return dataset;
  } catch (error) {
    console.error('Error fetching category dependencies:', error);
    throw new DatabaseError(error);
  }
}
