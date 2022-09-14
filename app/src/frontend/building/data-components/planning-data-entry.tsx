import React, { Fragment } from 'react';

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
                  <DataTitle
                    title={"Planning Application Status"}
                    tooltip={null}
                  />
                  <InfoBox type='success'>
                  <i>No live planning data available currently for this building polygon via the Planning London DataHub.</i>
                  <Disclaimer />
                  </InfoBox>
                </Fragment>);
    }
    return (
        <Fragment>
        <InfoBox type='success'>
            <Fragment>
                <b>Current planning application status for this site:</b> {data[0]["status"]}
                <br/>
                <div><b>Planning application ID:</b> {data[0]["planning_application_id"]}</div>
                <b>Date registered by the planning authority (validation date)</b>: TODO
                <b>Decision date</b>: {data[0]["decision_date"].toString()}
                <div><b>Description of proposed work</b>: <LongText content = {data[0]["description"]} limit = {400}/></div>
                <div><b>Most recent update by data provider:</b> {data[0]["decision_date"]}</div>
                <div><b>Data source:</b> <a href={data[0]["data_source_link"]}>{data[0]["data_source"]}</a></div>
                <Disclaimer />
                <div className="form-check">
                <label
                    className="form-check-label">
                    Show conservation areas from '<a href="http://www.bedfordpark.net/leo/planning/">English Conservation Area dataset 2020</a>' by Ian Hall."
                    <input className="form-check-input" type="checkbox"
                        checked={false}
                        disabled={true}
                        />
                </label>
                </div>
 
            </Fragment>
        </InfoBox>
        </Fragment>
        );
};

export default PlanningDataOfficialDataEntry;
