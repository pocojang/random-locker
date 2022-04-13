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
  background: var(--primary-darken);
  min-height: 10vh;
  text-align: center;
  h1 {
    font-size: 30px;
    font-weight: 800;
    @media all and (max-width: 800px) {
      font-size: 25px;
    }
    @media all and (max-width: 600px) {
      font-size: 22px;
    }
  }
`;

const StartButton = styled.button`
  display: block;
  width: 100%;
  border: none;
  background-color: var(--primary);
  color: var(--white);
  font-weight: 800;
  padding: 8px;
  font-size: 20px;
  cursor: pointer;
  margin: 20px 0 0 0;
  text-align: center;
  &:disabled {
    cursor: not-allowed;
    background-color: var(--secondary-darken);
  }
  &:hover {
    background-color: var(--primary-darken);
    &:disabled {
      background-color: var(--secondary-darken);
    }
  }
  h2 {
    font-size: 30px;
    @media all and (max-width: 800px) {
      font-size: 25px;
    }
    @media all and (max-width: 600px) {
      font-size: 22px;
    }
  }
`;

const CrewLockerList = styled.ol`
  border: none;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 1em;
  margin: 20px auto;
  max-width: 64em;
  padding: 10px 0;
  @media all and (max-width: 800px) {
    grid-gap: 0.25em;
  }
`;

const CrewLocker = styled.li`
  background-color: var(--secondary-darken);
  color: var(--white);
  font-weight: 800;
  border-radius: 4px;
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
  &:hover {
    background-color: var(--primary);
  }
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
  padding: 30px 0;
`;

const SavedLockerList = styled.ol`
  gap: 10px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;

const SavedLockers = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  list-style: none;
  margin-left: 0;
  border-radius: 5px;
  background-color: var(--primary);
  font-weight: 800;
  padding: 10px;
  width: 150px;
  &:hover {
    background-color: var(--primary-darken);
  }
  @media all and (max-width: 800px) {
    font-size: 16px;
  }
  @media all and (max-width: 600px) {
    font-size: 13px;
  }
`;

const MemberForm = styled.form`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;

const LockerNameInput = styled.input`
  border: 0;
  background-color: var(--white);
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 16px;
  width: 140px;
  height: 34px;
  padding: 3px;
  text-align: center;
  margin: 3px;
  @media all and (max-width: 600px) {
    font-size: 13px;
    width: 120px;
    height: 26px;
  }
`;

const MemberInput = styled.input`
  padding: 0 8px;
  border: 1px solid var(--secondary);
  background-color: var(--white);
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
  @media all and (max-width: 600px) {
    font-size: 13px;
    height: 40px;
  }
`;

const MemberSubmitButton = styled.input`
  cursor: pointer;
  border: 1px solid var(--primary);
  background: var(--primary);
  border-radius: 0 4px 4px 0;
  height: 36px;
  border-style: none;
  color: var(--white);
  font-weight: bold;
  height: 60px;
  width: 100px;
  font-size: 20px;
  margin: 30px 0 20px 0;
  &:hover {
    background-color: var(--primary-darken);
  }
  @media all and (max-width: 600px) {
    font-size: 13px;
    height: 40px;
    width: 60px;
  }
`;

const TargetMemberWrapper = styled.div`
  margin: 0;
  font-size: 20px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  line-height: 2;
  border-radius: 4px;
  background-color: var(--secondary-lighten);
  margin: 3px;
  padding: 3px;
  @media all and (max-width: 800px) {
    font-size: 16px;
  }
  @media all and (max-width: 600px) {
    font-size: 13px;
  }
`;

const TargetMembers = styled.span`
  border-radius: 4px;
  color: var(--white);
  background-color: var(--primary);
  margin: 3px;
  padding: 3px;
  &:hover {
    background-color: var(--primary-darken);
  }
`;

interface Locker {
  id: string;
  createdAt: string;
  lockerList: string[];
  lockerName: string;
}

function Crews() {
  const { width, height } = useWindowSize();

  const [isRunConfetti, setIsRunConfetti] = useState(false);
  const [crewNameList, setCrewNameList] = useState(CREW_NAME_LIST);
  const [lockerObject, setLockerObject] = useState<Locker[]>([]);
  const [members, setMembers] = useState("");
  const [lockerName, setLockerName] = useState("프론트엔드 4기");
  const [submit, setSubmit] = useState(false);
  const [staticCrewNameList, setStaticCrewNameList] = useState(CREW_NAME_LIST);

  useEffect(() => {
    dbService.collection("lockerList").onSnapshot(snapshot => {
      const lockerArray = snapshot.docs.map(doc => ({
        id: doc.id,
        createdAt: doc.data().createdAt,
        lockerList: doc.data().lockerList,
        lockerName: doc.data().lockerName,
      }));
      setLockerObject(lockerArray);
    });
  }, []);

  const onShuffle = () => {
    if (!submit) {
      alert(
        "사물함 배정 인원 확인 버튼을 먼저 눌러주세요. 수정하지 않을 시, 기본값은 프론트엔드 4기 인원입니다."
      );
      return;
    }

    setCrewNameList(prevState => {
      const lockerList = shuffle(prevState);
      dbService.collection("lockerList").add({
        lockerList,
        createdAt: Date.now(),
        lockerName,
      });

      return lockerList;
    });
    setIsRunConfetti(true);
  };

  const onMemberSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmit(true);
  };

  const onMembersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMembers(value);
    const memberList = members.split(",").map(name => name.trim());
    setStaticCrewNameList(memberList);
    setCrewNameList(memberList);
  };

  const onLockerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setLockerName(value);
  };

  return (
    <Container>
      <Header>
        <h1>🗄 우아한테크코스 사물함 🗄</h1>
      </Header>

      <MemberForm onSubmit={onMemberSubmit}>
        <MemberInput
          type='text'
          value={members}
          onChange={onMembersChange}
          placeholder='사물함 배정 대상 인원들의 닉네임을 콤마로 구분하여 입력해주세요. 수정하지 않을 시, 기본값은 프론트엔드 4기 인원입니다.'
        />
        <MemberSubmitButton type='submit' value='확인' />
      </MemberForm>

      <TargetMemberWrapper>
        <LockerNameInput
          type='text'
          value={lockerName}
          onChange={onLockerNameChange}
          placeholder='사물함 배정 제목을 입력해주세요.'
        />
        {staticCrewNameList.map((member, index) => (
          <Link key={index} to={`/random-locker/${member}`}>
            <TargetMembers key={index}>{member}</TargetMembers>
          </Link>
        ))}
      </TargetMemberWrapper>

      <StartButton onClick={onShuffle} disabled={isRunConfetti}>
        <h2>
          {isRunConfetti
            ? `🎊 [${lockerName}] 사물함 배정완료 🎉`
            : `👉 [${lockerName}] 사물함 배정하기 👈`}
        </h2>
      </StartButton>

      <>
        {isRunConfetti && (
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
        )}
      </>

      <Wrapper>
        <SavedLockerList>
          {lockerObject
            .sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
            .map(locker => (
              <SavedLockers key={locker.id}>
                <Link to={`/random-locker/saved-list/${locker.createdAt}`}>
                  {locker.lockerName}
                  <br />
                  {getDate(Number(locker.createdAt))}
                </Link>
              </SavedLockers>
            ))}
        </SavedLockerList>
      </Wrapper>

      <Confetti run={isRunConfetti} width={width} height={height} />
    </Container>
  );
}

export default Crews;
