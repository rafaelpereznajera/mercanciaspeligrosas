function Radio({identifier, value, text}) {
  return (
    <div>
      <input type="radio" id={`${identifier}${value}`} name={identifier} value={value} />
      <label htmlFor={`${identifier}${value}`}>{text}</label>
    </div>
  );
}

function Fieldset({ data, showAnswer = false }) {
  const { identifier, question, answer, norma, userAnswer } = data;
  const background = `${userAnswer}` === `${answer}` ? "green" : "red";
  return (
    <fieldset id={identifier}>
      <legend>{question}</legend>
      <Radio identifier={identifier} value={"1"} text={data["1"]}/>
      <Radio identifier={identifier} value={"2"} text={data["2"]}/>
      <Radio identifier={identifier} value={"3"} text={data["3"]}/>
      <Radio identifier={identifier} value={"4"} text={data["4"]}/>
      {userAnswer && (
        <div>
          <p style={{background}}>{data[answer]}</p> 
          <p>{norma}</p>
        </div>
      )}
    </fieldset>
  );
}

export default Fieldset;
