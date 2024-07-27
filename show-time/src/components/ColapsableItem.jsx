import { useState } from "react";

const styleVisibale = { display: "block" };
const styleHidden = { display: "none" };

function ColapsableItem({ setVisible, children }) {
  return <div style={setVisible ? styleVisibale : styleHidden}>{children}</div>;
}

export default ColapsableItem;
