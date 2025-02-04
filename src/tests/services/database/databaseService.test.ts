import {
  toggleCard,
  getAllCards,
  createCollection,
  deleteCollection,
  renameCollection,
  getAllCollections,
} from "../../../services/database/databaseService";
import {
  addData,
  getData,
  removeData,
  getAllData,
  createStore,
  deleteStore,
  getAllStores,
} from "../../../services/database/indexedDB";

jest.mock("../../../services/database/indexedDB", () => ({
  addData: jest.fn(),
  getData: jest.fn(),
  removeData: jest.fn(),
  getAllData: jest.fn(),
  createStore: jest.fn(),
  deleteStore: jest.fn(),
  getAllStores: jest.fn(),
}));

describe("databaseService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("toggleCard", () => {
    it("should add a card if it does not exist", async () => {
      (getData as jest.Mock).mockResolvedValue(null);
      await toggleCard("testCollection", { id: 1, name: "Test Card" });
      expect(addData).toHaveBeenCalledWith("testCollection", {
        id: 1,
        name: "Test Card",
      });
    });

    it("should remove a card if it exists", async () => {
      (getData as jest.Mock).mockResolvedValue({ id: 1, name: "Test Card" });
      await toggleCard("testCollection", { id: 1, name: "Test Card" });
      expect(removeData).toHaveBeenCalledWith("testCollection", 1);
    });

    it("should throw an error if toggling card fails", async () => {
      (getData as jest.Mock).mockRejectedValue(new Error("DB error"));
      await expect(
        toggleCard("testCollection", { id: 1, name: "Test Card" })
      ).rejects.toThrow("It was not possible to toggle the card.");
    });
  });

  describe("getAllCards", () => {
    it("should throw an error if getting all cards fails", async () => {
      (getAllData as jest.Mock).mockRejectedValue(new Error("DB error"));
      await expect(getAllCards("testCollection")).rejects.toThrow(
        "It was not possible to retrieve all cards."
      );
    });
  });

  describe("createCollection", () => {
    it("should throw an error if creating collection fails", async () => {
      (createStore as jest.Mock).mockRejectedValue(new Error("DB error"));
      await expect(createCollection("newCollection")).rejects.toThrow(
        "It was not possible to create the collection."
      );
    });
  });

  describe("deleteCollection", () => {
    it("should throw an error if deleting collection fails", async () => {
      (deleteStore as jest.Mock).mockRejectedValue(new Error("DB error"));
      await expect(deleteCollection("testCollection")).rejects.toThrow(
        "It was not possible to delete the collection."
      );
    });
  });

  describe("renameCollection", () => {
    it("should rename a collection", async () => {
      const mockData = [{ id: 1, name: "Test Card" }];
      (getAllData as jest.Mock).mockResolvedValue(mockData);
      await renameCollection("newCollection", "oldCollection");
      expect(createStore).toHaveBeenCalledWith("newCollection");
      expect(addData).toHaveBeenCalledWith("newCollection", mockData[0]);
      expect(deleteStore).toHaveBeenCalledWith("oldCollection");
    });

    it("should throw an error if newNameCollection or oldNameCollection is not provided", async () => {
      await expect(renameCollection("", "oldCollection")).rejects.toThrow(
        "Both new and old collection names must be provided."
      );
      await expect(renameCollection("newCollection", "")).rejects.toThrow(
        "Both new and old collection names must be provided."
      );
    });

    it("should throw an error if renaming collection fails", async () => {
      (getAllData as jest.Mock).mockRejectedValue(new Error("DB error"));
      await expect(
        renameCollection("newCollection", "oldCollection")
      ).rejects.toThrow("It was not possible to rename the collection.");
    });
  });

  describe("getAllCollections", () => {
    it("should throw an error if getting all collections fails", async () => {
      (getAllStores as jest.Mock).mockRejectedValue(new Error("DB error"));
      await expect(getAllCollections()).rejects.toThrow(
        "It was not possible to retrieve all collections."
      );
    });
  });
});
