import React, { PureComponent } from "react";
import { Select, MenuItem } from "@material-ui/core";

class Department extends PureComponent {
  render() {
    const {
      departments,
      handleSelectDepartment,
      currentDepartment
    } = this.props;
    return (
      <Select
        value={currentDepartment}
        onChange={handleSelectDepartment}
        inputProps={{
          name: "department",
          id: "department-selector"
        }}
      >
        {departments.map(({ department_id, name }) => (
          <MenuItem key={department_id} value={department_id} name={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    );
  }
}
export default Department;
