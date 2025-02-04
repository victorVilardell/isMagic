import CollectionsManager from "./collectionsManager";
import "./headerCollection.scss";

const headerColection = ({ title }: { title: string }) => {
  return (
    <header className="header headerCollection">
      <h1>{title}</h1>
      <CollectionsManager />
    </header>
  );
};
export default headerColection;
