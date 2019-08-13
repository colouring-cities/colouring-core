import React from 'react';

const ContributorAgreementPage : React.SFC<any> = () => (
    <article>
        <section className='main-col'>
            <h1 className='h3'><em>This is a draft contributor agreement.</em></h1>

            <h1 className='h2'>Open data</h1>

            <p>
                Colouring London contributions are open data, licensed under the Open Data Commons Open Database License(ODbL) by Colouring London contributors.
            </p>
            <p>
                You are free to copy, distribute, transmit and adapt our data, as long as you credit Colouring London and our contributors.If you alter or build upon our data, you may distribute the result only under the same licence.
            </p>
        </section>
        
        <section className='main-col'>
            <h1 className='h2'>Your contributions</h1>

            <p>
                Colouring London emphasises local and community knowledge.Contributors use a variety of sources and local and expert knowledge of buildings to contribute data and verify that Colouring London is accurate and up to date.
            </p>
            <p>
                When you contribute to Colouring London, you make your contributions available as open data for anyone to copy, distribute, transmit and adapt in line with the licence.
            </p>
            <p>
                We are unable to accept any data derived from copyright or restricted sources, other than as covered by fair use.
            </p>
            <p>
                We encourage full attribution of data sources where appropriate - more details on potential sources are documented with suggestions for each data category
            </p>
            <p>
                When you make a contribution to Colouring London, you are creating a permanent, public record of all data added, removed, or changed by you.The database records the username and ID of the user making the edit, along with the time and date of the change.All of this information is also made publicly available through the website and through bulk downloads of the edit history.
            </p>
        </section>
    </article>
)

export default ContributorAgreementPage;
