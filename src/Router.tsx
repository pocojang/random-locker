import { BrowserRouter, Route, Routes } from "react-router-dom";
import Crew from "./routes/Crew";
import Crews from "./routes/Crews";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/random-locker/:crewName' element={<Crew />}></Route>
        <Route path='/random-locker/' element={<Crews />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
