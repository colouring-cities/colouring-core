import React, { useEffect, useState } from 'react';
import DataEntry from '../data-components/data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
import { apiGet } from '../../apiHelpers';
import { Dataset } from '../../../api/models/categorydependencymodel';

const fetchDynamicFormGeneratorData = async (categoryId: number): Promise<any | null> => {
  try {
    const data = await apiGet(`/api/categories/dependencies/${categoryId}`);
    console.log('Fetched dataset:', data);
    return data;
  } catch (error) {
    console.error('Error loading dataset:', error);
    return null;
  }
};

// Recursive function to render subcategories and their children
const renderSubcategories = (subcategories, props) => {
  return subcategories.map((subcategory) => (
    <DataEntryGroup key={subcategory.id} name={subcategory.name} collapsed={props.subcat !== subcategory.id}>
      {/* Render fields */}
      {subcategory.fields.map((field) => {
        switch (field.type) {
          case "Select":
            return (
              <SelectDataEntry
                key={field.slug}
                title={field.title}
                slug={field.slug}
                value={props.building[field.slug]}
                tooltip={field.tooltip}
                options={field.options}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
              />
            );
          case "DataEntry":
            return (
              <DataEntry
                key={field.slug}
                title={field.title}
                slug={field.slug}
                value={props.building[field.slug]}
                tooltip={field.tooltip}
                placeholder={field.placeholder}
                isUrl={field.isUrl}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
              />
            );
          case "Verification":
            return (
              <Verification
                key={field.slug}
                slug={field.slug}
                allow_verify={
                  props.user !== undefined && props.building[field.slug] !== null && !props.edited
                }
                onVerify={props.onVerify}
                user_verified={props.user_verified[field.slug]}
                user_verified_as={props.user_verified[field.slug]}
                verified_count={props.building.verified[field.slug]}
              />
            );
          case "Logical":
            return (
              <LogicalDataEntry
                key={field.slug}
                title={field.title}
                slug={field.slug}
                value={props.building[field.slug]}
                tooltip={field.tooltip}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
              />
            );
          default:
            return null;
        }
      })}
      {/* Recursively render child subcategories */}
      {subcategory.children && renderSubcategories(subcategory.children, props)}
    </DataEntryGroup>
  ));
};

const DynamicFormGenerator: React.FunctionComponent<{ categoryId: number; props: any }> = ({ categoryId, props }) => {
  const [dataset, setDataset] = useState<Dataset | null>(null);

  useEffect(() => {
    const loadDataset = async () => {
      const data = await fetchDynamicFormGeneratorData(categoryId);
      setDataset(data);
    };
    loadDataset();
  }, [categoryId]);

  console.log('Dataset:', dataset);

  if (!dataset || !dataset.subcategories || dataset.subcategories.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <form>
      {renderSubcategories(dataset.subcategories, props)}
    </form>
  );
};

export default DynamicFormGenerator;
