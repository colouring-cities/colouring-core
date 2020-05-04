import React, { Component } from 'react';


interface Leader {
    number_edits: number;
    username: string;
}


interface LeaderboardProps {}


interface LeaderboardState {
    leaders: Leader[];
    fetching: boolean;

    //We need to track the state of the radio buttons to ensure their current state is shown correctly when the view is (re)rendered
    number_limit: number;
    time_limit: number;
}


class LeaderboardPage extends Component<LeaderboardProps, LeaderboardState> {

    constructor(props) {
        super(props);
        this.state = {
            leaders: [],
            fetching: false,
            number_limit: 10,
            time_limit: -1
        };
        this.getLeaders = this.getLeaders.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        if(e.target.name == 'number_limit'){
            this.getLeaders(e.target.value, this.state.time_limit);
            this.setState({number_limit: e.target.value});
        } else {
            this.getLeaders(this.state.number_limit, e.target.value);
            this.setState({time_limit: e.target.value});
        }
    }

    componentDidMount() {
        this.getLeaders(this.state.number_limit, this.state.time_limit);
    }

    getLeaders(number_limit: number, time_limit: number) {
        this.setState({
            fetching: true
        });

        fetch(
            `/api/leaderboard/leaders?number_limit=${number_limit}&time_limit=${time_limit}`
        ).then(
            (res) => res.json()
        ).then((data) => {
            if (data && data.leaders){
                this.setState({
                    leaders: data.leaders,
                    fetching: false
                });

            } else {
                console.error(data);

                this.setState({
                    leaders: [],
                    fetching: false
                });
            }
        }).catch((err) => {
            console.error(err);

            this.setState({
                leaders: [],
                fetching: false
            });
        });
    }


    renderTableData() {
        return this.state.leaders.map((u, i) => {
            const username = u.username;
            const number_edits = u.number_edits;

            return (
                <tr key={username}>
                    <th scope="row">{i+1}</th>
                    <td>{username}</td>
                    <td>{number_edits.toLocaleString()}</td>
                </tr>
            );
        });
    }


    render() {
        return (
            <article>
                <section className="main-col">
                    <h1 className="h2">Leaderboard</h1>
                    <form>
                        <label>Select number of users to be displayed</label>
                        <div className="form-group">
                            <div className="form-check-inline">
                                <input
                                    type="radio"
                                    name="number_limit"
                                    id="number_10"
                                    className="form-check-input"
                                    value="10"
                                    onChange={this.handleChange}
                                    checked={10 == this.state.number_limit}
                                    />
                                <label className="form-check-label" htmlFor="number_10">10</label>
                            </div>
                            <div className="form-check-inline">
                                <input
                                    type="radio"
                                    name="number_limit"
                                    id="number_100"
                                    className="form-check-input"
                                    value="100"
                                    onChange={this.handleChange}
                                    checked={100 == this.state.number_limit}
                                    />
                                <label className="form-check-label" htmlFor="number_100">100</label>
                            </div>
                        </div>
                        <label>Select time period</label>
                        <div className="form-group">
                            <div className="form-check-inline">
                                <input
                                    type="radio"
                                    name="time_limit"
                                    id="time_all"
                                    className="form-check-input"
                                    value="-1"
                                    onChange={this.handleChange}
                                    checked={-1 == this.state.time_limit}
                                    />
                                <label className="form-check-label" htmlFor="time_all">All time</label>
                            </div>
                            <div className="form-check-inline">
                                <input
                                    type="radio"
                                    name="time_limit"
                                    id="time_7"
                                    className="form-check-input"
                                    value="7"
                                    onChange={this.handleChange}
                                    checked={7 == this.state.time_limit}
                                    />
                                <label className="form-check-label" htmlFor="time_7">Last 7 days</label>
                            </div>
                            <div className="form-check-inline">
                                <input
                                    type="radio"
                                    name="time_limit"
                                    id="time_30"
                                    className="form-check-input"
                                    value="30"
                                    onChange={this.handleChange}
                                    checked={30 == this.state.time_limit}
                                    />
                                <label className="form-check-label" htmlFor="time_30">Last 30 days</label>
                            </div>
                        </div>
                    </form>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">Contributions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </section>
            </article>
        );
    }

}


export default LeaderboardPage;
