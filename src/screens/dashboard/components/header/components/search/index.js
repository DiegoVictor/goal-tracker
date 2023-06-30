import React, { useContext, useEffect, useState } from 'react';
import { IoIosClose, IoIosSearch } from 'react-icons/io';

import Button from 'components/button';
import Input from 'components/input';
import { GoalsContext } from 'contexts/GoalsContext';

function Search() {
  const [query, setQuery] = useState('');

  const search = (
    <Button type="button" disabled>
      <IoIosSearch size={28} color="#3b3c45" />
    </Button>
  );
  const [right, setRigth] = useState(search);

  const { reList } = useContext(GoalsContext);
  useEffect(() => {
    setRigth(search);

    if (query.length > 0) {
      setRigth(
        <Button type="button" onClick={() => setQuery('')} data-testid="clear">
          <IoIosClose size={36} color="#3b3c45" />
        </Button>
      );
    }

    reList(query);
  }, [query]);

  return (
    <Input
      type="text"
      placeholder="Search"
      maxLength="255"
      value={query}
      right={right}
      onChange={(event) => setQuery(event.target.value)}
    />
  );
}

export default Search;
