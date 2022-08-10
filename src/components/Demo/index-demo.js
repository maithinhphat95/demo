import { useEffect, useReducer, useState, useMemo, useCallback } from "react";

// demo constants API statuses
const SUCCESS_FETCH = "SUCCESS_FETCH";
const FAILED_FETCH = "FAILED_FETCH";
const BEFORE_FETCH = "BEFORE_FETCH";
const REMOVE_ITEM = "REMOVE_ITEM";

// Server will return data
const initialData = [
  {
    bookName: "React",
    author: "Daniel",
    url: "https://reactjs.org/docs/react-api.html",
    objectId: 0,
  },
  {
    bookName: "CSS",
    author: "Shell",
    url: "https://reactjs.org/docs/css.html",
    objectId: 1,
  },
  {
    bookName: "JavaScript",
    author: "Alibaba",
    url: "https://reactjs.org/docs/javascript.html",
    objectId: 2,
  },
  {
    bookName: "Redux",
    author: "Tester",
    url: "https://reactjs.org/docs/redux.html",
    objectId: 3,
  },
];

// fake API
const callAsyncData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({ data: initialData });
    }, 2000);
  });
};

const booksReducer = (state, action) => {
  switch (action.type) {
    case SUCCESS_FETCH:
      return {
        ...state,
        isLoading: false,
        isErrorApi: false,
        data: action.payload,
      };

    case FAILED_FETCH:
      return {
        ...state,
        isErrorApi: true,
        isLoading: false,
        errorMsg: action.errorMsg,
      };

    case BEFORE_FETCH:
      return {
        ...state,
        isLoading: true,
      };

    case REMOVE_ITEM:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };

    default:
      break;
  }
};
// Item Components
const List = ({ listData, handleRemove }) => {
  return (
    <>
      {listData.length > 0 &&
        listData.map(({ bookName, url, author, objectId }, idx) => (
          <div key={idx}>
            <span>{bookName}</span>
            <a href={url}>{url}</a>
            <span>{author}</span>
            <button type="button" onClick={() => handleRemove(objectId)}>
              Remove
            </button>
          </div>
        ))}
    </>
  );
};

// Compose Component
const SearchBox = ({ searchTerm, onSearch, msg, inputType, children }) => {
  return (
    <div>
      <label>{children}</label>
      <input
        type={inputType}
        value={searchTerm}
        placeholder={msg}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

const App = () => {
  // hooks
  const [url, setUrl] = useState(
    "http://localhost:8080/api/v1/books?bookName=abc&limit=10"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [books, dispatchBooks] = useReducer(booksReducer, {
    isLoading: true,
    isErrorApi: false,
    errorMsg: "",
    data: [],
  });

  const fetchData = useCallback(() => {
    // before fetch data
    dispatchBooks({
      type: BEFORE_FETCH,
    });

    callAsyncData()
      .then((result) => {
        // successful fetch data
        dispatchBooks({
          type: SUCCESS_FETCH,
          payload: result.data,
        });
      })
      .catch((error) => {
        // error fetch data
        dispatchBooks({
          type: FAILED_FETCH,
          errorMsg: error,
        });
      });
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // event handlers
  const onRemoveItem = (selectedId) => {
    // calculate data to populate into state
    const results = books.data?.filter((book) => book.objectId !== selectedId);

    dispatchBooks({
      type: REMOVE_ITEM,
      payload: results,
    });
  };

  const filteredData = useMemo(
    () =>
      books.data.filter((book) =>
        book.bookName.toLowerCase().trim().includes(searchTerm.toLowerCase())
      ),
    [books.data, searchTerm]
  );

  // render DOM
  return (
    <>
      <h1>Demo practice</h1>

      {books.isLoading && <p>Data is loading ...</p>}

      {books.isErrorApi && <p>{books.errorMsg}</p>}

      <SearchBox
        inputType="text"
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        msg="type your title for search"
      >
        Input search: &nbsp;
      </SearchBox>

      <List listData={filteredData} handleRemove={onRemoveItem} />
    </>
  );
};

export default App;
