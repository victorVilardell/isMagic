import * as Scry from "scryfall-sdk";

class GetCardsBySet {
  constructor(private readonly client: typeof Scry) {}

  public async execute(setCode: string, page?: number): Promise<Scry.Card[]> {
    const cards = await this.client.Cards.search(`set:${setCode}`).waitForAll();

    return cards;
  }
}

const getCardsBySet = () => {
  return new GetCardsBySet(Scry);
};

export default getCardsBySet;
