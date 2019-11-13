import React from 'react';

import './about.css';

import Categories from '../building/categories';
import SupporterLogos from '../components/supporter-logos';

const AboutPage = () => (
    <article>
        <section className="main-col">
            <h1 className="h2">
        Can you help us capture information on every building in London?
            </h1>
            <p>

        How many buildings are there in London? What are their characteristics? Where
        are they located and how do they contribute to the city? How adaptable are
        they? How long will they last, and what are the environmental and
        socio-economic implications of demolition?

            </p>
            <p>

        Colouring London is being designed to address these questions by crowdsourcing
        and visualising information on London’s buildings. We’re releasing the
        prototype for testing in the late summer. See the slideshow below for what it
        will look like.

            </p>
            <div className="buttons-container btn-center">
                <a className="btn btn-outline-dark btn-lg" href="#sign-up">Sign up for updates</a>
            </div>
            <div className="carousel">
                <button className="carousel-control offscreen-text back">Back</button>
                <ul className="carousel-content">
                    <li><img src="images/slide-1-welcome.png" alt="Welcome" /></li>
                    <li><img src="images/slide-2-categories.png" alt="Categories" /></li>
                    <li><img src="images/slide-3-edit.png" alt="Add/edit data" /></li>
                    <li><img src="images/slide-4-view.png" alt="View maps" /></li>
                    <li><img src="images/slide-5-download.png" alt="Download data" /></li>
                    <li><img src="images/slide-6-showcase.png" alt="Showcase" /></li>
                    <li><img src="images/slide-7-partners.png" alt="Partners" /></li>
                </ul>
                <button className="carousel-control offscreen-text next">Next</button>
            </div>
            <div className="buttons-container btn-center">
                <a className="btn btn-outline-dark btn-lg"
                    href="files/colouring-london-online-exhibition.pdf">
               View online exhibition</a>
            </div>
        </section>
        <hr/>
        <section className="main-col">
            <p>

        Colouring London is being designed and built by the Centre for Advanced Spatial
        Analysis (CASA), University College London and funded by Historic England.
        Ordnance Survey is providing building footprints required to collect the data,
        facilitated by the GLA, and giving access to its API and technical support. It
        will launch in 2019.

            </p>
            <SupporterLogos />
        </section>
        <hr/>
        <div className="main-col">
            <h2 className="h1">Data Categories</h2>
            <p>

        12 categories have been chosen in consultation with specialists working in a
        range of areas, from energy analysis and sustainable urban planning and design
        to building conservation, community planning, architecture and historical
        research.

            </p>
            <Categories building_id={2503371} mode="view" />
        </div>
        <hr/>
        <div className="main-col">
            <h2 className="h1">Once built, our platform will allow you to:</h2>
        </div>
        <section className="pale-pink color-block">
            <div className="main-col">
                <h3 className="h2">View maps</h3>
                <p>

            To view the data, navigate to the ‘View Maps’ page and find the category that
            interests you.

                </p>
                <img className="border-image" src="images/slide-4-view.png"
                    alt="Preview of view maps page" />
            </div>
        </section>
        <section className="pale-yellow color-block">
            <div className="main-col">
                <h3 className="h2">Add and edit data</h3>
                <p>

            Find a building and add or edit data for any of the 12 core categories.

                </p>
                <img className="border-image" src="images/slide-3-edit.png"
                    alt="Preview of add/edit data page" />
            </div>
        </section>
        <section className="pale-orange color-block">
            <div className="main-col">
                <h3 className="h2">See how people are using our data</h3>
                <p>

            Find links to visualisations and analysis, art projects and applications
            relating to the evolution of London, housing, energy, planning, heritage and
            history&mdash;or something we haven’t imagined yet.

                </p>
                <img className="border-image" src="images/slide-6-showcase.png"
                    alt="Preview of data showcase page" />
            </div>
        </section>

        <section className="pale-green color-block">
            <div className="main-col">
                <h3 className="h2">Download, remix and reuse</h3>
                <p>

            Access bulk downloads of data created through the project to use and reuse
            under a liberal open data license. Let us know and we’ll feature showcase
            projects on the Colouring London site.

                </p>
                <img className="border-image" src="images/slide-5-download.png"
                    alt="Preview of download page" />
            </div>
        </section>

        <div className="main-col">

            <form id="sign-up" action="https://tinyletter.com/colouringlondon" method="post"
                target="popupwindow"
                onSubmit={function() {window.open(
                    'https://tinyletter.com/colouringlondon',
                    'popupwindow',
                    'scrollbars=yes,width=800,height=600'); return true;}}>
                <h3 className="h1">Keep in touch</h3>
                <p>

        Receive occasional newsletters about the project as it develops. You can
        read previous newsletters in our <a
                        href="https://tinyletter.com/colouringlondon/archive">newsletter archive</a>.

                </p>
                <label htmlFor="tlemail">Enter your email address:</label>
                <input className="form-control" type="email" name="email" id="tlemail" placeholder="name@example.com" />
                <input type="hidden" value="1" name="embed"/>
                <small className="form-text text-muted">
                    <a href="https://tinyletter.com">
            powered by TinyLetter</a>.
            We&rsquo;ll never share your email address.
                </small>
                <div className="buttons-container">
                    <input className="btn btn-outline-dark btn-block" type="submit" value="Sign up for updates" />
                </div>
            </form>
        </div>
    </article>
);

export default AboutPage;
