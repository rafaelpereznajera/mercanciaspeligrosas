import React, { useState, useRef } from "react";
import Fieldset from "./Fieldset";
var data = require("./output.json");

function shuffle(array) {
  var tmp, current, top = array.length;

  if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
  }

  return array;
}

function getTests(questions, number) {
  const shuffled = shuffle([...questions]);
  return shuffled.slice(0, number);
}

function App() {
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState(undefined);
  const formRef = useRef();

  const newTest = () => {
    setQuestions([]);
    setTimeout(()=> setQuestions(getTests(data, 50)), 100);
    // setTimeout(()=> setQuestions(data.slice(0, 3)), 100);
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
      <h1 className="text-3xl font-bold underline m-3 mb-10">Mercancias peligrosas</h1>
      <form onSubmit={handleSubmit} ref={formRef} className="">
        {tests}
        <div className="flex justify-center m-10">
          {questions.length > 0 && (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Comprobar
            </button>
          )}
        </div>
      </form>
      {result && <p className="flex justify-center font-bold text-3xl mb-20">Correctas: {result}</p>}
      <div className="flex justify-center m-10">
        <button
          onClick={newTest}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Nuevo Test
        </button>
      </div>
    </div>
  );
}

export default App;
