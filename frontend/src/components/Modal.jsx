import styles from "./Modal.module.css";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <p onClick={onClose} className={styles.closeButton}>
          ❌
        </p>
        {children}
      </div>
    </div>
  );
}

export default Modal;
