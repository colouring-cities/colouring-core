import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.SFC<any> = () => (
    <article>
        <section className='main-col'>
            <h1 className='h1'>Privacy Policy & Platform Security</ h1>
            <h2 className='h2'>Colouring London Privacy Policy with respect to personal data</h2>
            <p>
                This privacy policy explains how Colouring London uses the personal data we collect from you when you use our website. Colouring London is a research project initially developed by the Bartlett Centre for Advanced Spatial Analysis (CASA) at UCL, and now run at The Alan Turing Institute. Colouring London is registered for data protection purposes with The Alan Turing Institute data protection office.
            </p>

            <h2 className='h2'>What data do we collect?</h2>
            <p>
                Colouring London collects the following personal data:
            </p>
            <p>
                A username and email address. We recommend you do not use your actual name for your username. We also collect your password, which is stored as a cryptographic hash unique to Colouring London.
            </p>

            <h2 className='h2'>How do we collect your data?</h2>
            <p>
                You provide Colouring London with a minimal amount of personal data when you register with the website and accepts the terms and conditions including this privacy policy.
            </p>

            <h2 className='h2'>What purposes do we use your data?</h2>
            <p>
                Colouring London uses your personal data to enable you to login to access and contribute to the Colouring London project and to provide a personalised user experience when you are logged in. We will not share your personal data (such as your email address) with any other parties or use your personal data for any purposes other than the Colouring London project.
            </p>
            <p>
                If you request a password reset, an automated email will be sent using <a href="https://www.mailgun.com/">Mailgun</a>, who process the email in order to deliver it to your email address. Mailgun retain personal data they process on behalf of Colouring London for as long as is needed to provide email services. Mailgun will retain the personal information as necessary to comply with their legal obligations, resolve disputes, and enforce their agreements.
            </p>

            <h2 className='h2'>What is the legal basis for processing your data?</h2>
            <p>
                Data protection laws require us to meet certain conditions before we are allowed to use your data in the manner described in this notice, including having a ‘legal basis’ for the processing. Colouring London, as a research project, is processing your personal data in pursuance of its legitimate interests.
            </p>

            <h2 className='h2'>How do we store your data?</h2>
            <p>
                Colouring London stores your data at The Alan Turing Institute in London behind the organisation’s firewall in a secure database using industry standard practices.
            </p>

            <h2 className='h2'>How do we use cookies?</h2>
            <p>
                Colouring London only uses cookies to improve the user experience of users of the website, for example we use cookies to keep you signed in. We do not use cookies for marketing or advertising purposes.
            </p>

            <h2 className='h2'>What are your data protection rights?</h2>
            <p>
                Under the General Data Protection Regulation, you have certain individual rights in relation to the personal information we hold about you. For the purposes of research where such individual rights would seriously impair research outcomes, such rights are limited. However, subject to certain conditions, you have the following rights in relation to your personal data:
            </p>

            <ul>
                <li>
                    A right to access personal data held by us about you.
                </ li>

                <li>
                    A right to require us to rectify any inaccurate personal data held by us about you.
                </ li>

                <li>
                    A right to require us to erase personal data held by us about you. This right will only apply where, for example, we no longer need to use the personal data to achieve the purpose we collected it for.
                </ li>

                <li>
                    A right to restrict our processing of personal data held by us about you. This right will only apply where, for example, you dispute the accuracy of the personal data held by us; or where you would have the right to require us to erase the personal data but would prefer that our processing is restricted instead; or where we no longer need to use the personal data to achieve the purpose we collected it for, but we require the data for the purposes of dealing with legal claims.
                </ li>

                <li>
                    A right to receive personal data, which you have provided to us, in a structured, commonly used and machine-readable format. You also have the right to require us to transfer this personal data to another organisation.
                </ li>

                <li>
                    A right to object to our processing of personal data held by us about you.
                </ li>

                <li>
                    A right to withdraw your consent, where we are relying on it to use your personal data.
                </ li>

                <li>
                    A right to ask us not to use information about you in a way that allows computers to make decisions about you and ask us to stop.
                </ li>

            </ul>

            <p>
                It is important to understand that the extent to which these rights apply to research will vary and that in some circumstances your rights may be restricted. If you notify us (using the contact details set out below) that you wish to exercise any of the above rights and it is considered necessary to refuse to comply with any of your individual rights, you will be informed of the decision within one month and you also have the right to complain about our decision to the Information Commissioner’s Office.
            </p>

            <p>
                Please also note that we can only comply with a request to exercise your rights during the period for which we hold personal information about you. If that information has been irreversibly anonymised and has become part of the research data set, it will no longer be possible for us to access your personal information.
            </p>

            <h2 className='h2'>Changes to this privacy policy</h2>
            <p>
                Changes to this privacy policy will be notified via the Colouring London website. This privacy policy was last updated on 4th November 2021. Previous update 2nd October 2019 following change ownership from UCL to The Alan Turing Institute.
            </p>

            <h2 className='h2'>Who do I contact with questions?</h2>
            <p>
                If you wish to complain about our use of your personal data or exercise any of your rights, please contact the Turing's Data Protection Officer: <a href="dataprotection@turing.ac.uk">dataprotection@turing.ac.uk</a> or Data Protection Officer, The Alan Turing Institute, 96 Euston Road, London NW1 2DB.
            </p>

            <p>
                If we are unable to adequately address any concerns you may have about the way in which we use your data, you have the right to lodge a formal complaint with the UK Information Commissioner's Office. Full details may be accessed on the complaints section of the Information Commissioner's Office website.
            </p>

            <h2 className='h2'>Further information on privacy and security</h2>
            <p>
                Please note when you make a contribution to Colouring London, you are creating a permanent, public record of all data added, removed, or changed by you. The database records the username and ID of the user making the edit, along with the time and date of the change. All of this information is also made publicly available through the website and through bulk downloads of the edit history. User names of contributors providing the highest number of edits are also included in our Leaderboards.
            </p>

            <p>
                Please also note that when you contribute to Colouring London, you make your contributions available as open data for anyone to copy, distribute, transmit and adapt in line with the licence, and to use as they see fit. Though we rigorously assess each data type, to help protect building occupiers' privacy and security we welcome any ideas for improvements.
            </p>

            <p>
                Progress on Colouring London features specifically designed to address ethical issues, including these relating to security and privacy, can be tracked and commented on using our GitHub site, at <a href="https://github.com/colouring-london/colouring-london/issues/687">#687</a>. If you have any immediate concerns regarding security or privacy please contact Turing's data protection team at <a href="dataprotection@turing.ac.uk">dataprotection@turing.ac.uk</a>.
            </p>

            <div className="buttons-container">
                <Link to="sign-up.html" className="btn btn-outline-dark">Back to sign up</Link>
            </div>
        </section>
    </article>
);

export default PrivacyPolicyPage;
