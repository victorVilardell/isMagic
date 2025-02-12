import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCollections } from "../../context/CollectionsContext";
import { useToast } from "../../context/ToastContext";
import {
  faPlusSquare,
  faEdit,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import "./collectionsManager.scss";

const Collections = () => {
  const {
    collections,
    selectedCollection,
    changeSelectedCollection,
    addNewCollection,
    setNewCollectionName,
    deleteCollectionByName,
  } = useCollections();

  const { showToast } = useToast();

  const handleCollectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    changeSelectedCollection(event.target.value);
  };

  const handleAddNewCollection = () => {
    const newCollection = window.prompt("Add the name of a new collection:");
    if (newCollection !== null) {
      try {
        addNewCollection(newCollection);
        showToast("Collection created successfully", "success");
      } catch (error) {
        showToast(
          error instanceof Error
            ? error.message
            : "Unknown error creating collection",
          "error"
        );
      }
    }
  };

  const handleRenamingCollection = async () => {
    const nameCollection = window.prompt("Add the name of a new collection:");
    if (nameCollection !== null) {
      try {
        setNewCollectionName(nameCollection);
        showToast("Collection renamed successfully", "success");
      } catch (error) {
        showToast(
          error instanceof Error
            ? error.message
            : "Unknown error renaming collection",
          "error"
        );
      }
    }
  };

  const handleDeleteCollection = async () => {
    try {
      await deleteCollectionByName(selectedCollection);
      showToast("Collection deleted successfully", "success");
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "Unknown error deleting collection",
        "error"
      );
    }
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
