import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [screenValue, setScreenValue] = useState<string>("0");
  const [, setFirstPart] = useState<number>(0);
  const [, setSecondPart] = useState<number>(0);
  const [op, setOp] = useState<string | null>(null);
  const [dot, setDot] = useState<boolean>(false);
  const [focusedBtn, setFocusedBtn] = useState<string | null>(null);

  const numbers = (value: string): void => {
    if (value === "=") {
      const all = screenValue.split(" ");
      if (all.length < 3) {
        console.error("Invalid expression");
        return;
      }

      const first = parseFloat(all[0]);
      const operator = all[1];
      const second = parseFloat(all[2]);

      if (operator === '/' && second === 0) {
        setScreenValue("division by zero!");
        return;
      }

      let result: number;
      switch (operator) {
        case '+':
          result = first + second;
          break;
        case '-':
          result = first - second;
          break;
        case '*':
          result = first * second;
          break;
        case '/':
          result = first / second;
          break;
        case '%':
          result = first % second;
          break;
        default:
          console.error("Unknown operator");
          return;
      }
      setScreenValue(result.toString());
      setFirstPart(result);
      setOp(null);
      setSecondPart(0);
      setDot(false);
    } else if (screenValue.length >= 13 && !["=", "AC"].includes(value)) {
      // Prevent further input if screenValue length is 10 or more
      return;
    } else if (screenValue === "0" && value === "0") {
      return;
    } else if (screenValue === "0" && !["*", "/", "+", "-", "%"].includes(value)) {
      setScreenValue(value);
    } else if (!["*", "/", "+", "-", "%"].includes(value)) {
      setScreenValue(screenValue + value);
    } else if (op === null && ["*", "/", "+", "-", "%"].includes(value)) {
      setScreenValue(screenValue + ` ${value} `);
      setOp(value);
    }
  }

  const deleted = (): void => {
    setScreenValue('0');
    setFirstPart(0);
    setSecondPart(0);
    setOp(null);
    setDot(false);
  }

  const dots = (dt: string): void => {
    if (!dot && screenValue.length < 13) {
      setScreenValue(screenValue + dt);
      setDot(true);
    }
  }

  const handleButtonClick = (btn: string): void => {
    if (btn === 'AC') {
      deleted();
      setFocusedBtn(btn); // Set focused button state
      setTimeout(() => {
        setFocusedBtn(null); // Clear focused button state after 300ms
      }, 100);
    } else if (btn === '.') {
      dots(btn);
      setFocusedBtn(btn); // Set focused button state
      setTimeout(() => {
        setFocusedBtn(null); // Clear focused button state after 300ms
      }, 100);
    } else {
      numbers(btn);
      setFocusedBtn(btn); // Set focused button state
      setTimeout(() => {
        setFocusedBtn(null); // Clear focused button state after 300ms
      }, 100);
    }
  };

  return (
    <div className="bg-gray-100 inline-block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] md:w-[500px] md:shadow-[8px_8px_8px_rgb(195,195,195),0_0_8px_8px_white] rounded-[40px] p-8 px-10 select-none dura"
    >
      <input
        value={screenValue} 
        readOnly 
        className="font-sourceCodePro text-4xl md:text-5xl w-full my-6 pr-6 h-[82.5px] shadow-[inset_6px_6px_5px_rgb(195,195,195),inset_0_0_10px_8px_white] border-3 border-transparent text-black text-right leading-[75px] rounded-[25px] outline-none select-none cursor-default"
      />
      <div className="grid grid-cols-4 gap-4 md:gap-6">
        {["/", "*", "-", "+", "7", "8", "9", "AC", "4", "5", "6", "1", "2", "3", "=", "0", ".",].map((btn) => (
          <button 
            key={btn} 
            onClick={() => handleButtonClick(btn)} 
            className={`bg-gray-100 border border-transparent rounded-[20px] text-sm md:text-lg font-medium p-[30px] shadow-[6px_6px_6px_rgb(195,195,195),0_0_10px_6px_white] md:hover:shadow-[inset_6px_6px_6px_rgb(195,195,195),inset_0_0_10px_6px_white]
            
            ${ ["*", "/", "+", "-", "AC", "="].includes(btn) ? "text-[#b84242]" : ""
            } ${
              btn === "0" ? "col-span-2 text-left pl-10" : ""
            } ${
              btn === "=" ? "row-span-2" : ""
            } ${
              btn === "AC" ? "row-span-2" : ""
            } ${
              focusedBtn === btn ? "shadow-[inset_6px_6px_6px_rgb(195,195,195),inset_0_0_10px_6px_white]" : "" // Apply class only when focused
            }`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
