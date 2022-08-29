import React, { Fragment } from 'react';

import DataTitle from './data-title';
import InfoBox from '../../components/info-box';
import CheckboxDataEntry from '../data-components/checkbox-data-entry';


interface PlanningDataOfficialDataEntryProps {
    value: any; // TODO: proper structuring!
}

const {useState} = React;

const LongText = ({ content,limit}) => {
  const [showAll, setShowAll] = useState(false);

  const showMore = () => setShowAll(true);
  const showLess = () => setShowAll(false);

  if (content.length <= limit) {
    return <div>{content}</div>
  }
  if (showAll) {
    return <div> 
      {content} 
      <br/>
      <b onClick={showLess}>Shorten description</b>
    </div>
  }
  const toShow = content.substring(0, limit).trim() + "... ";
  return <div> 
    {toShow} 
    <br/>
    <b onClick={showMore}>Show full description</b>
  </div>
}

const PlanningDataOfficialDataEntry: React.FC<PlanningDataOfficialDataEntryProps> = (props) => {

    const data = props.value || [];
    if(data.length == 0) {
        return (<Fragment>
                  <InfoBox type='success'>
                  <DataTitle
                    title={"Planning Application Status"}
                    tooltip={null}
                />
                <i>No live planning data available currently for this building polygon via the Planning London DataHub.</i>
                <div>Disclaimer: data is imported from the official source, but Planning London DataHub is known to be incomplete.</div>
                  </InfoBox>
                </Fragment>);
    }
    return (
        <Fragment>
        <InfoBox type='success'>
            <Fragment>
                <DataTitle
                    title={"Planning Application Status"}
                    tooltip={null}
                />
                <b>Current planning application status for this site:</b> {data[0]["status"]}
                <br/>
                <b>Decision date</b>: {data[0]["decision_date"].toString()}
                <br/>
                <b>Description of proposed work</b>: <LongText content = {data[0]["description"]} limit = {400}/> 
                <br/>
                <b>Planning application ID:</b> {data[0]["planning_application_id"]}
                <br/>
                <b>Planning portal link</b>: not provided
                <br/>
                <b>Most recent update by data provider:</b> {data[0]["decision_date"]}
                <br/>
                <b>Data source:</b> <a href={data[0]["data_source_link"]}>{data[0]["data_source"]}</a>
                <br/>
                <div>Disclaimer: data is imported from the official source, but Planning London DataHub is known to be incomplete.</div>
                <CheckboxDataEntry
                title="Show conservation area layer (Ian Hall dataset)"
                slug="planning_recent_outcome"
                value={null}
                disabled={true}
                />
            </Fragment>
        </InfoBox>
        </Fragment>
        );
};

export default PlanningDataOfficialDataEntry;
