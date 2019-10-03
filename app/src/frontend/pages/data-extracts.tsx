import React, { FunctionComponent } from 'react';

import { dateReviver } from '../../helpers';
import { Link } from 'react-router-dom';

interface ExtractViewModel {
    extract_id: number;
    extracted_on: Date;
    download_path: string;
}

interface DataExtractsState {
    extracts: ExtractViewModel[];
    latestExtract: ExtractViewModel;
    previousExtracts: ExtractViewModel[];
}

export default class DataExtracts extends React.Component<{}, DataExtractsState> {
    constructor(props) {
        super(props);

        this.state = {
            extracts: undefined,
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



        this.setState({ extracts: extracts, latestExtract: extracts[0], previousExtracts: extracts.slice(1) });
    }

    render() {

        return (
            <article>
                <section className="main-col">
                    <h1 className="h2">Open data extracts</h1>
                    <p>
                    Colouring London contributions are open data, licensed under the <a href="http://opendatacommons.org/licenses/odbl/">Open Data Commons Open Database License</a> (ODbL) by Colouring London contributors.
                    </p>
                    <p>
                    You are free to copy, distribute, transmit and adapt our data, as long as you credit Colouring London and our contributors. If you alter or build upon our data, you may distribute the result only under the same licence.
                    </p>
                    <p>
                    Choose one of the links below to download an archive containing the open data collected on the Colouring London platform.
                    </p>
                    <p>
                    By downloading data extracts from this site, you agree to the <Link to="/data-accuracy.html">data accuracy agreement </Link>.
                    </p>
                    {
                        this.state.extracts == undefined ?
                            <p>Loading extracts...</p> :
                            (
                                this.state.extracts.length === 0 ?
                                    <p>No extracts available</p> :
                                    null
                            )
                    }
                    {
                        this.state.latestExtract != undefined ?
                            <div>
                                <h1 className="h3">Latest extract</h1>
                                <ExtractDownloadLink {...this.state.latestExtract} />
                            </div> :
                            null
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
