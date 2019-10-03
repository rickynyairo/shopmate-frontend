import React, { PureComponent } from "react";
import { Select, MenuItem } from "@material-ui/core";

class Department extends PureComponent {
  render() {
    const { categories, handleSelectCategory, currentCategory } = this.props;
    return (
      <Select
        value={currentCategory}
        onChange={handleSelectCategory}
        inputProps={{
          name: "category",
          id: "category-selector"
        }}
      >
        {categories.map(({ category_id, name }) => (
          <MenuItem key={category_id} value={category_id} name={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    );
  }
}
export default Department;
