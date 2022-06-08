import React from "react";

export default function CalculatorScreen({ value }) {
  
  return (
    <div className="calculator-screen">
      <input type="text" className="calculator-input" value={value} readOnly></input>
    </div>
  );
}
