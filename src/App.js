import React, { useState, useRef } from "react";
import "./App.css";
import Fieldset from "./Fieldset";
var data = require("./output.json");

function App() {
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState("");
  const formRef = useRef();

  const newTest = () => {
    setQuestions(data.slice(0, 3));
    formRef.current.reset();
    setResult("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    const solved = questions.map((item) => {
      const userAnswer = formProps[item.identifier] || " ";
      return { ...item, userAnswer };
    });
    setQuestions(solved);
    let correct = 0;
    for (const question of solved) {
      if (question.answer === question.userAnswer) {
        correct += 1;
      }
    }
    setResult(`${correct}/${solved.length}`);
  };
  const tests = questions.map((item) => {
    return <Fieldset data={item} key={item.identifier}></Fieldset>;
  });
  return (
    <div className="App">
      <button onClick={newTest}>Nuevo Test</button>
      <form onSubmit={handleSubmit} ref={formRef}>
        {tests}
        <button>submit</button>
      </form>
      <p>Correctas: {result}</p>
    </div>
  );
}

export default App;
