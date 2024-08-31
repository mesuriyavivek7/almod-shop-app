import React from 'react'
import styles from './modal.module.css'

const Modal = ({ isOpen, onClose, content, onSubmit }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <div className={styles.modalContent}>
                    {content}
                </div>
                <div className={styles.modalAction}>
                    <button
                        onClick={onSubmit}
                        className={styles.modalSubmit}
                    >
                        Submit
                    </button>
                    <button
                        onClick={onClose}
                        className={styles.modalClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal