import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { Set } from "../services/sets/types/setsType";
import * as Scry from "scryfall-sdk";
import getSets from "../services/sets/getSets";
import { createGetCardsBySet } from "../services/cards/getCardsBySet";
import { useToast } from "./ToastContext"; // Añadir este import

interface SetCardsContextType {
  sets: Set[];
  selectedSet: Set | null;
  cards: Scry.Card[];
  loadSets: () => Promise<void>;
  setSelected: Set | null;
  setSetSelected: (set: Set | null) => void;
  isLoadingSets: boolean;
  isLoadingCards: boolean;
  hasMoreCards: boolean;
  totalCards: number;
  loadMoreCards: () => Promise<void>;
  titleSet: string;
}

const SetCardsContext = createContext<SetCardsContextType | undefined>(
  undefined
);

export const SetCardsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { showToast } = useToast();
  const [sets, setSets] = useState<Set[]>([]);
  const [selectedSet, setSelectedSet] = useState<Set | null>(null);
  const [cards, setCards] = useState<Scry.Card[]>([]);
  const [isLoadingSets, setIsLoadingSets] = useState(false);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [hasMoreCards, setHasMoreCards] = useState(false);
  const [totalCards, setTotalCards] = useState(0);
  const [titleSet, setTitleSet] = useState("");

  const [cardsCache] = useState<
    Record<
      string,
      {
        cards: Scry.Card[];
      }
    >
  >({});

  const memorizedSets = useMemo(() => sets, [sets]);

  const memorizedCards = useMemo(() => {
    if (!selectedSet?.code) return null;
    return cardsCache[selectedSet.code];
  }, [selectedSet?.code, cardsCache]);

  useEffect(() => {
    if (selectedSet?.code) {
      setTitleSet(selectedSet.name);
      loadCardsBySet(selectedSet.code);
    }
  }, [selectedSet?.code]);

  const loadSets = async () => {
    if (memorizedSets.length > 0) return;

    setIsLoadingSets(true);
    try {
      const response = await getSets().execute();
      setSets(response);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load sets";
      showToast(errorMessage, "error");
    } finally {
      setIsLoadingSets(false);
    }
  };

  const loadCardsBySet = async (setCode: string) => {
    if (cardsCache[setCode]) {
      setCards(cardsCache[setCode].cards);
      return;
    }

    setIsLoadingCards(true);
    try {
      const cardService = createGetCardsBySet();
      const response = await cardService.execute(setCode);
      const cards = Array.isArray(response.cards) ? response.cards : [];

      setCards(cards);

      const currentSet = sets.find((set) => set.code === setCode);
      setSelectedSet(currentSet || null);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load cards";
      showToast(errorMessage, "error");
    } finally {
      setIsLoadingCards(false);
    }
  };

  const value = {
    sets: memorizedSets,
    selectedSet,
    cards,
    loadSets,
    loadCardsBySet,
    setSelected: selectedSet,
    setSetSelected: setSelectedSet,
    isLoadingSets,
    isLoadingCards,
    hasMoreCards,
    totalCards,
    loadMoreCards: async () => {
      return Promise.resolve();
    },
    titleSet,
  };

  return (
    <SetCardsContext.Provider value={value}>
      {children}
    </SetCardsContext.Provider>
  );
};

export const useSetCards = () => {
  const context = useContext(SetCardsContext);
  if (context === undefined) {
    throw new Error("useSetCards must be used within a SetCardsProvider");
  }
  return context;
};
