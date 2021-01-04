import axios from "axios";
import React, { useState, useEffect } from "react";

const Search = () => {
  const [term, setTerm] = useState("programming");
  const [debounceTerm, setDebounceTerm] = useState(term);
  const [results, setResults] = useState([]);

  // Strategy to implement debouce
  // Part 1 Implement debounce - Anytime term changes (ie user keys in input) we will 'queue' up a change to debounceTerm.
  // Set debounceTerm state only after some time to cause one rerender that will fire useEffect() dependent on debounceTerm state.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceTerm(term);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  // Part 2 Implement debounce - Perform on initial load. Thereafter run based on dependency.
  // Fetch data immediately on initial app load and on changes to debounceTerm state thereafter.
  useEffect(() => {
    // Async/await syntax inside of useEffect()
    const search = async () => {
      // response.data
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debounceTerm, // Parameter 'srsearch' is required for Wikipedia.
        },
      });

      // Update state
      setResults(data.query.search);
    };

    if (debounceTerm) {
      search();
    }
  }, [debounceTerm]);

  // Build list
  const renderedResults = results.map((result) => {
    // Clean up snippet
    const updatedSnippet = result.snippet.replace(
      /<span class="searchmatch">|<\/span>/g,
      " "
    );

    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Go
          </a>
        </div>

        <div className="content">
          <div className="header">{result.title}</div>
          {/* <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span> */}
          {/* {result.snippet} */}
          {updatedSnippet}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            type="text"
            className="input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;

// 1 Reference only:
// // API call - This strategy works for pausing calls to the API on every key input but there is an unnecessary rerun happening after initial load.
// useEffect(() => {
//   // Async/await syntax inside of useEffect()
//   const search = async () => {
//     // response.data
//     const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
//       params: {
//         action: "query",
//         list: "search",
//         origin: "*",
//         format: "json",
//         srsearch: term, // Parameter 'srsearch' is required for Wikipedia.
//       },
//     });

//     // Update state
//     setResults(data.query.search);
//   };

//   if (term && !results.length) {
//     search();
//   } else {
//     // Set timer on every key input
//     const timeoutId = setTimeout(() => {
//       if (term) {
//         search();
//       }
//     }, 5000); // NOTE: Because search() is run 'results' state is updated which causes an unnecessary second rerun

//     // useEffect clean up
//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }
// }, [term, results.length]); // NOTE: adding dependency results.lenght will cause a rerun since results state is updated. (See version 2 for different solution)
