import Input from '../../../../components/input';

function Search() {
  const [query, setQuery] = useState('');
  return (
    <Input
      type="text"
      placeholder="Search"
      maxlength="255"
      value={query}
      onChange={(event) => setQuery(event.target.value)}
    />
  );
}

export default Search;
