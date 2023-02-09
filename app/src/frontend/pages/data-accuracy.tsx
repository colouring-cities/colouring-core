import React from 'react';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

const DataAccuracyPage = () => (
    <article>
        <section className="main-col">
            <h1 className="h2">Data Accuracy Agreement</h1>
            <p>
            Colouring {config.cityName} data are provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, accuracy, fitness for a particular purpose and non-infringement. In no event shall the Alan Turing Institute be liable for any reliance that you place on or how you use the data nor any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the data or the use or other dealings in the data.
            </p>
            <p>
            Colouring {config.cityName} data are crowdsourced from multiple sources and may contain errors. Though we cannot comment on data accuracy, we try to include as many features as possible to help users assess their reliability and suitability for specific types of use (be this a school project or scientific paper). As information on sources is very important, contributors are asked to add these, and to verify data, wherever possible.
            </p>
        </section>
    </article>
);

export default DataAccuracyPage;
