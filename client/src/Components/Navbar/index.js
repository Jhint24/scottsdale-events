import './navbar.css';
import React, { Component } from 'react';
import {
  Navbar,
  NavbarNav,
  NavbarToggler,
  Collapse,
  Container,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'mdbreact';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false,
      active: window.location.pathname
    };
  }

  // sets the current url route to state
  componentDidUpdate() {
    if (this.state.active !== window.location.pathname) {
      this.setState({
        active: window.location.pathname
      });
    }

    // this.props.collapse is true when a user clicks the main content area,
    // and the navbar is small, and expanded
    // calls the function to close the navbar
    if (this.props.collapse && this.state.collapse) {
      this.navbarToggler();
    }
  }

  navbarToggler = () => this.setState({ collapse: !this.state.collapse });

  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

  // sets the active class to the clicked nav button
  onNavItemClick = e => this.setState({ active: e.target.name });

  // clears sessions storage and logs a user out
  logout = () => sessionStorage.clear();

  // checks session storage and reveals cart and logout button
  checkLogIn = () => (sessionStorage.getItem('token') ? true : false);

  render() {
    const { href } = window.location;
    if (href.includes('/admin') || href.includes('/dashboard')) {
      return null;
    }
    return (
      <Navbar /*color="stylish-color"*/ dark expand="md" fixed="top" scrolling>
        <Container>
          <Link className="text-white navbar-brand" to="/">
            Scottsdale Event Dècor
          </Link>
          {!this.state.isWideEnough && <NavbarToggler onClick={this.navbarToggler} />}
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav right>
              <NavItem>
                <NavLink className={`${this.state.active === '/' && 'activeTab'}`} to="/">
                  <span>Home</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={`${this.state.active.includes('inventory') && 'activeTab'}`}
                  to="/inventory"
                >
                  <span>Inventory</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={`${this.state.active === '/gallery' && 'activeTab'}`}
                  to="/gallery"
                >
                  <span>Gallery</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={`${this.state.active === '/contact' && 'activeTab'}`}
                  to="/contact"
                >
                  <span>Contact Us</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={`${this.state.active === '/about' && 'activeTab'}`} to="/about">
                  <span>About</span>
                </NavLink>
              </NavItem>
              {!this.checkLogIn() && (
                <NavItem>
                  <NavLink
                    className={`${this.state.active === '/login' && 'activeTab'}`}
                    to="/login"
                  >
                    <span>Login</span>
                  </NavLink>
                </NavItem>
              )}
              {this.checkLogIn() && (
                <NavItem>
                  <Dropdown toggle={this.toggle}>
                    <DropdownToggle nav caret>
                      Hello, {sessionStorage.getItem('firstName')}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <Link to="/profile">Profile</Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link to="/checkout/cart">Cart</Link>
                      </DropdownItem>
                      <div className="dropdown-divider" />
                      <DropdownItem>
                        <Link to="/" onClick={this.logout}>
                          Logout
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavItem>
              )}
            </NavbarNav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
