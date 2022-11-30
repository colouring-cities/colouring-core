import React from 'react';
import { Link } from 'react-router-dom';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

const ContributorAgreementPage : React.SFC<any> = () => (
    <article>
        <section className='main-col'>
            <h1>Contributor Agreement</h1>

            <h2 className='h2'>Contributor responsibilities</h2>
            
            <p>
            We ask all our contributors to:
            </p>
            <ul>
                <li>
                adhere to our Code of Conduct
                </li>
                <li>
                never knowingly add data that derives from a restricted, copyrighted, malicious or illegal source
                </li>
                <li>
                help us create an open data platform that supports the development of sustainable, resilient, inclusive, and equitable cities, and encourages the use of data for the public good
                </li>
                <li>
                add sources wherever possible, to benefit others
                </li>
                <li>
                verify data, whenever possible, to benefit others
                </li>
                <li>
                ensure our open licencing terms are fully adhered to with regard to our open data, and our open code
                </li>
                <li>
                provide us with as little personal data as possible
                </li>
                <li>
                take full responsibility for assessing the reliability of Colouring {config.cityName} data and its suitability for any intended use (see also our 'Data Accuracy Agreement')
                </li>
                <li>
                provide feedback on actual or potential privacy and security concerns
                </li>
            </ul>

            <h2 className='h2'>Additional notes for contributors</h2>

            <h3 className='h3'>Open data</h3>
            <p>
                Colouring {config.cityName} is an open data project. Open data are licensed under the Open Data Commons Open Database License (<a href="https://opendatacommons.org/licenses/odbl/">https://opendatacommons.org/licenses/odbl/</a>) by Colouring {config.cityName} contributors. Under this licence you are free to copy, distribute, transmit and adapt our data, as long as you credit Colouring {config.cityName} and our contributors. If you alter or build upon our data, you may distribute the result only under the same licence. Our open platform code are available under a GNU, General Public Licence (<a href="https://www.gnu.org/licenses/gpl-3.0.en.html">https://www.gnu.org/licenses/gpl-3.0.en.html</a>).
            </p>

            <h3 className='h3'>What you are contributing to</h3>
            
            <p>
                Colouring {config.cityName} is a free knowledge exchange platform and open database designed for public use. It has been set up to support a whole-of-society approach to improving the sustainability, resilience and inclusivity of cities. Colouring London is also the prototype platform for the international Colouring Cities Research Programme (CCRP) run at the Alan Turing Institute. Its design is guided by principles set out in the United Nations New Urban Agenda, the Open Data Charter, the General Data Protection Regulation (GDPR), The Gemini Principles, the Open Data Institute's recommendations on personal data and data infrastructure, and specific Articles within the Declaration of Human rights. These are discussed on our <a href="https://github.com/colouring-london/colouring-london/issues/687">'Data ethics'</a> page, where we also use the Open Data Institute's data ethics canvas to answer questions on how we use and manage our data. We capture spatial statistics and do not collect text or images, though images may be integrated in the future. The type of spatial data we collect can be viewed by clicking on each data category, on 'Info' buttons and on the 'Building data categories' page. We are also planning a 'Showcase section' to enable platform users to share, and view, ways in which Colouring {config.cityName} data are used.
            </p>

            <h3 className='h3'>Diversity and inclusivity</h3>

            <p>
                We are very grateful for all constructive contributions provided by our contributors. Our platform is designed for everyone, and we are working to make it as inclusive, welcoming and accessible as possible. We respect and actively seek diversity of contributors and audiences, and celebrate diversity of knowledge. We use colour, crowdsourcing, and non-technical language to reduce barriers to the contribution of statistical information and to make the process rewarding and interesting. Diversity of age, gender, skills and abilities, and cultural background is also essential to allow us, as communities, to make our cities and towns more inclusive, equitable, sustainable and resilient places. Our collective knowledge on the composition, dynamic behaviour and energy performance of our stocks, and how well our buildings work, is critical to inform policies on what buildings we should reuse, demolish and build anew, to accelerate retrofit, and to better understand stocks as dynamic systems, so that they may be improved.
            </p>

            <h3 className='h3'>Copyright and data accuracy and quality</h3>
            
            <p>
                We are unable to accept any data derived from copyrighted or restricted sources, other than those covered by fair use, nor from illegal sources, and we ask contributors to carefully check sources prior to upload. We are also unable to take responsibility for the quality of datasets as it is not feasible to check each data entry, and as different degrees of accuracy and precision will be required by different users, depending on what they are using the data for (e.g. a school project or scientific paper). However our aim is to make our data as reliable and useful as possible. We therefore ask contributors to include sources and to verify other data entries wherever possible.
            </p>

            <p>
                For information on data privacy and security please see our Privacy and Security page.
            </p>


            <div className="buttons-container">
                <Link to="sign-up.html" className="btn btn-outline-dark">Back to sign up</Link>
            </div>
        </section>
    </article>
);

export default ContributorAgreementPage;
