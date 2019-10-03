import React from "react";
import PropTypes from "prop-types";
import { withStyles, Link, Badge, Hidden } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/index";
import Toolbar from "@material-ui/core/Toolbar/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import Button from "@material-ui/core/Button";
import * as alertActions from "../../../../store/actions/alerts";
import * as userActions from "../../../../store/actions/user";
import * as cartActions from "../../../../store/actions/cart";

const links = [
  {
    title: "Daily Deals",
    link: "/"
  },
  {
    title: "Sell",
    link: "/"
  },
  {
    title: "Help & Contact",
    link: "/"
  }
];

class TopBar extends React.Component {
  componentDidMount() {
    this.props.getCustomer();
    this.props.getCartId();
    this.props.getItemsInCart();
  }
  render() {
    const { classes, authenticated, customer, logOut, itemCount } = this.props;
    return (
      <AppBar className={classes.topBar}>
        <Toolbar className={classes.toolbar}>
          {!authenticated ? (
            <div className={classes.authText + " " + classes.divTopBar}>
              <span>Hi!</span>
              <Link
                onClick={() => {
                  this.props.showAuth(false);
                }}
                block={true}
                className={classes.authLink}
                id="btnSignIn"
                style={{ color: "red" }}
              >
                Sign in
              </Link>
              <span>or</span>
              <Link
                onClick={() => {
                  this.props.showAuth(true);
                }}
                className={classes.authLink}
                id="btnRegister"
                style={{ color: "red" }}
              >
                Register
              </Link>
            </div>
          ) : (
            <div className={classes.authText + " " + classes.divTopBar}>
              <span>Hi {customer.customer.name} !</span>
              <Link className={classes.authLink} style={{ color: "red" }}>
                My Profile
              </Link>
              <span>|</span>
              <Link
                className={classes.authLink}
                block={false}
                id="btnLogout"
                style={{ color: "red" }}
                onClick={logOut}
              >
                Logout
              </Link>
            </div>
          )}
          <Hidden mdDown className={classes.divTopBar}>
            <div className={classes.linksContainer}>
              {links.map((item, index) => (
                <Button key={index} classes={{ root: classes.button }}>
                  <Link to={item.link} className={classes.navLink}>
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          </Hidden>
          <Hidden mdDown className={classes.divTopBar}>
            <div className={classes.currencyIconContainer}>
              <span className="flag-icon flag-icon-gb" />
            </div>
            <div className={classes.currencyContainer}>
              <div className={classes.currencyText}>GBR</div>
            </div>
          </Hidden>
          {authenticated ? (
            <div className={classes.divTopBar}>
              <div
                className={classes.iconContainer}
                id="menuCartLink"
                onClick={() => {
                  this.props.showCart();
                }}
              >
                <Badge
                  classes={{ badge: classes.badge }}
                  badgeContent={itemCount}
                  color="primary"
                >
                  <img
                    alt="Shopping Cart Icon"
                    src="/assets/icons/shopping-cart-black.svg"
                  />
                </Badge>
              </div>
              <div className={classes.yourBag} style={{ color: "black" }}>
                Your Bag: $<span id="menuCartTotalPrice">14.99</span>
              </div>
            </div>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired
};
function mapStateToProps({ user: { customer }, cart: { shoppingCart } }) {
  return {
    customer: customer.data,
    authenticated: customer.authenticated,
    error: customer.error,
    itemCount: shoppingCart.count
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      showAuth: alertActions.showAuth,
      hideAuth: alertActions.hideAuth,
      showCart: alertActions.showCart,
      getCartId: cartActions.getCartId,
      getItemsInCart: cartActions.getItemsInCart,
      getCustomer: userActions.getCustomer,
      logOut: userActions.signOut
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TopBar)
);
