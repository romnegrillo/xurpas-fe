import React from "react";

import CalculatorScreen from "./components/CalculatorScreen";
import CalculatorBody from "./components/CalculatorBody";
import CalculatorButton from "./components/CalculatorButton";

export default function App() {
  const calculatorButtonsText = [
    "AC",
    "±",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  const orangeColoredButtons = ["+", "-", "*", "/", "="];
  const operationButtons = ["+", "-", "*", "/"];
  const numberButtons = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const MAX_NUM_LENGTH = 20;

  let [calc, setCalc] = React.useState({
    num1: "",
    num2: "",
    sign: "",
  });

  const calculatorButtons = calculatorButtonsText.map((buttonText, index) => {
    let className = "";

    if (buttonText === "0") {
      className += "calculator-button two-col ";
    } else {
      className += "calculator-button ";
    }

    if (orangeColoredButtons.includes(buttonText)) {
      className += "button-orange ";
    }

    return (
      <CalculatorButton
        key={index}
        className={className}
        value={buttonText}
        onClick={
          buttonText === "AC"
            ? () => clearClickEvent()
            : operationButtons.includes(buttonText)
            ? () => operationClickEvent(buttonText)
            : buttonText === "±"
            ? () => reverseClickEvent()
            : buttonText === "="
            ? () => equalsClickEvent()
            : buttonText === "%"
            ? () => percentClickEvent()
            : buttonText === "."
            ? () => pointClickEvent()
            : numberButtons.includes(buttonText)
            ? () => numberClickEvent(buttonText)
            : null
        }
      >
        {buttonText}
      </CalculatorButton>
    );
  });

  function clearClickEvent() {
    setCalc((prevCalc) => {
      return {
        num1: "",
        num2: "",
        sign: "",
      };
    });
  }

  function numberClickEvent(nextNum) {
    if (calc.num1.toString().length < MAX_NUM_LENGTH) {
      setCalc((prevCalc) => {
        let new_num1 = "";

        if (prevCalc.num1 !== "" && prevCalc.num1 !== "0") {
          new_num1 = prevCalc.num1 + nextNum;
        } else {
          new_num1 = nextNum;
        }

        return {
          ...prevCalc,
          num1: new_num1,
        };
      });
    }
  }

  function operationClickEvent(nextSign) {
    setCalc((prevCalc) => {
      if (prevCalc.num1 !== "" && prevCalc.num2 === "") {
        return {
          num1: "",
          num2: prevCalc.num1,
          sign: nextSign,
        };
      } else if (
        prevCalc.num1 !== "" &&
        prevCalc.num2 !== "" &&
        prevCalc.sign !== ""
      ) {
        return {
          num1: "",
          num2: performOperation(
            parseFloat(prevCalc.num2),
            parseFloat(prevCalc.num1),
            prevCalc.sign
          ).toString(),
          sign: nextSign,
        };
      } else {
        return {
          ...prevCalc,
          sign: nextSign,
        };
      }
    });
  }

  function equalsClickEvent() {
    setCalc((prevCalc) => {

      //console.log(prevCalc)

      if (
        prevCalc.num1 !== "" &&
        prevCalc.num2 !== "" &&
        prevCalc.sign !== ""
      ) {
        return {
          ...prevCalc,
          num1: "",
          num2: performOperation(
            parseFloat(prevCalc.num2),
            parseFloat(prevCalc.num1),
            prevCalc.sign
          ).toString(),
        };
      } else {
        return {
          ...prevCalc,
        };
      }
    });
  }

  function reverseClickEvent() {
    setCalc((prevCalc) => {
      if (prevCalc.num2 !== "") {
        return {
          ...prevCalc,
          num2: (parseFloat(prevCalc.num2) * -1).toString(),
        };
      } else {
        return {
          ...prevCalc,
          num1: (parseFloat(prevCalc.num1) * -1).toString(),
        };
      }
    });
  }

  function percentClickEvent() {
    setCalc((prevCalc) => {
      if (prevCalc.num2 !== "") {
        return {
          ...prevCalc,
          num2: (parseFloat(prevCalc.num2) / Math.pow(100, 1)).toString(),
        };
      } else {
        return {
          ...prevCalc,
          num1: (parseFloat(prevCalc.num1) / Math.pow(100, 1)).toString(),
        };
      }
    });
  }

  function pointClickEvent() {
    setCalc((prevCalc) => {
      if (prevCalc.num1 !== "") {
        return {
          ...prevCalc,
          num1: !prevCalc.num1.includes(".")
            ? prevCalc.num1 + "."
            : prevCalc.num1,
        };
      }
      else if (prevCalc.num2 !== "") {
        return {
          ...prevCalc,
          num2: !prevCalc.num2.includes(".")
            ? prevCalc.num2 + "."
            : prevCalc.num2,
        };
      } 
    });
  }

  function backSpaceEvent() {
    setCalc((prevCalc) => {
      if (prevCalc.num1 !== "") {
        return {
          ...prevCalc,
          num1:
            prevCalc.num1.length === 1
              ? "0"
              : prevCalc.num1.slice(0, prevCalc.num1.length - 1).toString(),
        };
      } else if (prevCalc.num2 !== "") {
        return {
          ...prevCalc,
          num2:
            prevCalc.num2.length === 1
              ? "0"
              : prevCalc.num2.slice(0, prevCalc.num2.length - 1).toString(),
        };
      }
    });
  }

  function performOperation(num1, num2, operation) {
    if (operation === "+") {
      return num1 + num2;
    } else if (operation === "-") {
      return num1 - num2;
    } else if (operation === "*") {
      return num1 * num2;
    } else if (operation === "/") {
      return num1 / num2;
    }
  }

  React.useEffect(() => {
    function onKeyDown(e) {
      // if (e.key === key) action();
      // console.log(e.key);

      if (numberButtons.includes(e.key)) {
        numberClickEvent(e.key);
      } else if (operationButtons.includes(e.key)) {
        operationClickEvent(e.key);
      } else if (e.key === "Enter") {
        equalsClickEvent();
      } else if (e.key === "%") {
        percentClickEvent();
      } else if (e.key === ".") {
        pointClickEvent();
      } else if (e.key === "Clear") {
        clearClickEvent();
      } else if (e.key === "Backspace") {
        backSpaceEvent();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <main className="calculator">
        <CalculatorScreen value={calc.num1 ? calc.num1 : calc.num2} />
        <CalculatorBody>{calculatorButtons}</CalculatorBody>
      </main>
    </>
  );
}
