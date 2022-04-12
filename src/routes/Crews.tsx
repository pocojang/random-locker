import shuffle from "lodash.shuffle";

import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { dbService } from "../fbase";
import { getDate } from "../utils";

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
  h1 {
    font-size: 30px;
    font-weight: 800;
  }
`;

const StartButton = styled.button`
  display: block;
  width: 100%;
  border: none;
  background-color: ${props => props.theme.accentColor};
  color: #fff;
  font-weight: 800;
  padding: 8px;
  font-size: 20px;
  cursor: pointer;
  text-align: center;
  &:disabled {
    cursor: not-allowed;
  }

  h2 {
    font-size: 30px;
  }
`;

const CrewLockerList = styled.ol`
  border: none;
  height: 12vw;
  max-height: 100px;
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
  max-height: 100px;
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

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 30px;
`;

const SavedLockerList = styled.ol`
  display: grid;
  grid-template-columns: repeat(8, minmax(100px, auto));
  list-style: none;
  margin-bottom: 30px;
  gap: 10px;
  @media all and (max-width: 800px) {
    grid-gap: 0.25em;
  }
`;

const SavedLockers = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  list-style: none;
  margin-left: 0;
  height: 60px;
  border-radius: 5px;
  background-color: ${props => props.theme.accentColor};
  font-weight: 800;

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

const DateListMade = styled.div``;

const EmptyText = styled.div`
  font-size: 50px;
  font-weight: 700;
  margin: 0 30px;
`;

interface Locker {
  id: string;
  createdAt: string;
  lockerList: string[];
}

function Crews() {
  const { width, height } = useWindowSize();

  const [isRunConfetti, setIsRunConfetti] = useState(false);
  const [crewNameList, setCrewNameList] = useState(CREW_NAME_LIST);
  const [lockerList, setLockerList] = useState<Locker[]>([]);

  useEffect(() => {
    dbService.collection("lockerList").onSnapshot(snapshot => {
      const lockerArray = snapshot.docs.map(doc => ({
        id: doc.id,
        createdAt: doc.data().createdAt,
        lockerList: doc.data().lockerList,
      }));
      setLockerList(lockerArray);
    });
  }, [lockerList]);

  const onShuffle = () => {
    setCrewNameList(prevState => {
      const lockerList = shuffle(prevState);
      dbService.collection("lockerList").add({
        lockerList,
        createdAt: Date.now(),
      });

      return lockerList;
    });
    setIsRunConfetti(true);
  };

  return (
    <Container>
      <Header>
        <h1>🗄 우아한테크코스 4기 잠실캠 사물함 🗄</h1>
      </Header>

      <StartButton onClick={onShuffle} disabled={isRunConfetti}>
        <h2>
          {isRunConfetti ? "🎊 Congratulation 🎉" : "👉 사물함 배정하기 👈"}
        </h2>
      </StartButton>

      <Wrapper>
        <SavedLockerList>
          {lockerList
            .sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
            .map(locker => (
              <SavedLockers key={locker.id}>
                <DateListMade>
                  <Link to={`/random-locker/saved-list/${locker.createdAt}`}>
                    {getDate(Number(locker.createdAt))}
                  </Link>
                </DateListMade>
              </SavedLockers>
            ))}
        </SavedLockerList>
      </Wrapper>
      <>
        {isRunConfetti ? (
          <CrewLockerList>
            {crewNameList.map((name, index) => (
              <CrewLocker key={"li-" + index}>
                <Link to={`/random-locker/${name}`}>
                  {index + 1}.
                  <br />
                  {name}
                </Link>
              </CrewLocker>
            ))}
          </CrewLockerList>
        ) : (
          <EmptyText>
            텅~비었네요. 사물함을 배정하시거나 기존에 배정된 사물함 결과를
            확인하세요.
          </EmptyText>
        )}
      </>

      <Confetti run={isRunConfetti} width={width} height={height} />
    </Container>
  );
}

export default Crews;
