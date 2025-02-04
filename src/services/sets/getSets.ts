import * as Scry from "scryfall-sdk";
import { Set } from "./types/setsType";

class GetSets {
  constructor(private readonly client: typeof Scry) {}

  public async execute(): Promise<Set[]> {
    const sets = await this.client.Sets.all();

    return sets as Set[];
  }
}

const getSets = () => {
  return new GetSets(Scry);
};

export default getSets;
