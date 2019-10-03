import axios from "axios";
import EventEmitter from "../utils/EventEmitter";
import systemConfig from "../config/system";

class FilterService extends EventEmitter {
  constructor(props) {
    super(props);
    this.setDefaults();
  }

  setDefaults = () => {
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Accept"] = "application/json";
  };

  getAllCategories = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(systemConfig.serverBaseUrl + "/categories")
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };
  getSingleCategory = category_id => {
    return new Promise((resolve, reject) => {
      axios
        .get(systemConfig.serverBaseUrl + `/categories/${category_id}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };
  getProductCategory = product_id => {
    return new Promise((resolve, reject) => {
      axios
        .get(systemConfig.serverBaseUrl + `/categories/inProduct/${product_id}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

  getCategoriesInDepartment = department_id => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          systemConfig.serverBaseUrl +
            `/categories/inDepartment/${department_id}`
        )
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };
  getAllDepartments = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(systemConfig.serverBaseUrl + "/departments")
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };
  getSingleDepartment = department_id => {
    return new Promise((resolve, reject) => {
      axios
        .get(systemConfig.serverBaseUrl + `/departments/${department_id}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };
}

const instance = new FilterService();

export default instance;
