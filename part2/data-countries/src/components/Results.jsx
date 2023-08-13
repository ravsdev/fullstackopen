import Country from "./Country";

const Results = ({ search, filterCountries, clickCountry }) => {
  if (search === "" || filterCountries.length === 0)
    return <p>Nothing to show</p>;

  if (filterCountries.length === 1)
    return <Country data={filterCountries[0]} />;

  if (filterCountries.length > 10) return <p>Too many matches</p>;

  return filterCountries.map(({ name }, id) => (
    <li key={id}>
      {name.common}{" "}
      <button
        onClick={() => {
          clickCountry(name.common);
        }}
      >
        show
      </button>
    </li>
  ));
};

export default Results;
