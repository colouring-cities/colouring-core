import express from 'express';
import { fetchCategoryDependencies, fetchMaincategories } from '../dataAccess/categories'; // Import the reusable function
import asyncController from '../routes/asyncController';
import { parsePositiveIntParam, processParam } from '../parameters';
/**
 * Controller to handle API requests for fetching hierarchical category dependencies.
 */

export const getCategoryDependencies =asyncController( async (req: express.Request, res: express.Response): Promise<void> => {
    const categoryId = processParam(req.params, 'category_id', parsePositiveIntParam, true);
    try {
        console.log("controller") 
        // Call the reusable data access function
        const dataset = await fetchCategoryDependencies(categoryId);
        console.log(dataset)
        // Send the structured dataset as a JSON response
        res.status(200).json(dataset);
    } catch (error) {
        console.error('Error in getCategoryDependencies controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export const getMainCategories= asyncController(async (req:express.Request, res:express.Response):Promise<void>=>
{
    try{

        console.log("asyncController")
        const mainCategories= await fetchMaincategories();
        res.status(200).json(mainCategories);
    } 
     catch (error) {
        console.error('Error in getMainCategories controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});
