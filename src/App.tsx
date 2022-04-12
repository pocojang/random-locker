import "./App.css";

import shuffle from "lodash.shuffle";

import React, { useState } from "react";
import Confetti from "react-confetti";
import { If } from "react-if";
import useWindowSize from "react-use/lib/useWindowSize";

const CREW_NAME_LIST = [
  "소피아",
  "콤피",
  "위니",
  "티거",
  "후이",
  "꼬재",
  "온스타",
  "밧드",
  "태태",
  "빅터",
  "민초",
  "무비",
  "아놀드",
  "해리",
  "안",
  "우연",
  "준찌",
  "샐리",
  "동키콩",
  "블링",
  "록바",
  "병민",
  "나인",
  "유세지",
  "코카콜라",
  "앨버",
  "비녀",
  "도리",
  "우디",
  "자스민",
  "호프",
  "코이",
  "결",
  "하리",
  "시지프",
  "돔하디",
  "마르코",
];

function App() {
  const { width, height } = useWindowSize();

  const [isRunConfetti, setIsRunConfetti] = useState(false);
  const [crewNameList, setCrewNameList] = useState(CREW_NAME_LIST);

  const onShuffle = () => {
    setCrewNameList(prevState => shuffle(prevState));

    setIsRunConfetti(true);
  };

  return (
    <div className='App'>
      <header>
        <h1>🗄 Woowacourse Locker 🗄</h1>
      </header>

      <button onClick={onShuffle} disabled={isRunConfetti}>
        <h2>{isRunConfetti ? "🎊 Congratulation 🎉" : "👉 Click Me 👈"}</h2>
      </button>

      <If condition={isRunConfetti}>
        <React.Fragment>
          <ol>
            {crewNameList.map((name, index) => (
              <li key={"li-" + index}>
                {index + 1}. {name}
              </li>
            ))}
          </ol>

          <Confetti run={isRunConfetti} width={width} height={height} />
        </React.Fragment>
      </If>
    </div>
  );
}

export default App;
