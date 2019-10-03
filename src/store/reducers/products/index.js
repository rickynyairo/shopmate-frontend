import { combineReducers } from "redux";
import all from "./all_products.reducer";
import categories from "./categories.reducer";
import departments from "./departments.reducer";
const products = combineReducers({
  all,
  categories,
  departments
});

export default products;
