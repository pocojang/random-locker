import { useParams } from "react-router";
import { getDate } from "../utils";
import { useState, useEffect } from "react";
import { dbService } from "../fbase";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Locker() {
  const { lockerMadeTime } = useParams();

  const lockerMadeDate = getDate(Number(lockerMadeTime)!);
  const [lockerObject, setLockerObject] = useState<any>();

  useEffect(() => {
    if (!lockerObject) {
      getLockerObject(lockerMadeTime!);
    }
  }, []);

  const getLockerObject = async (lockerMadeTime: string) => {
    const dbLocker = await dbService.collection("lockerList").get();
    dbLocker.forEach(document => {
      if (document.data().createdAt === Number(lockerMadeTime)) {
        setLockerObject(document.data());
      }
    });
  };

  const Container = styled.div`
    margin: 0 auto;
  `;

  const Header = styled.div`
    display: block;
    font-size: calc(16px + (26 - 16) * ((100vw - 300px) / (1600 - 300)));
    background: black;
    color: white;
    text-align: center;
    margin: 40px;
    h1 {
      font-size: 30px;
      font-weight: 800;
      margin: 20px;
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

  return (
    <Container>
      <Header>
        <h1>🗄 우아한테크코스 4기 잠실캠 사물함 배정결과 🗄</h1>
        <h1>배정일시: {lockerMadeDate}</h1>
      </Header>
      <CrewLockerList>
        {lockerObject?.lockerList.map((name: string, index: number) => (
          <CrewLocker key={"li-" + index}>
            <Link to={`/random-locker/${name}`}>
              {index + 1}.
              <br />
              {name}
            </Link>
          </CrewLocker>
        ))}
      </CrewLockerList>
    </Container>
  );
}
export default Locker;
