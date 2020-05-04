import { parse } from 'query-string';
import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import './changes.css';

import { apiGet } from '../apiHelpers';
import { BuildingEditSummary } from '../building/edit-history/building-edit-summary';
import ErrorBox from '../components/error-box';
import InfoBox from '../components/info-box';
import { EditHistoryEntry } from '../models/edit-history-entry';

interface PagingInfo {
    id_for_older_query: string;
    id_for_newer_query: string;
}

const recordsPerPage = 20;

const ChangesPage = (props: RouteComponentProps) => {
    const { after_id, before_id } = parse(props.location.search);

    const [history, setHistory] = useState<EditHistoryEntry[]>();
    const [paging, setPaging] = useState<PagingInfo>();
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setHistory(null);
            setPaging(null);

            let url = `/api/history?count=${recordsPerPage}`;
            if(after_id) {
                url = `${url}&after_id=${after_id}`;
            }

            if (before_id) {
                url = `${url}&before_id=${before_id}`;
            }
            try {
                const {history, paging, error} = await apiGet(url);

                if(error) {
                    setError(error);
                } else {
                    setHistory(history);
                    setPaging(paging);
                }
            } catch (err) {
                console.error('Connection problem. Please try again later...');
                setError(err);
            }

        };

        fetchData();
    }, [props.location.search]);

    return (
        <article>
            <section className="main-col">
                <h1>Global edit history</h1>

                {
                    paging?.id_for_newer_query &&
                        <Link className='edit-history-link' to={`?after_id=${paging.id_for_newer_query}`}>Show more recent changes</Link>
                }
                {
                    (after_id || before_id) &&
                        <Link className='edit-history-latest-link' to='?'>Show latest changes</Link>
                }
                <ul className="edit-history-list">
                    {
                        error &&
                            <ErrorBox msg={error}></ErrorBox>
                    }
                    {
                        error == undefined && history == undefined &&
                            <InfoBox msg="Loading history..."></InfoBox>
                    }
                    {
                        (history?.length === 0) &&
                            <InfoBox msg="No changes so far"></InfoBox>
                    }
                    {
                        (history != undefined && history.length > 0) &&
                        history.map(entry => (
                            <li key={`${entry.revision_id}`} className="edit-history-list-element">
                                <BuildingEditSummary
                                    historyEntry={entry}
                                    showBuildingId={true}
                                    hyperlinkCategories={true}
                                />
                            </li>
                        ))
                    }
                </ul>
                {
                    paging?.id_for_older_query &&
                        <Link to={`?before_id=${paging.id_for_older_query}`}>Show older changes</Link>
                }
            </section>
        </article>
    );
};

export default ChangesPage;
