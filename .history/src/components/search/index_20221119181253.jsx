import React from 'react';
import debounce from "lodash.debounce";
import { SearchContext } from '../../App';
import styles from "./Search.module.scss";

const Search = () => {
  const [value, setValue] = React.useState();
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  }

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 3000),
    [],
  );

  const onChangeInput = (event) => {
    setSearchValue(event.target.value);
    updateSearchValue(event.target.value);
  }

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={styles.search}>
      <input 
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        type="text" 
        placeholder="Поиск пиццы..." 
      />
      {value && 
        <svg
          onClick={onClickClear()}
          className={styles.clear}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.99931 8.97428L13.0242 14L14 13.0257L8.9737 8L14 2.97565L13.0256 2L7.99931 7.02572L2.97439 2L2 2.97565L7.02492 8L2 13.0243L2.97439 14L7.99931 8.97428Z"
            fill="#505050"
          />
        </svg>
      }
    </div>
  )
}

export default Search;
