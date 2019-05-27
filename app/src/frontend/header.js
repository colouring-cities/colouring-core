import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from './logo';
import './header.css';

/**
 * Render the main header using a responsive design
 */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {collapseMenu: true};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      collapseMenu: !state.collapseMenu
    }));
  }

  render() {
   return (
     <header className="main-header">
       <nav className="navbar navbar-light navbar-expand-md">
         <span className="navbar-brand">
           <Logo/>
         </span>
        <button className="navbar-toggler navbar-toggler-right" type="button"
          onClick={this.handleClick}   aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={this.state.collapseMenu ? 'collapse navbar-collapse' : 'navbar-collapse'}>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="https://pages.colouring.london">Hello</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://pages.colouring.london/buildingcategories">Data Categories</a>
            </li>
            <li className="nav-item">
              <NavLink to="/view/age.html" className="nav-link">View Maps</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/edit/age.html" className="nav-link">Add/Edit Data</NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://pages.colouring.london/about">More about</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://pages.colouring.london/whoisinvolved">Who's Involved?</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://discuss.colouring.london">Discuss</a>
            </li>
            {
              this.props.user?
              (
                <li className="nav-item">
                  <NavLink to="/my-account.html" className="nav-link">
                    My account (Logged in as {this.props.user.username})
                  </NavLink>
                </li>
              ):
              (
              <Fragment>
                <li className="nav-item">
                  <NavLink to="/login.html" className="nav-link">Log in</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/sign-up.html" className="nav-link">Sign up</NavLink>
                </li>
              </Fragment>
              )
            }
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
