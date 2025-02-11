
import withCopyEdit from "../data-container";
import { dataFields } from "../../config/data-fields-config";
import { CategoryViewProps } from './category-view-props';

import React, { useEffect, useState } from "react";

import DynamicFormGenerator from './DynamicFormGenerator'; 





const EnergyPerformanceView: React.FunctionComponent<CategoryViewProps> = (props) => {
  console.log("EnergyPerformanceView")
  console.log(props.category_id)
  const categoryId = Number(props.category_id);
  return (<div><DynamicFormGenerator categoryId={categoryId} props={props} /></div>)
 
  
};

const EnergyPerformanceContainer = withCopyEdit(EnergyPerformanceView);

export default EnergyPerformanceContainer;
