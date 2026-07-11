import { useState } from "react";
import BookTile from "./BookTile";
import RatingModal from "./RatingModal";
import api from "../api";
import { useAuth } from "../context/AuthContext";

function RecommendedList({
  recommendations,
  setRecommendations,
  setwishlist,
  setreadbooks,
}) {
  const [ratingModalBook, setRatingModalBook] = useState(null);
  const { fetchUser } = useAuth();

  const handleMarkAsRead = (e, book) => {
    e.preventDefault();
    setRatingModalBook(book);
  };

  const handleWishlist = (e, book) => {
    e.preventDefault();
    api
      .post("/api/wishlist/", { isbn: book.isbn })
      .then((res) => {
        if (setwishlist) {
          setwishlist((prev) => [
            ...prev,
            {
              ...book,
              wishlist_id: res.data.id,
            },
          ]);
        }
        setRecommendations((prev) =>
          prev.map((b) =>
            b.isbn === book.isbn ? { ...b, is_wishlisted: true } : b,
          ),
        );
        fetchUser();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRatingSubmit = ({ rating, review }) => {
    api
      .post("/api/readbooks/", {
        isbn: ratingModalBook.isbn,
        rating,
        review,
      })
      .then((res) => {
        console.log(res.data);
        if (setreadbooks) {
          setreadbooks((prev) => [
            ...prev,
            {
              ...ratingModalBook,
              readbook_id: res.data.id,
              rating: res.data.rating,
              review: res.data.review,
            },
          ]);
        }
        setRecommendations((prev) =>
          prev.map((book) =>
            book.isbn === ratingModalBook.isbn
              ? { ...book, is_read: true }
              : book,
          ),
        );
        fetchUser();
      });
    setRatingModalBook(null);
  };

  // Shared button styles from your head design branch
  const buttonStyle = {
    padding: "8px 12px",
    backgroundColor: "#f3f4f6",
    color: "#4b5563",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
    width: "100%",
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
        {/* 🛡️ Fallback map layer guard protects against reading properties of undefined errors */}
        {(recommendations || []).map((book) => (
          <BookTile
            key={book.isbn}
            book={book}
            action1={
              book.is_read ? (
                <button
                  title="Mark as Read"
                  style={{
                    ...buttonStyle,
                    backgroundColor: "#e5e7eb",
                    color: "#9ca3af",
                    cursor: "not-allowed",
                  }}
                  disabled={true}
                >
                  Marked as Read
                </button>
              ) : (
                <button
                  title="Mark as Read"
                  style={buttonStyle}
                  onClick={(e) => handleMarkAsRead(e, book)}
                >
                  Mark as Read
                </button>
              )
            }
            action2={
              book.is_wishlisted ? (
                <button
                  title="Wishlist"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "red",
                  }}
                >
                  <i className="fa-solid fa-heart"></i>
                </button>
              ) : (
                <button
                  title="Wishlist"
                  style={{
                    background: "none",
                    border: "none",
                    color: "red",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => handleWishlist(e, book)}
                >
                  <i className="fa-regular fa-heart"></i>
                </button>
              )
            }
          />
        ))}
      </div>

      {ratingModalBook && (
        <RatingModal
          book={ratingModalBook}
          onSubmit={handleRatingSubmit}
          onCancel={() => setRatingModalBook(null)}
        />
      )}
    </>
  );
}

export default RecommendedList;
