import React, { createContext, useState, useEffect, useContext } from "react";
import * as Scry from "scryfall-sdk";
import {
  getAllCollections,
  createCollection,
  getAllCards,
  renameCollection,
  toggleCard,
  deleteCollection,
} from "../services/database/databaseService";
import getCollectionIds from "../shared/utilities/getCollectionIds";

interface CollectionsContextProps {
  togglingCardAndRefresh: (card: Scry.Card) => void;
  selectedCards: string[];
  setSelectedCards: (cards: string[]) => void;
  collections: string[];
  setCollections: (collections: string[]) => void;
  selectedCollection: string;
  setSelectedCollection: (collection: string) => void;
  addNewCollection: (collection: string) => void;
  changeSelectedCollection: (colletion: string) => void;
  setNewCollectionName: (name: string) => void;
  deleteCollectionByName: (collectionName: string) => void;
}

const CollectionsContext = createContext<CollectionsContextProps | undefined>(
  undefined
);

export const CollectionsProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [collections, setCollections] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const fetchCollections = async () => {
    const collections = await getAllCollections();
    setCollections(collections);
    if (collections.length > 0) {
      setSelectedCollection(collections[0]);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const updateSelectedCards = async () => {
    if (selectedCollection) {
      const collectionCards = await getAllCards(selectedCollection);
      setSelectedCards(getCollectionIds(collectionCards));
    }
  };

  useEffect(() => {
    updateSelectedCards();
  }, [selectedCollection]);

  const togglingCardAndRefresh = async (card: Scry.Card) => {
    try {
      await toggleCard(selectedCollection, card);
      const updatedCards = await getAllCards(selectedCollection);
      setSelectedCards(getCollectionIds(updatedCards));
    } catch (error) {
      console.error("Error toggling card:", error);
      throw new Error("Failed to update card in collection");
    }
  };

  const addNewCollection = async (newCollection: string) => {
    const snapshot = {
      collections: [...collections],
      selected: selectedCollection,
    };

    try {
      setCollections((prev) => [...prev, newCollection]);
      setSelectedCollection(newCollection);
      await createCollection(newCollection);
    } catch (error) {
      setCollections(snapshot.collections);
      setSelectedCollection(snapshot.selected);
      throw new Error("Failed to create collection. Please try again later.");
    }
  };

  const deleteCollectionByName = async (collectionName: string) => {
    const snapshot = {
      collections: [...collections],
      selected: selectedCollection,
    };

    try {
      await deleteCollection(collectionName);
      const updatedCollections = await getAllCollections();
      setCollections(updatedCollections);

      if (collectionName === selectedCollection) {
        setSelectedCollection(
          updatedCollections.length > 0 ? updatedCollections[0] : ""
        );
      }
    } catch (error) {
      setCollections(snapshot.collections);
      setSelectedCollection(snapshot.selected);
      throw new Error("Failed to delete collection. Please try again later.");
    }
  };

  const setNewCollectionName = async (name: string) => {
    if (!name) return;
    await renameCollection(name, selectedCollection);
    const allCollections = await getAllCollections();

    setCollections(allCollections);
    setSelectedCollection(name);
  };

  const changeSelectedCollection = (collection: string) => {
    if (!collection) {
      return;
    }

    setSelectedCollection(collection);
  };

  return (
    <CollectionsContext.Provider
      value={{
        togglingCardAndRefresh,
        selectedCards,
        setSelectedCards,
        collections,
        setCollections,
        selectedCollection,
        setSelectedCollection,
        addNewCollection,
        changeSelectedCollection,
        setNewCollectionName,
        deleteCollectionByName,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};

export const useCollections = (): CollectionsContextProps => {
  const context = useContext(CollectionsContext);
  if (!context) {
    throw new Error("useCollections must be used within a CollectionsProvider");
  }
  return context;
};
