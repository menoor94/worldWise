import { Outlet } from "react-router-dom";
import AppNav from "./Navigations/AppNav";
import Logo from "../assets/Logo";

import styles from "./Sidebar.module.css";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by world Wise company
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
