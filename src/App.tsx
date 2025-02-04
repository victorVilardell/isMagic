import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.scss";
import getSets from "./services/sets/getSets";
import * as Scry from "scryfall-sdk";
import HeaderColection from "./components/headerCollection/headerCollection";
import NavSets from "./components/navSets/navSets";
import HeaderSet from "./components/headerSet/headerSet";
import Album from "./components/album/album";
import getCardsBySet from "./services/cards/getCardsBySet";
import { getAllCards, toggleCard } from "./services/database/databaseService";
import { useCollections } from "./context/CollectionsContext";
import { Set } from "./services/sets/types/setsType";
import getCollectionIds from "./shared/utilities/getCollectionIds";

function App() {
  const [sets, setSets] = useState<Set[]>([]);
  const [setSelected, setSetSelected] = useState<Set>();
  const [setSelectedTitle, setSetSelectedTitle] = useState<string>("");
  const [cards, setCards] = useState<Scry.Card[]>([]);
  const [page, setPage] = useState(1);

  const { selectedCollection, setSelectedCards } = useCollections();

  const memoizedGetSets = useMemo(() => getSets(), []);
  const memoizedGetSetCard = useMemo(() => getCardsBySet(), []);

  const fetchCards = useCallback(async () => {
    if (setSelected?.code) {
      setSetSelectedTitle(setSelected?.name || "");
      const newCards = await memoizedGetSetCard.execute(setSelected.code, page);
      setCards((prevCards) => [...prevCards, ...newCards]);
    }
  }, [memoizedGetSetCard, setSelected, page]);

  useEffect(() => {
    if (setSelected) {
      setPage(1);
      setCards([]);
      fetchCards();
    }
  }, [setSelected, fetchCards]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sets = await memoizedGetSets.execute();
        setSets(sets);
      } catch (error) {
        console.error("Error fetching sets:", error);
      }
    };

    fetchData();
  }, [memoizedGetSets]);

  useEffect(() => {
    if (page > 1) {
      fetchCards();
    }
  }, [page, fetchCards]);

  const handleDeckClick = async (card: Scry.Card) => {
    await toggleCard(selectedCollection, card);
    const collectionSaved = await getAllCards(selectedCollection);
    setSelectedCards(getCollectionIds(collectionSaved));
  };

  return (
    <div className="container">
      <HeaderColection title={"My colections"} />
      <aside className="sidebar">
        <NavSets
          sets={sets}
          setSelected={setSelected?.id}
          onClick={setSetSelected}
        />
      </aside>
      <main className="content-container">
        <header className="content-header">
          <HeaderSet setSelectedTitle={setSelectedTitle} />
        </header>
        <section className="content">
          <Album cards={cards} onHandleClick={handleDeckClick} />
        </section>
      </main>
    </div>
  );
}

export default App;
