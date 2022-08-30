function Radio({identifier, value, text, answer, userAnswer}) {
  let showBorder = undefined;
  if (userAnswer && answer === value) {
    if (userAnswer === answer) {
      showBorder = "border border-green-600 bg-green-300 font-bold"
    } else {
      showBorder = "border border-red-600 bg-red-400 font-bold"
    }
  }
  return (
    <div className={`mb-2 ${showBorder}`}>
      <input type="radio" id={`${identifier}${value}`} name={identifier} value={value} />
      <label htmlFor={`${identifier}${value}`} className="ml-2">{text}</label>
    </div>
  );
}

function Fieldset({ data, showAnswer = false }) {
  const { identifier, question, answer, norma, userAnswer } = data;
  const background = `${userAnswer}` === `${answer}` ? "green" : "red";
  return (
    <fieldset id={identifier} className="m-4 leading-loose">
      <legend className="font-bold mb-5">{question}</legend>
      <Radio identifier={identifier} value={"1"} text={data["1"]} answer={answer} userAnswer={userAnswer}/>
      <Radio identifier={identifier} value={"2"} text={data["2"]} answer={answer} userAnswer={userAnswer}/>
      <Radio identifier={identifier} value={"3"} text={data["3"]} answer={answer} userAnswer={userAnswer}/>
      <Radio identifier={identifier} value={"4"} text={data["4"]} answer={answer} userAnswer={userAnswer}/>
      {userAnswer && (
        <div>
          <p className="m-5 font-bold">{norma}</p>
        </div>
      )}
    </fieldset>
  );
}

export default Fieldset;
