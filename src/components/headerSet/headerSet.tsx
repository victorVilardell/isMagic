import { useSetCards } from "../../context/SetCardsContext";

const HeaderSet = () => {
  const { titleSet } = useSetCards();
  return <h2>{titleSet}</h2>;
};

export default HeaderSet;
