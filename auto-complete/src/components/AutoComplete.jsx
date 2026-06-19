import { useEffect, useState } from "react";
import SuggestionsList from "./SuggestionsList";

export default function AutoComplete({
  staticData,
  fetchData,
  dataKey,
  onChange = () => {},
  placeholder,
}) {
  const [inputData, setInputData] = useState("");
  const [suggestionsList, setSuggestionsList] = useState([]);
  const { data, loading, error } = fetchData;

  const getSuggestionsList = async (inputData) => {
    let result = [];
    if (staticData) {
      result = staticData.filter((item) => {
        return item.toLowerCase().includes(inputData.toLowerCase());
      });
      return setSuggestionsList(result);
    } else if (fetchData) {
      result = await fetchData.data.recipes;
      return setSuggestionsList(result);
    }
    setSuggestionsList([]);
  };

  const handleInputChange = (e) => {
    setInputData(e.target.value);
    onChange(e.target.value);
  };

  const handleSuggesitionClick = (suggestionsList) => {
    setInputData(dataKey ? suggestionsList[dataKey] : dataKey);
    onSelect(suggestionsList);
    setSuggestionsList([]);
  };

  useEffect(() => {
    getSuggestionsList(inputData);
  }, [inputData, staticData]);

  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      {(suggestionsList || error || loading) && (
        <ul>
          {!suggestionsList && error && <div>{error}</div>}
          {loading && <div>Loading ...</div>}

          <SuggestionsList
            suggestions={suggestionsList}
            highlight={inputData}
            dataKey={dataKey}
            onSelect={handleSuggesitionClick}
          />
        </ul>
      )}
    </>
  );
}
