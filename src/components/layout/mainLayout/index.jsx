import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/index";
import Footer from "../footer";
import styles from "../mainLayout/styles.module.css";

function MainLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Header />
      {!isHomePage && <div className={styles.headerDivider} />}
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
