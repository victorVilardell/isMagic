import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCollections } from "../../context/CollectionsContext";
import {
  faPlusSquare,
  faEdit,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import "./collectionsManager.scss";
import { deleteCollection } from "../../services/database/databaseService";

const Collections = () => {
  const {
    collections,
    setCollections,
    selectedCollection,
    changeSelectedCollection,
    addNewCollection,
    setNewCollectionName,
  } = useCollections();

  const handleCollectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    changeSelectedCollection(event.target.value);
  };

  const handleAddNewCollection = () => {
    const newCollection = window.prompt("Add the name of a new collection:");
    if (newCollection !== null) {
      addNewCollection(newCollection);
    }
  };

  const handleRenamingCollection = async () => {
    const nameCollection = window.prompt("Add the name of a new collection:");
    if (nameCollection !== null) {
      setNewCollectionName(nameCollection);
    }
  };

  const handleDeleteCollection = async () => {
    const availableCollections = await deleteCollection(selectedCollection);
    await setCollections(availableCollections);
  };

  return (
    <div className="collections">
      <div className="styled-select">
        <select
          value={selectedCollection}
          onChange={(e) => handleCollectionChange(e)}
        >
          {collections.map((collection, index) => (
            <option key={index} value={collection}>
              {collection}
            </option>
          ))}
        </select>
      </div>
      <ul>
        <li>
          <FontAwesomeIcon
            icon={faPlusSquare}
            onClick={handleAddNewCollection}
            title="Add new collection"
          />
        </li>
        <li>
          <FontAwesomeIcon
            icon={faEdit}
            onClick={handleRenamingCollection}
            title="Edit collection name"
          />
        </li>
        <li>
          <FontAwesomeIcon
            icon={faEye}
            onClick={() => alert("View selected collection")}
            title="View collection"
          />
        </li>
        <li>
          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={handleDeleteCollection}
            title="Delete collection"
          />
        </li>
      </ul>
    </div>
  );
};

export default Collections;
