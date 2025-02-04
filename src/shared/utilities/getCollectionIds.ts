import * as Scry from "scryfall-sdk";

const getCollectionIds = (collection: Scry.Card[]) => {
  return collection.map((card) => card.id);
};

export default getCollectionIds;
