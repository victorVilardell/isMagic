import * as Scry from "scryfall-sdk";

const getCollectionIds = (collection: Scry.Card[]): string[] => {
  if (!collection) {
    throw new Error("Collection cannot be null or undefined");
  }

  return collection.map((card) => card.id);
};

export default getCollectionIds;
