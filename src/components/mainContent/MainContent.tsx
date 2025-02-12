import React, { useState, useEffect } from "react";
import HeaderColection from "../headerCollection/headerCollection";
import NavSets from "../navSets/navSets";
import HeaderSet from "../headerSet/headerSet";
import Album from "../album/album";
import { useSetCards } from "../../context/SetCardsContext";
import "./MainContent.scss";

const MainContent = () => {
  const [setSelectedTitle, setSetSelectedTitle] = useState<string>("");
  const {
    sets,
    setSelected,
    setSetSelected,
    cards,
    isLoadingSets,
    isLoadingCards,
    hasMoreCards,
    totalCards,
    loadSets,
  } = useSetCards();

  useEffect(() => {
    loadSets();
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (
      scrollHeight - scrollTop <= clientHeight * 1.5 &&
      !isLoadingCards &&
      hasMoreCards
    ) {
      //   loadMoreCards();
    }
  };

  return (
    <div className="container">
      <HeaderColection title={"My colections"} />
      <aside className="sidebar">
        {isLoadingSets ? (
          <div className="loading">Loading sets...</div>
        ) : (
          <NavSets
            sets={sets}
            setSelected={setSelected?.id}
            onClick={setSetSelected}
          />
        )}
      </aside>
      <main className="content-container">
        <header className="content-header">
          <HeaderSet />
          {totalCards > 0 && (
            <div className="cards-count">
              Showing {cards.length} of {totalCards} cards
            </div>
          )}
        </header>
        <section className="content" onScroll={handleScroll}>
          <Album />
          {isLoadingCards && (
            <div className="loading">Loading more cards...</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MainContent;
