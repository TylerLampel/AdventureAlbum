import AdventureCard from "./AdventureCard";

function AdventureList({ adventures }) {
  const renderedAdventures = adventures.map((adventure, index) => (
    <div key={index}>
      <AdventureCard adventure={adventure} />
    </div>
  ));

  return <div>{renderedAdventures}</div>;
}

export default AdventureList;
