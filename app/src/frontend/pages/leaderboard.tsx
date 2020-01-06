import React, { Component } from 'react';

import './leaderboard.css';

    interface Leader {
        number_edits: string;
        username: string;
    }


    interface LeaderboardProps {
    }


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
	}else {
            this.getLeaders(this.state.number_limit, e.target.value);
	    this.setState({time_limit: e.target.value});
        }
    }
	
	
    componentDidMount() { 
	this.getLeaders(this.state.number_limit, this.state.time_limit);
    }


    componentWillUnmount() {}
		
	
    getLeaders(number_limit, time_limit) {
        
        this.setState({
            fetching: true
        });

        fetch(
            '/api/leaderboard/leaders?number_limit=' + number_limit + '&time_limit='+time_limit
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
                    <td>{i+1}</td>
		    <td>{username}</td>
		    <td>{number_edits}</td>
		</tr>
	    );
      });
   }


    render() {
	return(
            <div>
                <form id="radiogroup">    
                    <div id="number-radiogroup" >
			<p>Select number of users to be displayed: <br/>
                            <input type="radio" name="number_limit" value="10" onChange={this.handleChange} checked={10 == this.state.number_limit} />10
                            <input type="radio" name="number_limit" value="100" onChange={this.handleChange} checked={100 == this.state.number_limit} />100
                        </p>
                    </div>
                    <div id="time-radiogroup" >
                        <p>Select time period: <br/>
                            <input type="radio" name="time_limit" value="-1" onChange={this.handleChange}  checked={-1 == this.state.time_limit} /> All time
			    <input type="radio" name="time_limit" value="7" onChange={this.handleChange}  checked={7 == this.state.time_limit} /> Last 7 days
                            <input type="radio" name="time_limit" value="30" onChange={this.handleChange}  checked={30 == this.state.time_limit} /> Last 30 days
                        </p>
                    </div>
                </form>      
                <h1 id='title'>Leader Board</h1>
                <table id='leaderboard'>
                    <tbody>
                        <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th>Contributions</th>
                        </tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>		
	);
    }

}


export default LeaderboardPage;

