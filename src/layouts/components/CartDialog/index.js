import React, { Component } from "react";
import {
  Paper,
  Dialog,
  DialogContent,
  withStyles,
  Fab
} from "@material-ui/core";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Cart from "./Cart";
import OrderForm from "./Forms/OrderForm";
import Close from "@material-ui/icons/Close";
import styles from "./styles";
import * as alertActions from "../../../store/actions/alerts";
import * as cartActions from "../../../store/actions/cart";

function PaperComponent(props) {
  return <Paper {...props} style={{ width: "820px" }} />;
}

class CartDialog extends Component {
  state = {
    open: false,
    activeStep: 0,
    completed: false,
    isEmpty: true,
    items: [],
    error: {}
  };
  handleClose = () => {
    this.props.hideCart();
  };

  handleNext() {
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  }

  handlePrevious() {
    if (this.state.activeStep > 0) {
      this.setState({
        activeStep: this.state.activeStep - 1
      });
    }
  }

  render() {
    const { classes, itemCount, cartItems } = this.props;
    const { activeStep } = this.state;
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose.bind(this)}
          PaperComponent={PaperComponent}
          maxWidth="lg"
          scroll="paper"
          aria-labelledby="draggable-dialog-title"
        >
          <DialogContent style={{ overflow: "hidden" }}>
            <div className="flex">
              <div className="w-3/5 sm-12">
                <span className={classes.titleText}>
                  Items in Cart: {itemCount}
                </span>
              </div>
              <div className="w-1/5 sm-12 flex justify-end">
                <span
                  className={classes.totalText}
                  onClick={this.handleClose.bind(this)}
                >
                  Total: £ <span id="cartTotalPriceValue">0</span>
                </span>
              </div>
              <div className="w-1/5 sm-12 flex justify-end">
                <Close
                  onClick={this.handleClose.bind(this)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
            <div
              className="w-full flex flex-grow flex-col"
              style={{ height: "450px" }}
            >
              {activeStep === 0 ? (
                <Cart
                  cartItems={cartItems}
                  updateQuantity={this.props.updateQuantity}
                />
              ) : (
                <OrderForm />
              )}
            </div>
            <div className="flex mb-4">
              <div className="w-1/2">
                <Fab
                  color="primary"
                  onClick={
                    activeStep === 0
                      ? this.handleClose.bind(this)
                      : this.handlePrevious.bind(this)
                  }
                  style={{ borderRadius: 48, height: 48, width: 160 }}
                  className={classes.cartButton}
                >
                  <span className={classes.submitButtonText}>
                    {activeStep === 0 ? "Back to Shop" : "Back"}
                  </span>
                </Fab>
              </div>
              <div className="w-1/2 flex justify-end">
                <Fab
                  color="primary"
                  onClick={this.handleNext.bind(this)}
                  style={{ borderRadius: 48, height: 48, width: 160 }}
                  className={classes.cartButton}
                >
                  {activeStep === 0 ? (
                    <span className={classes.submitButtonText} id="btnCheckout">
                      Checkout
                    </span>
                  ) : (
                    <span className={classes.submitButtonText} id="btnNext">
                      Next
                    </span>
                  )}
                </Fab>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      hideCart: alertActions.hideCart,
      showAuth: alertActions.showAuth,
      updateQuantity: cartActions.updateQuantity
    },
    dispatch
  );
}

function mapStateToProps({ alerts, cart: { shoppingCart }, products }) {
  return {
    open: alerts.cart.open,
    isEmpty: shoppingCart.isEmpty,
    cartItems: shoppingCart.items,
    cartId: shoppingCart.cart_id,
    itemCount: shoppingCart.count,
    products: products.all
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CartDialog)
);
