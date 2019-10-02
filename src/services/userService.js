import axios from "axios";
import EventEmitter from "../utils/EventEmitter";
import systemConfig from "../config/system";
import Cookie from "cookies-js";
class UserService extends EventEmitter {
  constructor() {
    super();

    this.setDefaults();
  }

  setDefaults = () => {
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Accept"] = "application/json";
  };
  setCurrentUser = user => {
    Cookie.set("accessToken", user.accessToken);
  };
  signUp = ({ email, password, name }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(systemConfig.serverBaseUrl + "/customers", {
          email,
          password,
          name
        })
        .then(response => {
          resolve(response.data);
          this.setCurrentUser(response.data);
        })
        .catch(error => {
          reject(error.response.data);
        });
    });
  };

  signIn = ({ email, password }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(systemConfig.serverBaseUrl + "/customers/login", {
          email,
          password
        })
        .then(response => {
          resolve(response.data);
          this.setCurrentUser(response.data);
        })
        .catch(error => {
          reject(error.response.data);
        });
    });
  };

  signOut = () => {
    Cookie.expire("accessToken");
  };

  getCustomer = () => {
    const accessToken = Cookie.get("accessToken");
    return new Promise((resolve, reject) => {
      axios
        .get(systemConfig.serverBaseUrl + `/customer`, {
          headers: { "user-key": `${accessToken}` }
        })
        .then(response => {
          resolve(response.data);
          this.setCurrentUser(response.data);
          axios.interceptors.request.use(config => {
            config.headers["user-key"] = response.data.accessToken;
            return config;
          });
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };
}

const instance = new UserService();

export default instance;
