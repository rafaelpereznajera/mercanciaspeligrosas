import React, { useState } from "react";
import Fieldset from "./Fieldset";
var data = require("./output.json");

function Lesson() {
  const [text, setText] = useState("ADR 1.1");
  const questions = data
    .filter((item) => {
      return item.norma.includes(text);
    })
    .map((item) => {
      return (
        <Fieldset
          data={item}
          key={item.identifier}
          showAnswer={true}
        ></Fieldset>
      );
    });
  return (
    <div>
      <span>Lesson: </span>
      <input
      style={{border: "2px solid blue"}}
        value={text}
        onChange={(event) => {
          console.log(event.target.value);
          setText(event.target.value);
        }}
      />
      
      {questions}
    </div>
  );
}

export default Lesson;
