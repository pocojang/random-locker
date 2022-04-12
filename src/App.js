import { useState } from "react";
import "./App.css";
import shuffle from "lodash.shuffle";
import crewNameList from "./mockData";

function App() {
  const [crewList, setCrewList] = useState(crewNameList);
  const [isClicked, setIsClicked] = useState(false);

  const handleRandomLocker = () => {
    const shuffled = shuffle(crewList);

    setIsClicked(true);
    setCrewList(shuffled);
  };

  return (
    <div className="App">
      <header>
        <h1>🗄 우아한테크코스 락커 🗄</h1>
        <button type="button" onClick={handleRandomLocker} disabled={isClicked}>
          {isClicked ? "🎊 축하드립니다 🎊" : "🔥 여기를 클릭 하세요 🔥"}
        </button>
      </header>
      {isClicked && (
        <main>
          {crewList.map((name, index) => (
            <li className="item" key={index}>
              <p>{index + 1}</p>
              <p>{name}</p>
              <span>🟠</span>
            </li>
          ))}
        </main>
      )}
    </div>
  );
}

export default App;
