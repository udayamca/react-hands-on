export default function SuggestionsList({
  suggestions,
  highlight,
  dataKey,
  onSuggestionClick = () => {},
}) {
  const getHighLightText = (text) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    console.log(parts);
    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index} style={{ color: "red" }}>
              {part}
            </b>
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
          return (
            <li key={index} onClick={() => onSuggestionClick(suggestion)}>
              {getHighLightText(currSuggestion)}
            </li>
          );
        })}
    </>
  );
}
