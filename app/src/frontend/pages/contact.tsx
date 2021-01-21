import React from 'react';


const ContactPage = () => (
    <article>
        <section className="main-col">
            <h1 className="h2">
                Contact
            </h1>
            <p> Colouring London has been designed as a sustainable, low-cost model for knowledge exchange/open data platforms able to be reproduced by other towns and cities using our open platform code.</p>

            <p> It is being developed by a small, dedicated team at The Alan Turing Institute. We are unable to answer individual queries but welcome constructive comments on how to improve the site, and on other types of data and new features you might like to see.</p>

            <p> You can send us comments or ask questions on our discussion threads at <a href="https://discuss.colouring.london/">https://discuss.colouring.london/</a>.</p>

            <p> To view our technical site and platform code please visit Github at: <a href="https://github.com/colouring-london/colouring-london">https://github.com/colouring-london/colouring-london</a>.</p>

            <p>For press enquiries please contact <a href="https://www.turing.ac.uk/contact-us/press-office">The Alan Turing Institute press office</a></p>

            <p>
            If you capture images from the maps on Colouring London, please credit our
            contributors (who collected the data) and Ordnance Survey
            (who provided the basemaps and building geometries) as follows:
            </p>
            <p>
            <pre><code>
            Colouring London https://colouring.london Building attribute data is © Colouring London contributors. Maps contain OS data © Crown copyright: OS Maps baselayers and building outlines.
            </code></pre>
            </p>
            <hr />
            <p>
                <img className="d-block mx-auto" src="images/logo-cl.png"></img>
            </p>
        </section>
    </article>
);

export default ContactPage;
