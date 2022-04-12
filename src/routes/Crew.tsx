import { useParams } from "react-router";

function Crew() {
  const { crewName } = useParams();
  return <h1>Crew: {crewName}</h1>;
}

export default Crew;
