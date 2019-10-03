/**
 * Implement functionality for Cart
 */
import { withStyles, Paper, List } from "@material-ui/core";
import React, { Component } from "react";
import styles from "./styles";
import CartItem from "./cartItem";

class Cart extends Component {
  render() {
    const { classes, cartItems, updateQuantity } = this.props;
    return (
      <div id="cart">
        <div className={`flex mb-4 h-8 ${classes.headerBorderBottom}`}>
          <div className="w-3/6">
            <span className={classes.headerTitle}>Item</span>
          </div>
          <div className="w-1/12">
            <span className={classes.headerTitle}>Color</span>
          </div>
          <div className="w-1/12">
            <span className={classes.headerTitle}>Size</span>
          </div>
          <div className="w-3/12">
            <span className={classes.headerTitle}>Quantity</span>
          </div>
          <div className="w-2/12">
            <span className={classes.headerTitle}>Price</span>
          </div>
        </div>
        <Paper style={{ maxHeight: 370, overflow: "auto", padding: 10 }}>
          {cartItems
            ? cartItems.map(item => (
                <List key={item.item_id}>
                  <CartItem item={item} updateQuantity={updateQuantity} />
                </List>
              ))
            : ""}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Cart);
