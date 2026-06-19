export default function SuggestionsList({
  suggestions,
  highlight,
  dataKey,
  onSelect = () => {},
}) {
  const getHighLightText = (text) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    console.log(parts);
    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index}>{part}</b>
          ) : (
            part
          );
        })}
      </span>
    );
  };

  return (
    <>
      {suggestions &&
        suggestions.map((suggestion, index) => {
          const currSuggestion = dataKey ? suggestion[dataKey] : suggestion;
          {
            getHighLightText(currSuggestion);
          }
          return <li key={index}>{getHighLightText(currSuggestion)}</li>;
        })}
    </>
  );
}
