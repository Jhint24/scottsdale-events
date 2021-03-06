import React, { Component, Fragment } from 'react';
import { Button, Input } from 'mdbreact';
import './InventoryPage.css';
import API from '../../../api/API';

class InventoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 0, isAuthed: false, result: null, isAdmin: null };
  }

  // checks if a user is authed. If so, displays cart and qty.
  componentDidMount() {
    API.checkToken()
      .then(res => this.setState({ isAuthed: true, isAdmin: res.data.isAdmin }))
      .catch(err => {
        console.log(err);
      });
  }

  // updates qty for a product
  handleInputChange = event => {
    const { name } = event.target;
    let { value } = event.target;
    // ensures only numbers are passed in
    if (isNaN(value.slice(-1))) {
      value = value.replace(/[^0-9]+/g, '');
    }
    this.setState({
      [name]: value
    });
  };

  // saves the product to the users cart.
  handleFormSubmit = event => {
    // prevents adding 0 items of something or too many
    if (
      this.state.quantity > 0 &&
      this.state.quantity <= parseInt(this.props.cardQuantity)
    ) {
      event.preventDefault();
      // grabs the values needed for the product to save to the cart
      const obj = {};
      obj.ProductId = event.target.getAttribute('data-id');
      obj.qty = this.state.quantity;
      obj.CartId = sessionStorage.activeCart;
      obj.maxQty = event.target.getAttribute('data-maxqty');

      API.saveProduct(obj)
        .then(result => {
          this.setState({ result: result.data });
        })
        .catch(err => {
          this.setState({ result: 'Failed to save product' });
        });
    } else {
      this.setState({ result: 'Please choose a valid quantity' });
    }
  };

  render() {
    return (
      <div className="row my-5 pb-4 text-center text-md-left">
        <div className="col-md-5 mb-3 mb-sm-3">
          <img
            className="img-fluid product-img"
            src={this.props.url}
            alt={this.props.cardTitle}
          />
        </div>
        <div className="col-md-7 border-bottom pb-3 pb-sm-3">
          <h3 className="mb-2">{this.props.cardTitle}</h3>
          <p className="mb-2">{this.props.cardDesc}</p>
          {this.state.isAuthed &&
            this.props.cardPrice > 0 &&
            !this.state.isAdmin && (
              <Fragment>
                <p>${this.props.cardPrice}</p>
                <p>{this.props.cardQuantity} units in inventory</p>

                {this.state.result && (
                  <p className="my-2">{this.state.result}</p>
                )}
                <Input
                  className="mx-auto mx-md-0"
                  value={this.state.quantity.toString()}
                  onChange={this.handleInputChange}
                  data-id={this.props.id}
                  type="number"
                  name="quantity"
                  id="item-quantity"
                  max={this.props.cardQuantity}
                  min="0"
                  placeholder={'Quantity'}
                />
                <Button
                  type="submit"
                  value="Submit"
                  onClick={this.handleFormSubmit}
                  data-id={this.props.id}
                  data-maxqty={this.props.cardQuantity}
                  className="aButton"
                >
                  {' '}
                  Add To Cart
                </Button>
              </Fragment>
            )}
        </div>
      </div>
    );
  }
}

export default InventoryCard;
