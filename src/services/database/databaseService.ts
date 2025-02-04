import {
  addData,
  getData,
  removeData,
  getAllData,
  createStore,
  getAllStores,
  deleteStore,
} from "./indexedDB";

export const toggleCard = async (
  collection: string,
  card: any
): Promise<string | undefined> => {
  try {
    const existingCard = await getData(collection, card.id);
    if (existingCard) {
      await removeData(collection, card.id);
      return `Removed ${card.name}`;
    } else {
      await addData(collection, card);
      return `Added ${card.name}`;
    }
  } catch (error) {
    console.error("Error toggling card:", error);
    throw new Error("It was not possible to toggle the card.");
  }
};

export const getAllCards = async (collection: string): Promise<any[]> => {
  try {
    return await getAllData(collection);
  } catch (error) {
    console.error("Error getting all cards:", error);
    throw new Error("It was not possible to retrieve all cards.");
  }
};

export const createCollection = async (collection: string): Promise<void> => {
  try {
    await createStore(collection);
  } catch (error) {
    console.error("Error creating collection:", error);
    throw new Error("It was not possible to create the collection.");
  }
};

export const deleteCollection = async (
  collection: string
): Promise<string[]> => {
  try {
    return await deleteStore(collection);
  } catch (error) {
    console.error("Error deleting collection:", error);
    throw new Error("It was not possible to delete the collection.");
  }
};

export const renameCollection = async (
  newNameCollection: string,
  oldNameCollection: string
) => {
  if (!newNameCollection || !oldNameCollection) {
    console.error("Invalid collection names provided.");
    throw new Error("Both new and old collection names must be provided.");
  }

  try {
    const data = await getAllData(oldNameCollection);

    await createStore(newNameCollection);

    for (const item of data) {
      await addData(newNameCollection, item);
    }

    await deleteStore(oldNameCollection);
  } catch (error) {
    console.error("Error renaming collection:", error);
    throw new Error("It was not possible to rename the collection.");
  }
};

export const getAllCollections = async (): Promise<string[]> => {
  try {
    return await getAllStores();
  } catch (error) {
    console.error("Error getting all collections:", error);
    throw new Error("It was not possible to retrieve all collections.");
  }
};
