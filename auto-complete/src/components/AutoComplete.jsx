import { useEffect, useState } from "react";
import SuggestionsList from "./SuggestionsList";

export default function AutoComplete({
  staticData,
  fetchData,
  dataKey,
  onChange = () => {},
  onSelect = () => {},
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
    } else if (fetchData) {
      result = await fetchData.data.recipes;
    }
    setSuggestionsList(result);
  };

  const handleInputChange = (e) => {
    setInputData(e.target.value);
    onChange(e.target.value);
  };

  const handleSuggesitionClick = (suggestionsList) => {
    debugger;
    console.log(setSuggestionsList);
    setInputData(dataKey ? suggestionsList[dataKey] : dataKey);
    onSelect(suggestionsList);
    setSuggestionsList([]);
  };

  useEffect(() => {
    if (inputData.length >= 1) {
      getSuggestionsList(inputData);
    } else {
      setSuggestionsList([]);
    }
  }, [inputData, staticData, fetchData]);

  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        value={inputData}
      />
      {(suggestionsList || error || loading) && (
        <ul>
          {!suggestionsList && error && <div>{error}</div>}
          {loading && <div>Loading ...</div>}

          <SuggestionsList
            suggestions={suggestionsList}
            highlight={inputData}
            dataKey={dataKey}
            onSuggestionClick={handleSuggesitionClick}
          />
        </ul>
      )}
    </>
  );
}
