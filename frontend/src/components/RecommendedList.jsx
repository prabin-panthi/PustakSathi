import { useEffect } from "react";
import BookTile from "./BookTile";
import api from "../api";

function RecommendedList({ recommendations }) {
  const handleMarkAsRead = (e, book) => {
    e.preventDefault();
    api.post("/api/readbooks/", { isbn: book.isbn }).then((res) => {
      res.data;
    });
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "20px",
        }}
      >
        {/* 🛡️ Added a fallback to an empty array so it never crashes if recommendations is undefined */}
        {(recommendations || []).map((book) => {
          return (
            <BookTile
              key={book.isbn}
              book={book}
              action={
                <button
                  onClick={(e) => handleMarkAsRead(e, book)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#f3f4f6",
                    color: "#4b5563",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "600",
                    width: "100%",
                  }}
                >
                  Mark as Read
                </button>
              }
            />
          );
        })}
      </div>
    </>
  );
}

export default RecommendedList;
