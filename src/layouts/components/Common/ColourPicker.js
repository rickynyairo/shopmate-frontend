import React, { PureComponent } from "react";
import { Radio, RadioGroup, colors } from "@material-ui/core";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

class ColourPicker extends PureComponent {
  render() {
    const { colours, handleColourChange } = this.props;
    return (
      <RadioGroup style={{ display: "inline" }}>
        {colours.map(colour => (
          <Radio
            style={{ padding: 2, color: colors[colour]["500"] }}
            size="small"
            icon={<FiberManualRecord />}
            value={colour}
            key={colour}
            name="radio-button-demo"
            aria-label={colour}
            className="product-details-color"
            onClick={handleColourChange}
          />
        ))}
      </RadioGroup>
    );
  }
}
export default ColourPicker;
