import React, { FormEvent, ChangeEvent } from 'react';
import InfoBox from './info-box';
import ErrorBox from './error-box';

interface ForgottenPasswordState {
    success: boolean;
    error: string;
    email: string;
    emailUsed: string;
}

export default class ForgottenPassword extends React.Component<{}, ForgottenPasswordState> {
    constructor(props) {
        super(props);
        this.state = {
            error: undefined,
            success: undefined,
            email: undefined,
            emailUsed: undefined
        };
    }

    handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value } as any);
    }
    
    async handleSubmit(event: FormEvent) {
        event.preventDefault();
        this.setState({ error: undefined, success: undefined });

        const emailSent = this.state.email;
        try {
            const res = await fetch('/api/users/password', {
                method: 'PUT',
                body: JSON.stringify({ email: emailSent }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();

            if (data.error != undefined) {
                this.setState({ error: data.error });
            } else if (data.success === true) {
                this.setState({ success: true, emailUsed: emailSent});
            } else {
                this.setState({ error: 'Unexpected result.' });
            }
        } catch (err) {
            this.setState({ error: 'Something went wrong.' });
        }
    }

    render() {
        return (
            <article>
                <section className="main-col">
                    <h1 className="h2">Forgotten password</h1>
                    <p>Please provide the e-mail address associated with your account. A password reset link will be sent to your mailbox.</p>
                    <ErrorBox msg={this.state.error} />
                    <InfoBox msg="">
                        {this.state.success ?
                            `A password reset link has been sent to ${this.state.emailUsed}. Please check your inbox.` :
                            null
                        }
                    </InfoBox>
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <label htmlFor="email">E-mail</label>
                        <input name="email" id="email"
                            className="form-control" type="email"
                            placeholder="Your e-mail address" required
                            onChange={e => this.handleChange(e)}
                        />

                        <div className="buttons-container">
                            <input type="submit" value="Request password reset" className="btn btn-primary" />
                        </div>
                    </form>
                </section>
            </article>
        )
    }
}