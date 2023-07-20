import React from 'react'
import TalkbotMain from "../components/talkbot/TalkbotMain"
import TalkbotHeader from "../components/talkbot/TalkbotHeader"
import TalkbotFooter from "../components/talkbot/TalkbotFooter"
import { useState } from 'react';
import '../css/Talkbot.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function Talkbot() {
  const [message, setMessage] = useState([{ msg: "안녕하세요. AI 비서 그리니입니다. '일상대화, '심리상담', '큐엔에이'를 하고 싶으시면 말씀만 하세요. 대화, 상담, qna라고 말씀하셔도 됩니다. 기본은 대화모드입니다.",  from: false }])
  const getMessage = (msg, from) => {
    setMessage((current) => [...current, ({ msg: msg, from: from })])
  }
  return (
    <>
      <TalkbotHeader />
      <TalkbotMain message={message} />
      <TalkbotFooter setMessage={getMessage} />
    </>
  );
};
export default Talkbot;
 