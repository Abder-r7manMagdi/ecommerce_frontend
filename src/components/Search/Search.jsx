//src\components\Search\Search.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchData } from "./dataFetcher";

const SearchResults = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("query");
    setQuery(searchQuery);

    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await fetchData();
        // Filter data based on search query
        const filteredResults = data.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResults(filteredResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchResults();
    }
  }, [location.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map((result) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
