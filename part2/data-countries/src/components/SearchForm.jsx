const SearchForm = ({search,handleFindCountries}) => {
  return (
    <div>
      <label>find countries: </label>
      <input value={search} onChange={handleFindCountries} />
    </div>
  );
};

export default SearchForm;
