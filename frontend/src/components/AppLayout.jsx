import PageFotter from "./PageFotter";
import PageHeader from "./PageHeader";
import styles from "./AppLayout.module.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import InventoryPage from "../pages/InventoryPage";
import DashBoardPage from "../pages/DashBoardPage";
import UsersPage from "../pages/UsersPage";
import Modal from "./Modal";

function AppLayout() {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <PageHeader />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="dashBoard" element={<DashBoardPage />} />
          <Route path="users" element={<UsersPage />} />
        </Routes>

        {/* {Children} */}
      </div>
      <div className={styles.fotter}>
        <PageFotter />
      </div>
    </div>
  );
}

export default AppLayout;
