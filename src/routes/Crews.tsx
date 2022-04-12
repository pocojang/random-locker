import shuffle from "lodash.shuffle";

import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { dbService } from "../fbase";
import { getDate } from "../utils";
import { CREW_NAME_LIST } from "../constants";

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

const MemberForm = styled.form`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;

const MemberInput = styled.input`
  padding: 0 8px;
  border: 1px solid #fff;
  box-sizing: border-box;
  border-radius: 4px 0 0 4px;
  height: 36px;
  line-height: 36px;
  font-weight: 400;
  font-size: 16px;
  width: 80%;
  height: 60px;
  margin: 30px 0 20px 0;
  padding: 10px;
`;

const MemberSubmitButton = styled.input`
  cursor: pointer;
  border: 1px solid #00bcd4;
  background: #00bcd4;
  border-radius: 0 4px 4px 0;
  height: 36px;
  border-style: none;
  color: #fff;
  font-weight: bold;
  height: 60px;
  width: 10%;
  font-size: 20px;
  margin: 30px 0 20px 0;
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
  const [members, setMembers] = useState("");
  const [memberList, setMemberList] = useState<string[]>([]);

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

  const onMemberSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const memberList = members.split(",").map(name => name.trim());
    setCrewNameList(memberList);
    console.log(crewNameList);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMembers(value);
  };

  return (
    <Container>
      <Header>
        <h1>🗄 우아한테크코스 4기 잠실캠 사물함 🗄</h1>
      </Header>

      <MemberForm onSubmit={onMemberSubmit}>
        <MemberInput
          type='text'
          value={members}
          onChange={onChange}
          placeholder='전체 인원의 닉네임을 콤마로 구분해서 입력해주세요.'
        />
        <MemberSubmitButton type='submit' value='확인' />
      </MemberForm>

      <div>
        [사물함 배정 대상]:
        {crewNameList.map((member, index) => (
          <span key={index}>{member}, </span>
        ))}
      </div>

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
