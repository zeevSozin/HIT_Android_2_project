import Logo from "./Logo";
import styles from "./PageHeader.module.css";
import PageNavigation from "./PageNavigation";

function PageHeader() {
  return (
    <div className={styles.header}>
      <Logo />
      <PageNavigation />
    </div>
  );
}

export default PageHeader;
