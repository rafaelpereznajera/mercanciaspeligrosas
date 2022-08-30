import React, { useState, useRef } from "react";
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
      <h1 className="text-3xl font-bold underline">Mercancias peligrosas</h1>
      <div className="flex justify-center m-10">
        <button
          onClick={newTest}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Nuevo Test
        </button>
      </div>
      <form onSubmit={handleSubmit} ref={formRef} className="m-5">
        {tests}
        <div className="flex justify-center m-10">
          {questions && (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Comprobar
            </button>
          )}
        </div>
      </form>
      {result && <p>Correctas: {result}</p>}
    </div>
  );
}

export default App;
