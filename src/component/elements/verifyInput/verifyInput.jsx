import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../context/theme";
import st from "./verifyInput.module.css";
export default function VerifyInput({ verifyCode, setVerfyCode }) {
  const [dark] = useTheme();
  const inputRef = useRef(null);
  const [inputValues, setInputValues] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  });

  const fields = {
    background: dark ? "" : " rgba(119, 119, 119, 0.06)",
    color: dark ? " " : "black",
  };

  const handleInputValueChange = (index, e) => {
    const { value } = e.target;
    setInputValues({
      ...inputValues,
      [index]: value,
    });
  };

  const handleChangeFocus = (index, e) => {
    const value = e.target.value;
    const el = inputRef.current.children;
    if (index >= 0 && index < 5 && value.length === 1 && e.keyCode !== 8)
      el[index + 1].focus();
    else if (index > 0 && index <= 5 && value.length === 0 && e.keyCode === 8)
      el[index - 1].focus();
  };

  useEffect(() => {
    let value = "";
    Object.values(inputValues).map((item) => (value += item));
    setVerfyCode(value);
  }, [inputValues, setVerfyCode, verifyCode]);

  return (
    <div ref={inputRef} id="containerRef" className={st.container}>
      {Object.keys(inputValues).map((input, index) => (
        <input
          key={index}
          type="text"
          onKeyUp={(e) => handleChangeFocus(index, e)}
          onChange={(e) => {
            handleInputValueChange(index, e);
          }}
          value={inputValues[input]}
          style={fields}
          className="code_input"
          maxLength="1"
        />
      ))}
    </div>
  );
}
