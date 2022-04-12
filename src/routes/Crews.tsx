import shuffle from "lodash.shuffle";

import { useState } from "react";
import Confetti from "react-confetti";
import { If } from "react-if";
import useWindowSize from "react-use/lib/useWindowSize";
import styled from "styled-components";

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

const Container = styled.div`
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: calc(16px + (26 - 16) * ((100vw - 300px) / (1600 - 300)));
  justify-content: center;
  background: black;
  color: white;
  min-height: 10vh;
  text-align: center;
`;

const StartButton = styled.button`
  display: block;
  width: 100%;
  border: none;
  background-color: ${props => props.theme.accentColor};
  color: #000;
  padding: 8px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  margin-bottom: 2em;
  &:disabled {
    cursor: not-allowed;
  }
`;

const CrewLockerList = styled.ol`
  border: none;
  height: 12vw;
  max-height: 125px;

  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 1em;
  margin: 0 auto;
  max-width: 64em;
  padding: 0;
  @media all and (max-width: 800px) {
    grid-gap: 0.25em;
  }
`;

const CrewLocker = styled.li`
  background-color: grey;
  color: #fff;
  font-weight: 800;
  border: 1px solid #eaeaea;
  height: 12vw;
  max-height: 125px;

  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin-left: 0;
  font-size: 20px;
  text-align: center;
  line-height: 1.7;

  @media all and (max-width: 750px) {
    font-size: 16px;
  }
  @media all and (max-width: 630px) {
    font-size: 13px;
  }
  @media all and (max-width: 530px) {
    font-size: 11px;
  }
`;

function Crews() {
  const { width, height } = useWindowSize();

  const [isRunConfetti, setIsRunConfetti] = useState(false);
  const [crewNameList, setCrewNameList] = useState(CREW_NAME_LIST);

  const onShuffle = () => {
    setCrewNameList(prevState => shuffle(prevState));

    setIsRunConfetti(true);
  };

  return (
    <Container>
      <Header>
        <h1>🗄 Woowacourse Locker 🗄</h1>
      </Header>

      <StartButton onClick={onShuffle} disabled={isRunConfetti}>
        <h2>{isRunConfetti ? "🎊 Congratulation 🎉" : "👉 Click Me 👈"}</h2>
      </StartButton>

      <If condition={isRunConfetti}>
        <>
          <CrewLockerList>
            {crewNameList.map((name, index) => (
              <CrewLocker key={"li-" + index}>
                {index + 1}.
                <br />
                {name}
              </CrewLocker>
            ))}
          </CrewLockerList>

          <Confetti run={isRunConfetti} width={width} height={height} />
        </>
      </If>
    </Container>
  );
}

export default Crews;
