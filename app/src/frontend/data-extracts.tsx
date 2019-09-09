import React, { FunctionComponent } from 'react';

import { dateReviver } from '../helpers';

interface ExtractViewModel {
    extract_id: number;
    extracted_on: Date;
    download_path: string;
}

interface DataExtractsState {
    latestExtract: ExtractViewModel;
    previousExtracts: ExtractViewModel[];
}

export default class DataExtracts extends React.Component<{}, DataExtractsState> {
    constructor(props) {
        super(props);

        this.state = {
            latestExtract: undefined,
            previousExtracts: undefined
        };
    }

    async componentDidMount() {
        const res = await fetch('/api/extracts');
        const data = JSON.parse(await res.text(), dateReviver);
        const extracts = (data.extracts as ExtractViewModel[])
            .sort((a, b) => a.extracted_on.valueOf() - b.extracted_on.valueOf())
            .reverse();

        

        this.setState({ latestExtract: extracts[0], previousExtracts: extracts.slice(1) });
    }

    render() {
        return (
            <article>
                <section className="main-col">
                    <h1 className="h2">Open data extracts</h1>
                    <p>Choose one of the links below to download an archive containing the open data collected on the Colouring London platform</p>
                    {
                        this.state.latestExtract == undefined ?
                            <p>Loading extracts...</p> :
                            <div>
                                <h1 className="h3">Latest extract</h1>
                                <ExtractDownloadLink {...this.state.latestExtract} />
                            </div>
                    }
                    {
                        this.state.previousExtracts && this.state.previousExtracts.length > 0 ?
                            (<div>
                                <h1 className="h3">Older extracts</h1>
                                <ul>
                                {
                                    this.state.previousExtracts.map(e => 
                                        <li>
                                            <ExtractDownloadLink {...e} />
                                        </li>
                                    )
                                }
                                </ul>
                            </div>) : 
                            null
                    }

                </section>
            </article>
        );
    }
}


const ExtractDownloadLink: FunctionComponent<ExtractViewModel> = (props) => (
    <p><a href={props.download_path}>Extracted on {props.extracted_on.toDateString()}</a></p>
);
