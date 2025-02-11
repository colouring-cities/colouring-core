
import withCopyEdit from "../data-container";
import { dataFields } from "../../config/data-fields-config";
import { CategoryViewProps } from './category-view-props';

import React, { useEffect, useState } from "react";

import DynamicFormGenerator from './DynamicFormGenerator'; // Adjust path as needed
import  {useCategory} from '../../../frontend/Category-contetxt'






const dynamicCategoryView: React.FunctionComponent<CategoryViewProps> = (props) => {
  console.log("EnergyPerformanceView")

  const categoryId =Number( useCategory().categoryId)//Number(props.category_id);
  console.log(categoryId)
  return (<div><DynamicFormGenerator categoryId={categoryId} props={props} /></div>)
   
};

const dynamicCategoryContainer = withCopyEdit(dynamicCategoryView);

export default dynamicCategoryContainer;
