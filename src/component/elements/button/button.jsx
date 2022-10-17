import st from "./button.module.css";
export default function Button(props) {
  return (
    <>
      <button
        style={props.style}
        className={`${st.btn} ${props.className}`}
        onClick={props.FunctionEvent}
      >
        {props.children}{" "}
      </button>
    </>
  );
}
