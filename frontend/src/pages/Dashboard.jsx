import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import RecommendedList from "../components/RecommendedList";

// Define our styles at the very top of the file to prevent the initialization error!
const styles = {
  dashboardContainer: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  sidebar: {
    width: "260px",
    backgroundColor: "#592F3E",
    color: "#f5eff1",
    display: "flex",
    flexDirection: "column",
    padding: "25px 30px",
    boxShadow: "4px 0 10px rgba(0, 0, 0, 0.05)",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "40px",
  },
  logoIcon: {
    fontSize: "24px",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: "800",
    letterSpacing: "0.5px",
    color: "#dfe8e2",
  },
  navMenu: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flexGrow: 1,
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#eff1f5",
    textDecoration: "none",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
  },
  navLinkActive: {
    backgroundColor: "#471025",
    color: "#aaaabe",
  },
  sidebarFooter: {
    borderTop: "1px solid #374151",
    paddingTop: "15px",
    textAlign: "center",
  },
  mainContent: {
    flexGrow: 1,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "35px",
    overflowX: "hidden",
  },
  topHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
  },
  headerTitleArea: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#111827",
    margin: 0,
  },
  pageSubtitle: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
  },
  searchContainerWrapper: {
    minWidth: "380px",
  },
  recommendationSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1f2937",
    margin: 0,
  },
};

function Dashboard({ setRecommendations, recommendations }) {
  return (
    <div style={styles.dashboardContainer}>
      {/* Modern Sidebar Navigation */}
      <aside style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <span style={styles.logoIcon}>📚</span>
          <span style={styles.logoText}>PustakSathi</span>
        </div>
        <nav style={styles.navMenu}>
          <Link
            to="/dashboard"
            style={{ ...styles.navLink, ...styles.navLinkActive }}
          >
            <span>🏠</span> Recommendation Desk
          </Link>
          <Link to="/readbooks" style={styles.navLink}>
            <span>📖</span> Read Books
          </Link>
          <Link to="/wishlist" style={styles.navLink}>
            <span>❤️</span> Wishlist
          </Link>
          <Link to="/manage/backend" style={styles.navLink}>
            <span>⚙️</span> Control Panel
          </Link>
        </nav>
        <div style={styles.sidebarFooter}>
          <p style={{ margin: 0, fontSize: "11px", color: "#9ca3af" }}>
            v1.0.0 Stable
          </p>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main style={styles.mainContent}>
        {/* Top Bar / Search Action Container */}
        <header style={styles.topHeader}>
          <div style={styles.headerTitleArea}>
            <h1 style={styles.pageTitle}>Personalized Book Desk</h1>
            <p style={styles.pageSubtitle}>
              Discover books tailored to your taste. Use the Search bar to Find.
            </p>
          </div>

          {/* Render your functional search logic wrapper with the new styling context */}
          <div style={styles.searchContainerWrapper}>
            <SearchBar setRecommendations={setRecommendations} />
          </div>
        </header>

        {/* Recommendations Area */}
        <section style={styles.recommendationSection}>
          <h2 style={styles.sectionTitle}>Recommendations For You</h2>

          {/* Render your functional list which fetches covers & matches titles */}
          <RecommendedList
            recommendations={recommendations}
            setRecommendations={setRecommendations}
          />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
