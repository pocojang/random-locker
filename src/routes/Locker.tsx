import { useParams } from "react-router";
import { getDate } from "../utils";
import { useState, useEffect } from "react";
import { dbService } from "../fbase";
import { Link } from "react-router-dom";
import styled from "styled-components";
import html2canvas from "html2canvas";

const Container = styled.div`
  margin: 0 auto;
  height: 100vh;
`;

const Header = styled.div`
  display: block;
  font-size: calc(16px + (26 - 16) * ((100vw - 300px) / (1600 - 300)));
  background: var(--primary-darken);
  width: 100%;
  color: white;
  text-align: center;
  padding: 20px;
  h1 {
    font-size: 30px;
    font-weight: 800;
    padding: 10px;
  }
`;

const CrewLockerList = styled.ol`
  border: none;
  height: 12vw;
  max-height: 100px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 1em;
  margin: 30px auto;
  max-width: 64em;
  padding: 0;
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

const CaptureButton = styled.button`
  display: block;
  width: 100%;
  border: none;
  background-color: var(--primary-lighten);
  color: var(--white);
  font-weight: 800;
  padding: 8px;
  font-size: 20px;
  cursor: pointer;
  margin: 0;
  text-align: center;
  &:disabled {
    cursor: not-allowed;
  }
  h2 {
    font-size: 30px;
  }
`;

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

  const handleClickTakeScreenShot = (event: any) => {
    const rect = document.body.getBoundingClientRect();

    html2canvas(event?.target.parentElement).then(canvas => {
      let croppedCanvas = document.createElement("canvas");
      let croppedCanvasContext = croppedCanvas.getContext("2d");

      croppedCanvas.width = rect.width;
      croppedCanvas.height = rect.height;

      croppedCanvasContext?.drawImage(canvas, 0, 0);

      const a = document.createElement("a");
      a.href = croppedCanvas.toDataURL();
      a.download = `${lockerObject.lockerName} 사물함 배정결과.png`;
      a.click();
    });
  };

  return (
    <Container>
      <Header>
        <h1>🗄 우아한테크코스 '{lockerObject?.lockerName}' 사물함 배정결과 🗄</h1>
        <h1>배정일시: {lockerMadeDate}</h1>
      </Header>

      <CaptureButton onClick={handleClickTakeScreenShot}>
        배정결과 다운로드
      </CaptureButton>

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
