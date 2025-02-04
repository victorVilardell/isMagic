const DB_NAME = "Wizard";
let dbInstance: IDBDatabase | null = null;

const getDBVersion = async (): Promise<number> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const version = db.version;
      db.close();
      resolve(version);
    };
    request.onerror = () => reject(request.error);
  });
};

const openDB = async (storeName?: string): Promise<IDBDatabase> => {
  if (dbInstance) return dbInstance;

  const currentVersion = await getDBVersion();
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, currentVersion);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (storeName && !db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = (event.target as IDBOpenDBRequest).result;
      resolve(dbInstance);
    };
    request.onerror = (event) =>
      reject((event.target as IDBOpenDBRequest).error);
  });
};

export const createStore = async (storeName: string): Promise<void> => {
  const currentVersion = await getDBVersion();
  const newVersion = currentVersion + 1;

  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, newVersion);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = (event.target as IDBOpenDBRequest).result;
      resolve();
    };

    request.onerror = () => reject(request.error);
  });
};

export const deleteStore = async (storeName: string): Promise<string[]> => {
  const currentVersion = await getDBVersion();
  const newVersion = currentVersion + 1;

  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, newVersion);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (db.objectStoreNames.contains(storeName)) {
        db.deleteObjectStore(storeName);
      }
    };

    request.onsuccess = async (event) => {
      dbInstance = (event.target as IDBOpenDBRequest).result;
      const stores = await getAllStores();
      resolve(stores);
    };

    request.onerror = () => reject(request.error);
  });
};

export const getAllStores = async (): Promise<string[]> => {
  const db = await openDB();
  return Array.from(db.objectStoreNames) as string[];
};

export const addData = async (storeName: string, data: any): Promise<void> => {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
  const db = await openDB(storeName);
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);
  store.put(data);

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

export const getData = async (storeName: string, id: number): Promise<any> => {
  const db = await openDB(storeName);
  const transaction = db.transaction(storeName, "readonly");
  const store = transaction.objectStore(storeName);
  const request = store.get(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const removeData = async (
  storeName: string,
  id: number
): Promise<void> => {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
  const db = await openDB(storeName);
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);
  store.delete(id);

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

export const getAllData = async (storeName: string): Promise<any[]> => {
  const db = await openDB(storeName);

  if (!db.objectStoreNames.contains(storeName)) {
    console.warn(`Store "${storeName}" not found. Returning empty array.`);
    return [];
  }

  const transaction = db.transaction(storeName, "readonly");
  const store = transaction.objectStore(storeName);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
