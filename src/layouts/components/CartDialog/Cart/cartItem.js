import { Fab, withStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SubtractIcon from "@material-ui/icons/Remove";
import React, { Component } from "react";
import systemConfig from "../../../../config/system";
import styles from "./styles";

class CartItem extends Component {
  state = {
    quantity: this.props.item.quantity
  };
  increaseQuantity = () => {
    this.setState({ quantity: this.state.quantity + 1 });
  };
  decreaseQuantity = () => {
    const { quantity } = this.state;
    this.setState({ quantity: quantity === 0 ? 0 : quantity - 1 });
  };
  render() {
    const { classes, item } = this.props;
    const { name, price, image, quantity } = item;
    return (
      <div>
        <div className="flex mb-4">
          <div className="w-2/12">
            <img
              className="w-full"
              src={systemConfig.imageBaseUrl + image}
              alt="Product"
            />
          </div>

          <div className="w-4/12 pl-6 cart-item">
            <div className="w-full">
              <span className={`cart-item-title ${classes.nameText}`}>
                {name}
              </span>
            </div>
            <div className="w-full pt-2">
              <span className={classes.productCodeText}>Men BK35679</span>
            </div>
            <div
              className="w-full pt-2 cart-item-remove"
              style={{ cursor: "pointer" }}
            >
              <span>
                <span className={classes.removeIcon}>X</span>
                <span className={classes.removeText}> Remove</span>
              </span>
            </div>
          </div>
          <div className="w-1/12 ">
            <span className={`cart-item-color ${classes.sizeText}`}>Black</span>
          </div>
          <div className="w-1/12 ">
            <span className={`cart-item-size ${classes.sizeText}`}>XL</span>
          </div>
          <div className="w-3/12 h-8">
            <div className="flex flex-row">
              <Fab
                size="small"
                aria-label="Subtract"
                className={classes.addRemoveIcon}
              >
                <SubtractIcon />
              </Fab>

              <div className="shadow appearance-none border rounded w-16 text-gray-700 rounded-full text-center mx-2">
                <span
                  className={classes.addRemoveText}
                  name="cart-item-quantity"
                >
                  {quantity}
                </span>
              </div>

              <Fab
                size="small"
                aria-label="Add"
                className={`increase-cart-quantity ${classes.addRemoveIcon}`}
              >
                <AddIcon />
              </Fab>
            </div>
          </div>
          <div className="w-2/12">
            <span className={`cart-item-price ${classes.priceText}`}>
              £ <span>{price}</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(CartItem);
