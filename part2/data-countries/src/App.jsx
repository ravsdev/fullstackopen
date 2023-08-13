import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";
import SearchForm from "./components/SearchForm";
import Results from "./components/Results";
import countryService from "./services/country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCountries, setFilterCountries] = useState([]);

  useEffect(() => {
    /* axios
      .get(
        "https://restcountries.com/v3.1/all?fields="
      )
      .then((response) => {
        //console.log(response.data)
        setCountries(response.data);
      });*/
    countryService
      .get("name,cca2,capital,flags,population,languages")
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    const found = countries.filter(({ name }) =>
      name.common.toLowerCase().includes(search.toLowerCase())
    );
    setFilterCountries(found);
  }, [search]);

  const handleFindCountries = (event) => {
    setSearch(event.target.value);
  };

  const clickCountry = (name) => {
    //console.log(name)
    setSearch(name);
  };

  return (
    <div>
      <SearchForm search={search} handleFindCountries={handleFindCountries} />
      <Results
        search={search}
        filterCountries={filterCountries}
        clickCountry={clickCountry}
      />
    </div>
  );
};

export default App;
