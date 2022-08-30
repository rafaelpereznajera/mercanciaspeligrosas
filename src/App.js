import React, { useState, useRef } from 'react';
import "./App.css";
import Fieldset from "./Fieldset";
// import { questions } from "./output.json";
var data = require("./output.json");

function App() {
  const [questions, setQuestions] = useState([]);
  const formRef = useRef();

  const question = {
    1: "Extintores manuales para los sistemas del compartimento del motor.",
    2: "Extintores automáticos para los sistemas del compartimento del motor.",
    3: "Extintores automáticos o manuales para los sistemas del compartimento del motor.",
    4: "Todas son incorrectas.",
    identifier: "2",
    question: "Las MEMU estarán equipados de:",
    answer: "2",
    norma: "ADR 9.8.7.1",
  };
  const question2 = {
    1: "Extintores manuales para los sistemas del compartimento del motor.",
    2: "Extintores automáticos para los sistemas del compartimento del motor.",
    3: "Extintores automáticos o manuales para los sistemas del compartimento del motor.",
    4: "Todas son incorrectas.",
    identifier: "7",
    question: "Las MEMU estarán equipados de:",
    answer: "2",
    norma: "ADR 9.8.7.1",
  };
  const newTest = () => {
    setQuestions(data.slice(0, 3));
    formRef.current.reset();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
    const solved = questions.map(item => {
      const userAnswer = formProps[item.identifier];
      return { ...item, userAnswer}
    });
    console.log(solved);
    setQuestions(solved)
  };
  const tests = questions.map((item) => {
    return <Fieldset data={item} key={item.identifier}></Fieldset>
  })
  return (
    <div className="App">
      <button onClick={newTest}>Nuevo Test</button>
      <form onSubmit={handleSubmit} ref={formRef}>
        {tests}
        <button>submit</button>
      </form>
      {/* <form onSubmit={handleSubmit}>
        <Fieldset data={question} key={question.identifier}></Fieldset>
        <Fieldset data={question2} key={question2.identifier}></Fieldset>
        <button>submit</button>
      </form> */}
    </div>
  );
}

export default App;
