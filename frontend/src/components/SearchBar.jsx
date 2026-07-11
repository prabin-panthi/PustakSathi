import { useEffect, useState } from "react";
import api from "../api";

// Styles grouped at the very top to guarantee initialization safety
const searchStyles = {
  searchContainer: {
    position: "relative", 
    width: "100%",
    maxWidth: "450px",
  },
  searchForm: {
    display: "flex",
    backgroundColor: "#ffffff",
    padding: "6px",
    borderRadius: "30px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e5e7eb",
    alignItems: "center",
  },
  searchInput: {
    flexGrow: 1,
    border: "none",
    outline: "none",
    padding: "0 16px",
    fontSize: "14px",
    borderRadius: "30px",
    backgroundColor: "transparent",
  },
  searchButton: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    padding: "10px 22px",
    borderRadius: "24px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  dropdownContainer: {
    position: "absolute",
    top: "110%", // Sits cleanly just beneath the input bar
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
    maxHeight: "250px",
    overflowY: "auto",
    zIndex: 999, // Floating safely above recommendations
    padding: "6px 0",
  },
  suggestionItem: {
    padding: "10px 16px",
    fontSize: "14px",
    color: "#374151",
    cursor: "pointer",
    transition: "background-color 0.15s ease",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

function SearchBar({ setRecommendations }) {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleChange = (e) => {
    setShowSuggestions(true);
    setSearch(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim() === "") {
        setBooks([]);
        return;
      }

      api
        .get(`/api/books/search/?q=${encodeURIComponent(search)}`)
        .then((res) => {
          setBooks(res.data);
        });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const handleSearchClick = async (e) => {
    e.preventDefault();
    const res = await api.get(
      `/api/books/recommend/?q=${encodeURIComponent(search)}`,
    );
    if (typeof setRecommendations === "function") {
      setRecommendations(res.data.Recommendations);
    }
  };

  const handleBookClick = async (title) => {
    setShowSuggestions(false);
    setSearch(title);
    const res = await api.get(
      `/api/books/recommend/?q=${encodeURIComponent(title)}`,
    );
    if (typeof setRecommendations === "function") {
      setRecommendations(res.data.Recommendations);
    }
  };

  return (
    <div style={searchStyles.searchContainer}>
      {/* The Integrated Main Input Box */}
      <div style={searchStyles.searchForm}>
        <input
          type="text"
          placeholder="Search catalog or genres..."
          value={search}
          onChange={handleChange}
          style={searchStyles.searchInput}
        />
        <button
          onClick={handleSearchClick}
          style={searchStyles.searchButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
        >
          Search
        </button>
      </div>

      {/* The Floating Dropdown Suggestions Overlay */}
      {showSuggestions && books.length > 0 && (
        <div style={searchStyles.dropdownContainer}>
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => handleBookClick(book.title)}
              style={searchStyles.suggestionItem}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              {book.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
