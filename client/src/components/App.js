import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home';
import InventoryPage from './pages/Inventory';
import API from '../api/API';
import Gallery from './pages/Gallery';
import ContactUs from './pages/Contact/Form/index';
import CustomerLogin from './pages/CustomerLogin';

class App extends Component {
  constructor(props) {
    super(props);
    this.categories = this.loadCategories();
    this.state = { categories: this.categories };
  }

  // loads the inventory categories for the nav bar
  loadCategories = () => {
    return API.getDistinctCategories()
      .then(result => {
        const arr = result.data.map(index => index['CATEGORY']);
        return this.setState({ categories: arr });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: '500 (Internal Server Error)' });
      });
  };

  render() {
    console.log(this.state);

    const { categories, error } = this.state;

    if (error) {
      return <h3>{error}</h3>;
    }

    return (
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={props => <Home {...props} categories={categories} />}
            />
            <Route
              path="/inventory"
              render={props => (
                <InventoryPage {...props} categories={categories} />
              )}
            />
            <Route path="/gallery" component={Gallery} />
            <Route path="/login" component={CustomerLogin} />
            <Route path="/contact" component={ContactUs} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
