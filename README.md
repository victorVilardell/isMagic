# Collection Management Project

This project is a web application for managing card collections. It allows users to create, rename, delete, and view collections of cards, as well as add and remove cards from collections.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static types.
- **IndexedDB**: A low-level API for client-side storage of significant amounts of structured data.
- **Jest**: A testing framework for JavaScript.
- **React Testing Library**: A library for testing React components.

## Folder Structure

The project folder structure is as follows:

victorVilardell
reescribe en ingles el README.md Explicando la tecnologia del proyecto , las librerias utilizadas, la estructura de carpetas y como inicial el proyecto

GitHub Copilot
Sure, here is the README.md rewritten in English:

## Folder Structure

victor-vilardell ├── src/ │ ├── App.tsx │ ├── components/ │ │ ├── album/ │ │ │ ├── Album.tsx │ │ │ ├── Album.scss │ │ ├── headerCollection/ │ │ │ ├── Collections.tsx │ │ │ ├── Collections.scss │ │ ├── navSets/ │ │ │ ├── NavSets.tsx │ │ │ ├── NavSets.scss │ ├── context/ │ │ ├── CollectionsContext.tsx │ ├── services/ │ │ ├── cards/ │ │ │ ├── getCardsBySet.ts │ │ ├── database/ │ │ │ ├── databaseService.ts │ │ │ ├── indexedDB.ts │ │ ├── sets/ │ │ │ ├── types/ │ │ │ │ ├── setsType.ts │ ├── shared/ │ │ ├── utilities/ │ │ │ ├── getCollectionIds.ts │ ├── App.scss │ ├── index.tsx ├── tests/ │ ├── databaseService.test.ts │ ├── App.test.tsx ├── .nvmrc ├── jest.config.js ├── package.json └── README.md

## Functionality

- **Create Collection**: Allows the user to create a new card collection.
- **Rename Collection**: Allows the user to rename an existing collection.
- **Delete Collection**: Allows the user to delete an existing collection.
- **View Collection**: Allows the user to view all cards in a collection.
- **Add Card**: Allows the user to add a card to a collection.
- **Remove Card**: Allows the user to remove a card from a collection.

## How It Works

1. **App.tsx**: The main component of the application. Manages the state of collections and cards, and renders the main components.
2. **CollectionsContext.tsx**: Provides a context for managing the state of collections and selected cards.
3. **databaseService.ts**: Provides functions to interact with IndexedDB, including creating, renaming, deleting, and retrieving collections and cards.
4. **indexedDB.ts**: Handles direct interaction with IndexedDB.
5. **getCardsBySet.ts**: Provides functions to get cards by set from an external API.
6. **getCollectionIds.ts**: Utility to get the IDs of cards in a collection.

## How to Start the Project

### Prerequisites

- **Node.js**: Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. Install the dependencies:

Running the Project
To start the application in development mode, run:

This will start the application at http://localhost:3000.

Running Tests
To run the tests, use the following command:

This will run the tests using Jest and React Testing Library.
