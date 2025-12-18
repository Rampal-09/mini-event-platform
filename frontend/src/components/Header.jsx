import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          Signup
        </Link>
        <Link to="/login" className={styles.link}>
          Login
        </Link>
        <Link to="/create-event" className={styles.link}>
          Create Event
        </Link>
        <Link to="/events" className={styles.link}>
          Event List
        </Link>
      </nav>
    </header>
  );
}

export default Header;
