import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Countries from "./components/Countries";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // skip if value is not defined
    if (value) {
      console.log("fetching country data...");
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          setCountries(response.data.filter(findCountry));
        });
    }
  }, [value]);

  const findCountry = function (country) {
    return country["name"]["common"].toLowerCase().includes(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = (childCountry) => {
    setValue(childCountry);
  };

  return (
    <div>
      <form>
        find countries: <input value={value} onChange={handleChange} />
      </form>

      {countries.length > 10 ? (
        "Too many  matches, specify another filter"
      ) : (
        <Countries countries={countries} handleClick={handleClick} />
      )}
    </div>
  );
};

export default App;
