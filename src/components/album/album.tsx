import * as Scry from "scryfall-sdk";
import "./album.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useCollections } from "../../context/CollectionsContext";

const Album = ({
  cards,
  onHandleClick,
}: {
  cards: Scry.Card[];
  onHandleClick: (card: Scry.Card) => {};
}) => {
  const { selectedCards } = useCollections();
  return (
    <ul className="album">
      {cards.map((card) => (
        <li key={card.id}>
          <div>
            <img
              src={card.image_uris?.small}
              alt={card.name}
              title={card.name}
            />
            <button className="heart-icon" onClick={() => onHandleClick(card)}>
              <FontAwesomeIcon
                icon={
                  selectedCards.includes(card.id)
                    ? faHeartSolid
                    : faHeartRegular
                }
              />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Album;
