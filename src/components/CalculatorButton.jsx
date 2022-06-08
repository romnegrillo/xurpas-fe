import React from "react"

export default function CalculatorButton({ className, value, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
}
