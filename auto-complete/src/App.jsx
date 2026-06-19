import { useState } from "react";
import "./App.css";
import AutoComplete from "./components/AutoComplete";
import useFetch from "./hooks/useFetch";

function App() {
  const staticData = [
    "apple",
    "banana",
    "berrl",
    "orange",
    "grape",
    "mango",
    "melon",
    "berry",
    "peach",
    "cherry",
    "plum",
  ];

  const [inputValue, setInputValue] = useState("");

  const fetchSuggestionData = useFetch(
    `https://dummyjson.com/recipes/search?q=${inputValue}`,
  );

  return (
    <>
      <div>
        <h2>Auto Complete</h2>
        <AutoComplete
          staticData=""
          fetchData={fetchSuggestionData}
          dataKey="name"
          onSelect={(res) => console.log(res)}
          onChange={(input) => {
            setInputValue(input);
          }}
          placeholder="Enter the recipe"
        />
      </div>
    </>
  );
}

export default App;

// autocomplete - component - static data, fetch data, datakey, onchange, onselect, input
// fetch call - hook - url
// debounce - hook - text, duration
// suggestion list - component - fetch data, highlights, onselect
