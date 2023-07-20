import { Form, Button } from "react-bootstrap";
import sendImage from "../../img/send-icon.png";
import React, { useState } from "react";

/* 대화 퓨샷 */
const fewshot =
  "Greeni is a kind and talkative friend. \n\n 당신 : 밥 먹었어?\nGreeni :   네, 밥은 다 먹었어요. 맛있게 먹었어요!\n당신 : 뭐 먹었어?\nGreeni : 고기랑 밥을 먹었어요. 그리고 야채도 먹었어요.";

/* history */
var history =fewshot;

/* config */
var config = {
 /*   model: "davinci:ft-personal-2022-12-07-08-51-09"  ,*/
     model: "text-davinci-003", 
  stop: ["\n", "->"],
  temperature: 0.5,
  max_tokens: 150,
  top_p: 1,
  frequency_penalty: 0.5,
  presence_penalty: 0,
};

/* api */
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: " ",
});
const openai = new OpenAIApi(configuration);

/* export */
function TalkbotFooter(props) {

  const [inputform, setinputform] = useState("");
  const handleChange = ({ target: { value } }) => setinputform(value);

  /* 서밋하면 인풋란에 입력한 값 사라지게 하기 (딜레이걸어서해결함 딜레이안걸면 서밋하자마자 사라져서 값 전달 안됨)*/
  function inputClear() {
    setTimeout(function() {
      setinputform("");
    }, 10); //밀리sec delay
  }

  /* 아웃풋 생성 */
  function outputCreate() {
    var validater = document.querySelector(".input-form").value;
    var object = {};
    object[validater] = 1;

    /* 프롬프트  */
    var prompt_initial =
      "당신 : " +
      document.querySelector(".input-form").value +
      "->" +
      " \nGreeni : ";
    var prompt = history + " \n" + prompt_initial;

    /* 출력단 */
    openai
      .createCompletion({
        prompt: prompt,
        model: config.model,
        //model:"text-ada-001",
        //model: "davinci:ft-personal-2022-12-04-12-58-21",
        stop: config.stop, // [ ] 안 문자를 모델이 말하지 않는다. 금지어 최대4개, 말을하나도못할수도있음
        temperature: config.temperature, // 낮을수록 결정적, 반복적
        max_tokens: config.max_tokens, // 생성할 최대 토큰 수
        top_p: config.top_p, // 높을수록 확률이 높은 것을 택한다, 높을수록 랜덤성down
        frequency_penalty: config.frequency_penalty, // 높을수록 모델이 동일한 줄을 반복할 가능성을 줄인다
        presence_penalty: config.presence_penalty, // 높을수록 모델이 새로운 주제에 대해 이야기할 가능성을 높인다
      })
      .then((result) => {
        /* 히스토리에 아웃풋을 누적 */
        history = prompt + result.data.choices[0].text;
        console.log("아웃풋뽑은후최종history : ", history);
        /* 모델의 대답을 아웃풋버블에 넣기 */
        props.setMessage(result.data.choices[0].text, false);
      })
}

  /* 유저의 인풋을 인풋버블에넣기 */
  const handleSubmit = (event) => {
    /* 라우트이동방지 */
    event.preventDefault();
    /* 유저의 인풋을 인풋버블에넣기 */
    props.setMessage(inputform, true);
    /* 아웃풋 생성 펑션 구동 */
    outputCreate();
    //alert(`변경된 패스워드: ${inputform}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <footer>
        <Form.Control
          onChange={handleChange}
          type="inputform"
          name="inputform"
          value={inputform}
          placeholder=" 그리니에게 무엇이든 물어보세요."
          className="input-form"
        />
        <Button
          variant="#fff"
          type="submit"
          className="input-button"
          onClick={inputClear}
        >
          <img className="send-icon" src={sendImage} />
        </Button>
      </footer>
    </Form>
  );
}
export default TalkbotFooter;
