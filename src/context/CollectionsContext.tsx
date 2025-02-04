import React, { createContext, useState, useEffect, useContext } from "react";
import {
  getAllCollections,
  createCollection,
  getAllCards,
  renameCollection,
} from "../services/database/databaseService";
import getCollectionIds from "../shared/utilities/getCollectionIds";

interface CollectionsContextProps {
  selectedCards: string[];
  setSelectedCards: (cards: string[]) => void;
  refreshSelectedCards: () => void;
  collections: string[];
  setCollections: (collections: string[]) => void;
  selectedCollection: string;
  setSelectedCollection: (collection: string) => void;
  addNewCollection: (collection: string) => void;
  changeSelectedCollection: (colletion: string) => void;
  setNewCollectionName: (name: string) => void;
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

  useEffect(() => {
    const fetchCollections = async () => {
      const collections = await getAllCollections();
      setCollections(collections);
      if (collections.length > 0) {
        setSelectedCollection(collections[0]);
      }
    };
    fetchCollections();
  }, []);

  useEffect(() => {
    const fetchAllCards = async () => {
      refreshSelectedCards();
    };
    fetchAllCards();
  }, [selectedCollection]);

  const addNewCollection = async (collection: string) => {
    await createCollection(collection);
    setCollections((prevCollections) => [...prevCollections, collection]);
    setSelectedCollection(collection);
  };

  const refreshSelectedCards = async () => {
    const collectionSaved = await getAllCards(selectedCollection);
    setSelectedCards(getCollectionIds(collectionSaved));
  };

  const setNewCollectionName = async (name: string) => {
    if (!name) {
      return;
    }
    await renameCollection(name, selectedCollection);
    const allCollections = await getAllCollections();
    setCollections(allCollections);
    setSelectedCollection(name);
    await refreshSelectedCards();
  };

  const changeSelectedCollection = async (collection: string) => {
    if (!collection) {
      return;
    }
    setSelectedCollection(collection);
    await refreshSelectedCards();
  };

  return (
    <CollectionsContext.Provider
      value={{
        selectedCards,
        setSelectedCards,
        refreshSelectedCards,
        collections,
        setCollections,
        selectedCollection,
        setSelectedCollection,
        addNewCollection,
        changeSelectedCollection,
        setNewCollectionName,
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
