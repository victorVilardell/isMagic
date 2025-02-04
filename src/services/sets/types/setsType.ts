export type Integer = number;
export type Decimal = number;
export type Uuid = string;
export type Uri = string;
export type IsoDate = string;

export enum SetType {
  Core = "core",
  Expansion = "expansion",
  Masters = "masters",
  Alchemy = "alchemy",
  Masterpiece = "masterpiece",
  Arsenal = "arsenal",
  FromTheVault = "from_the_vault",
  Spellbook = "spellbook",
  PremiumDeck = "premium_deck",
  DuelDeck = "duel_deck",
  DraftInnovation = "draft_innovation",
  TreasureChest = "treasure_chest",
  Commander = "commander",
  Planechase = "planechase",
  Archenemy = "archenemy",
  Vanguard = "vanguard",
  Funny = "funny",
  Starter = "starter",
  Box = "box",
  Promo = "promo",
  Token = "token",
  Memorabilia = "memorabilia",
  Minigame = "minigame",
}

export type SetTypeLike = SetType | `${SetType}`;

export type Set = {
  id: Uuid;
  code: string;
  mtgo_code?: string;
  arena_code?: string;
  tcgplayer_id?: Integer;
  name: string;
  set_type: SetTypeLike;
  released_at?: IsoDate;
  block_code?: string;
  block?: string;
  parent_set_code?: string;
  card_count: Integer;
  printed_size?: Integer;
  digital: boolean;
  foil_only: boolean;
  nonfoil_only: boolean;
  scryfall_uri: Uri;
  uri: Uri;
  icon_svg_uri: Uri;
  search_uri: Uri;
};
