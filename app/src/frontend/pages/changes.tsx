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

function getNavigationUrl(options: {
    afterId?: string,
    beforeId?: string,
    deletions?: string
}) {
    let query = '?';
    let params = [];
    if(options == undefined) return query;

    if(options.afterId != undefined) params.push(`after_id=${options.afterId}`);
    if(options.beforeId != undefined) params.push(`before_id=${options.beforeId}`);
    if(options.deletions != undefined) params.push(`deletions=${options.deletions}`);

    return query + params.join('&');
}

const ChangesPage = (props: RouteComponentProps) => {
    let { after_id, before_id, deletions } = parse(props.location.search);

    if(deletions instanceof Array) deletions = deletions[0];

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

            if(deletions) {
                url = `${url}&deletions=${deletions}`;
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
                        <Link
                            className='edit-history-link'
                            to={getNavigationUrl({
                                afterId: paging.id_for_newer_query,
                                deletions: deletions
                            })}
                        >Show more recent changes</Link>
                }
                {
                    (after_id || before_id) &&
                        <Link
                            className='edit-history-latest-link'
                            to={getNavigationUrl({
                                deletions: deletions
                            })}
                        >Show latest changes</Link>
                }
                <ul className="edit-history-list">
                    {
                        deletions === 'true' &&
                            <InfoBox msg="Showing only changes with at least one deletion" /> 
                    }
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
                        <Link to={getNavigationUrl({
                            beforeId: paging.id_for_older_query,
                            deletions: deletions
                        })}>Show older changes</Link>
                }
            </section>
        </article>
    );
};

export default ChangesPage;
