import React, { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

import Button from '../../../../components/button';
import Input from '../../../../components/input';

function Search() {
  const [query, setQuery] = useState('');

  const search = (
    <Button type="button" disabled>
      <IoIosSearch size={28} color="#3b3c45" />
    </Button>
  );
  const [right, setRigth] = useState(search);
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
