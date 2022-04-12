import { BrowserRouter, Route, Routes } from "react-router-dom";
import Crew from "./routes/Crew";
import Crews from "./routes/Crews";
import Locker from "./routes/Locker";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/random-locker/' element={<Crews />}></Route>
        <Route path='/random-locker/:crewName' element={<Crew />}></Route>
        <Route
          path='/random-locker/saved-list/:lockerMadeTime'
          element={<Locker />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
