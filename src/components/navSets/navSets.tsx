import { Set } from "../../services/sets/types/setsType";
import "./navSets.scss";

const navSets = ({
  sets,
  setSelected,
  onClick,
}: {
  sets: Set[];
  setSelected?: string;
  onClick: (id: Set) => void;
}) => {
  return (
    <nav className="navSets">
      <ul>
        {sets.map((set) => (
          <li
            className={set?.id === setSelected ? "selected" : ""}
            key={set.id}
            role="button"
            onClick={() => onClick(set)}
          >
            <img src={`${set.icon_svg_uri}`} alt={`${set.name}`} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default navSets;
