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

const Disclaimer = () => { return <Fragment><div>Disclaimer: Planning application status is visualised using data uploaded by local authorities to the <a href="https://data.london.gov.uk/dataset/planning-london-datahub?_gl=1%2aprwpc%2a_ga%2aMzQyOTg0MjcxLjE2NTk0NDA4NTM">Greater London Authority's Planning London DataHub</a>. Please note that these data are currently incomplete and also often do not provide information on minor alterations. For comprehensive information on all applications please visit the UK Planning Portal site.</div></Fragment> }

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
                  <Disclaimer />
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
                <div><b>Description of proposed work</b>: <LongText content = {data[0]["description"]} limit = {400}/></div>
                <div><b>Planning application ID:</b> {data[0]["planning_application_id"]}</div>
                <div><b>Planning portal link</b>: not provided</div>
                <div><b>Most recent update by data provider:</b> {data[0]["decision_date"]}</div>
                <div><b>Data source:</b> <a href={data[0]["data_source_link"]}>{data[0]["data_source"]}</a></div>
                <Disclaimer />
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
