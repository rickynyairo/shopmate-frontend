import axios from "axios";
import EventEmitter from "../utils/EventEmitter";
import systemConfig from "../config/system";
import Cookie from "cookies-js";

class CartService extends EventEmitter {
  constructor() {
    super();
    this.setDefaults();
    this.url = systemConfig.serverBaseUrl + "/shoppingcart";
  }

  setDefaults = () => {
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Accept"] = "application/json";
    // axios.defaults.headers.common["USER-KEY"] = Cookie.get("accessToken");
  };

  addToCart = ({ cart_id, product_id, attributes, quantity }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(this.url + "/add", {
          cart_id,
          product_id,
          attributes: attributes || "none",
          quantity
        })
        .then(response => {
          // returns the new cart
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

  getCartId = () => {
    const existingCartId = Cookie.get("cartId");
    return new Promise((resolve, reject) => {
      axios
        .get(this.url + "/generateUniqueId")
        .then(response => {
          if (existingCartId) {
            // use the cart id in the cookie
            return resolve({ cart_id: existingCartId });
          }
          resolve(response.data);
          Cookie.set("cartId", response.data.cart_id);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

  emptyCart = cart_id => {
    return new Promise((resolve, reject) => {
      axios
        .delete(this.url + `/${cart_id}`)
        .then(response => {
          resolve(response.data);
          Cookie.expire("cartId");
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

  getItemsInCart = cart_id => {
    return new Promise((resolve, reject) => {
      axios
        .get(this.url + `/${cart_id}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

  updateCartItemQuantity = ({ item_id, quantity }) => {
    return new Promise((resolve, reject) => {
      axios
        .put(this.url + `/update/${item_id}`, { quantity })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };
}

const instance = new CartService();

export default instance;
