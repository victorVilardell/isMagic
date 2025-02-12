import * as Scry from "scryfall-sdk";

interface GetCardsBySetResponse {
  cards: Scry.Card[];
}

interface ScryfallClient {
  Cards: {
    search(
      query: string,
      options?: {
        page: number;
      }
    ): Promise<Scry.Card[]>;
  };
}

class GetCardsBySet {
  constructor(private readonly client: any) {
    if (!client) {
      throw new Error("Scryfall client is required");
    }
  }

  public async execute(
    setCode: string,
    page: number = 1
  ): Promise<GetCardsBySetResponse> {
    if (!setCode || typeof setCode !== "string") {
      throw new Error("Valid set code is required");
    }

    if (page < 1) {
      throw new Error("Page must be greater than 0");
    }

    try {
      const query = `set:${setCode}`;
      const response = await this.client.Cards.search(query, {
        page,
      }).waitForAll();

      return {
        cards: response,
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch cards: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}

export const createGetCardsBySet = (client = Scry): GetCardsBySet => {
  return new GetCardsBySet(client);
};

export default createGetCardsBySet;
