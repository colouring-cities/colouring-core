import React, { Fragment } from 'react';

import InfoBox from '../../components/info-box';
import CheckboxDataEntry from '../data-components/checkbox-data-entry';

interface PlanningDataOfficialDataEntryProps {
    shownData: {
      uprn: string;
      building_id: number;
      status?: string,
      status_before_aliasing?: string,
      description?: string;
      planning_application_link?: string;
      registered_with_local_authority_date?: string;
      decision_date?: string;
      last_synced_date?: string;
      data_source: string;
      data_source_link?: string;
      address?: string;
  }[];
    allEntryCount: number,
}

const {useState} = React;

const LongText = ({ content,limit}) => {
  const [showAll, setShowAll] = useState(false);

  const showMore = () => setShowAll(true);
  const showLess = () => setShowAll(false);

  if (content == null) {
    return <div>{MissingData}</div>
  }

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

const Disclaimer = () => { return <Fragment><i><div><u>Disclaimer</u>: Not all applications for London are displayed. Some boroughs do not yet provide planning data to the GLA. For comprehensive information on applications please visit the relevant local authority's planning website.</div></i></Fragment> }

const MissingData = "not provided by data source"

function ShowIfAvailable(data) {
  return <>{data ? data.toString() : MissingData }</>
}

const LinkIfAvailable = (link) => {
  return <>{link ? <a href={link.toString()}>{link.toString()}</a> : MissingData }</>
}

const StatusInfo = ({status, statusBeforeAliasing}) => {
  if(status == null) {
    return <>{LinkIfAvailable(null)}</>
  }
  if(status != statusBeforeAliasing) {
    return <>{status} - status in data source was: {statusBeforeAliasing}</>
  }
  return <>{status}</>
}

const PlanningDataOfficialDataEntry: React.FC<PlanningDataOfficialDataEntryProps> = (props) => {
    const data = props.shownData || [];
    if(data.length == 0) {
      if (props.allEntryCount == 0) {
        return (<Fragment>
                  <div className={`alert alert-dark`} role="alert" style={{ fontSize: 13 }}>
                    <Disclaimer />
                  </div>
                  <InfoBox type='success'>
                  No live planning data available currently for this building polygon via the Planning London DataHub.
                  </InfoBox>
                </Fragment>);
    } else {
      return (<Fragment>
                  <div className={`alert alert-dark`} role="alert" style={{ fontSize: 13 }}>
                    <Disclaimer />
                  </div>
                <InfoBox type='success'>
                No live planning data for this date range, but this building has associated planning data now shown here.
                </InfoBox>
              </Fragment>);
    }
  }
  return <>
        <InfoBox type='info'>
          To see planning applications visualised for different periods click on the map key dropdown.
        </InfoBox>
        <div className={`alert alert-dark`} role="alert" style={{ fontSize: 13 }}>
          {/* TODO: data[0] is problematic here... Compute it from listed elements and show all distinct variants? Error if they are not distinct? Hardcode it? */}
          <div>
            Planning application status is streamed using live data uploaded by local authorities to {data[0]["data_source_link"] ? <a href={data[0]["data_source_link"]}>{data[0]["data_source"]}</a> : data[0]["data_source"] }.
          </div>
          <Disclaimer />
          <br/>
        </div>
        {data.map((item) => (
        <Fragment>
        <InfoBox type='success'>
            <Fragment>
                <div><b>Current planning application status for this site:</b> <StatusInfo 
                  statusBeforeAliasing={item["status_before_aliasing"]}
                  status={item["status"]}
                /></div>
                {item["status_explanation_note"] ? <div><b>Explanation</b>: {item["status_explanation_note"]}</div> : <></>}
                <div><b>Planning application ID:</b> {ShowIfAvailable(item["planning_application_id"])}</div>
                <div><b>Date registered by the planning authority (validation date)</b>: {ShowIfAvailable(item["registered_with_local_authority_date"])}</div>
                <div><b>Decision date</b>: {ShowIfAvailable(item["decision_date"])}</div>
                <div><b>Planning application link</b>: {LinkIfAvailable(item["planning_application_link"])}</div>
                <div><b>Description of proposed work</b>: {item["description"] ? <LongText content = {item["description"]} limit = {400}/> : MissingData}</div>
                <div><b>Address of the location as provided by local authority:</b> {ShowIfAvailable(item["address"])}</div>
                <div><b>Most recent update by data provider:</b> {ShowIfAvailable(item["decision_date"])}</div>
                <br/>
            </Fragment>
        </InfoBox>
        </Fragment>
        )
      )
  }</>
};

export default PlanningDataOfficialDataEntry;
