import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { ToastProvider } from "./context/ToastContext";
import { SetCardsProvider } from "./context/SetCardsContext";
import { CollectionsProvider } from "./context/CollectionsContext";
import MainContent from "./components/mainContent";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToastProvider>
      <SetCardsProvider>
        <CollectionsProvider>
          <MainContent />
        </CollectionsProvider>
      </SetCardsProvider>
    </ToastProvider>
  </React.StrictMode>
);
