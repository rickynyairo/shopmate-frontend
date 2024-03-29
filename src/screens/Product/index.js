/**
This component display single product using the product ID
To complete this component, you need to implement the following:
- Dynamically render product attributes, size and color
- Show all reviews on the product
- Hide review submission form if user is not logged in
- Hide review submission form if a user is logged in but haven't previously ordered for the product
- Review submission form should be visible if a logged in user has once ordered for the item
- Hide login message if user is logged in
- If a user click the `Add to Cart` button, the user should see an animation of how the product fly into the
  cart bag with an auto close success message, and the quantity of the item in the cart bag in the NavBar should increase
- Dynamically render product reviews from the backend
- Add functionality to post review
- Add functionality to select product size, color and item quantity
- Take initiatives to customize this component and add live to the page

NB: YOU CAN STYLE AND CUSTOMISE THIS PAGE, BUT YOU HAVE TO USE OUR DEFAULT CLASSNAME, IDS AND HTML INPUT NAMES
*/
import React, { Component } from "react";
import {
  withStyles,
  Checkbox,
  Fab,
  CircularProgress,
  Hidden,
  Link
} from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import AddIcon from "@material-ui/icons/Add";
import SubtractIcon from "@material-ui/icons/Remove";
import StarRatings from "react-star-ratings";
import classNames from "classnames";
import { Carousel } from "react-responsive-carousel";
import systemConfig from "../../config/system";
import * as productActions from "../../store/actions/product";
import * as alertActions from "../../store/actions/alerts";
import * as cartActions from "../../store/actions/cart";
import styles from "./styles";
import { Container, Section } from "../../components/Layout";
import Review from "../../components/Review";
import ReviewForm from "./ReviewForm";
import ColourPicker from "../../layouts/components/Common/ColourPicker";
class Product extends Component {
  state = {
    quantity: 0,
    colour: "",
    size: ""
  };
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.props.getSingleProduct({
      product_id: params.id
    });
    this.props.getProductDetails({
      product_id: params.id
    });
    this.props.getProductLocations({
      product_id: params.id
    });
  }
  handleAddToCart = () => {
    const { addToCart, product, cartId, updateQuantity } = this.props;
    // check if item is in cart
    const inCart = this.props.cartItems.filter(
      item => item.product_id === product.product_id
    );
    if (inCart.length > 0) {
      // item exists in cart
      // increase item quantity
      return updateQuantity(inCart[0], inCart[0].quantity + 1);
    }
    addToCart({ ...product, cart_id: cartId });
  };
  increaseQuantity = () => {
    this.setState({ quantity: this.state.quantity + 1 });
  };
  decreaseQuantity = () => {
    const { quantity } = this.state;
    this.setState({ quantity: quantity === 0 ? 0 : quantity - 1 });
  };
  handleColourChange = event => {
    this.setState({ colour: event.target.value });
  };
  render() {
    const {
      classes,
      product,
      loading,
      locations,
      locationsLoading,
      match: { params },
      authenticated
    } = this.props;

    const isLoading = loading || !product.image || locationsLoading;
    const isDiscounted = parseFloat(product.discounted_price) > 0;

    return (
      <div className={classes.root}>
        <Container className="product-details">
          {isLoading ? (
            <Section>
              <div className="flex flex-wrap shadow flex justify-center py-24 bg-white">
                <CircularProgress size={40} color="primary" />
              </div>
            </Section>
          ) : (
            <div>
              <Section>
                <div className="flex flex-wrap shadow bg-white">
                  <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 flex justify-center align-middle pt-10">
                    <Carousel
                      showArrows={true}
                      showIndicators={false}
                      showStatus={false}
                    >
                      <div className={classes.carouselImageContainer}>
                        <img
                          src={`${systemConfig.imageBaseUrl}${product.image}`}
                          alt="Product"
                        />
                      </div>
                      <div className={classes.carouselImageContainer}>
                        <img
                          src={`${systemConfig.imageBaseUrl}${product.image_2}`}
                          alt="Product"
                        />
                      </div>
                    </Carousel>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-10">
                    <div className={`w-full h-8 ${classes.breadcrumbsText}`}>
                      Home <span className="ml-4" /> • <span className="ml-4" />{" "}
                      {locations[0].department_name} <span className="ml-4" /> •{" "}
                      <span className="ml-4" /> {locations[0].category_name}
                    </div>
                    <div className="w-full h-8 mt-2">
                      <StarRatings
                        rating={3}
                        starRatedColor="#ffc94f"
                        starEmptyColor="#eeeeee"
                        starHoverColor="#ffc94f"
                        starDimension="20px"
                        starSpacing="1px"
                        numberOfStars={5}
                        name="rating"
                      />
                    </div>
                    <div className="w-full h-8">
                      <span
                        className={`product-details-title ${classes.productTitleText}`}
                      >
                        {product.name}
                      </span>
                    </div>
                    <div className="w-full mt-4">
                      <span className={classes.productPrice}>
                        <span
                          className={classNames({
                            [classes.strikeThrough]: isDiscounted
                          })}
                        >
                          £ {product.price}
                        </span>
                        {isDiscounted && (
                          <span> | £ {product.discounted_price}</span>
                        )}
                      </span>
                    </div>
                    <div className="w-full my-8">
                      <div className="w-full mb-2">
                        <span className={classes.lightTitle}> Colour </span>
                      </div>
                      <ColourPicker
                        colours={["cyan", "blue", "red", "purple"]}
                        handleColourChange={this.handleColourChange}
                      />
                    </div>
                    <div className="w-full my-8">
                      <div className="w-full mb-2">
                        <span className={classes.lightTitle}> Size </span>
                      </div>
                      <div>
                        <Checkbox
                          style={{ padding: 0 }}
                          checkedIcon={
                            <div className={classes.sizeCheckboxChecked}>
                              XS
                            </div>
                          }
                          icon={
                            <div className={classes.sizeCheckboxUnchecked}>
                              XS
                            </div>
                          }
                          className="product-details-size"
                          value="XS"
                        />
                        <Checkbox
                          style={{ padding: 0 }}
                          checkedIcon={
                            <div className={classes.sizeCheckboxChecked}>S</div>
                          }
                          icon={
                            <div className={classes.sizeCheckboxUnchecked}>
                              S
                            </div>
                          }
                          className="product-details-size"
                          value="checkedA"
                        />
                        <Checkbox
                          style={{ padding: 0 }}
                          checkedIcon={
                            <div className={classes.sizeCheckboxChecked}>M</div>
                          }
                          icon={
                            <div className={classes.sizeCheckboxUnchecked}>
                              M
                            </div>
                          }
                          className="product-details-size"
                          value="M"
                        />
                        <Checkbox
                          style={{ padding: 0 }}
                          checkedIcon={
                            <div className={classes.sizeCheckboxChecked}>L</div>
                          }
                          icon={
                            <div className={classes.sizeCheckboxUnchecked}>
                              L
                            </div>
                          }
                          className="product-details-size"
                          value="L"
                        />
                        <Checkbox
                          style={{ padding: 0 }}
                          checkedIcon={
                            <div className={classes.sizeCheckboxChecked}>
                              XL
                            </div>
                          }
                          icon={
                            <div className={classes.sizeCheckboxUnchecked}>
                              XL
                            </div>
                          }
                          className="product-details-size"
                          value="XL"
                        />
                      </div>
                    </div>
                    <div className="w-full my-8 flex flex-row">
                      <Fab
                        size="small"
                        aria-label="Subtract"
                        className={classes.addRemoveIcon}
                        onClick={this.decreaseQuantity}
                      >
                        <SubtractIcon />
                      </Fab>

                      <div className="shadow appearance-none border rounded w-16 text-gray-700 rounded-full text-center mx-2">
                        <span
                          className={classes.addRemoveText}
                          name="product-details-quantity"
                        >
                          {this.state.quantity}
                        </span>
                      </div>

                      <Fab
                        size="small"
                        aria-label="Add"
                        className={`increase-quantity ${classes.addRemoveIcon}`}
                        onClick={this.increaseQuantity}
                      >
                        <AddIcon />
                      </Fab>
                    </div>
                    <div className="w-full my-8 flex flex-row">
                      <div className="relative">
                        <Fab
                          color="primary"
                          size="large"
                          id="btnCart"
                          onClick={this.handleAddToCart}
                          style={{ borderRadius: 60, height: 60, width: 220 }}
                        >
                          <span className={classes.submitButtonText}>
                            Add to Cart
                          </span>
                        </Fab>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>
              <div>
                <Hidden mdDown>
                  <Section>
                    <div className="flex flex-wrap px-32">
                      <div className="w-full flex">
                        <span className={classes.reviewTitleText}>
                          Product Reviews
                        </span>
                      </div>
                      <Review
                        rating={5}
                        name="Peter Test"
                        review="Test Review 1"
                      />
                      <Review
                        rating={3}
                        name="Celestine Test"
                        review="Test Review 2"
                      />
                    </div>
                  </Section>
                </Hidden>
                <ReviewForm productId={params.id} />
              </div>
              {!authenticated ? (
                <div className="w-full flex justify-center align-middle py-8">
                  <Link
                    onClick={() => {
                      this.props.showAuth(false);
                    }}
                    color={"primary"}
                    style={{ cursor: "pointer", color: "red" }}
                  >
                    Log In
                  </Link>{" "}
                  <span className="ml-2">to Add a Review.</span>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </Container>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getSingleProduct: productActions.getSingleProduct,
      getProductDetails: productActions.getProductDetails,
      getProductLocations: productActions.getProductLocations,
      showAuth: alertActions.showAuth,
      addToCart: cartActions.addToCart,
      emptyCart: cartActions.emptyCart,
      updateQuantity: cartActions.updateQuantity
    },
    dispatch
  );
}

function mapStateToProps({ product, cart, user }) {
  return {
    product: product.item.data,
    locations: product.locations.data,
    locationsLoading: product.locations.isLoading,
    loading: product.item.isLoading,
    isEmpty: cart.shoppingCart.isEmpty,
    cartItems: cart.shoppingCart.items,
    cartId: cart.shoppingCart.cart_id,
    authenticated: user.customer.authenticated
  };
}

export default withWidth()(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(Product)
    )
  )
);
