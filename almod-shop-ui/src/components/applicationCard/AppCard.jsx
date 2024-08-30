import React from 'react'
import styles from './appCard.module.css'
import ApiService from '../../services/api.service';

const AppCard = (props) => {
    const { id, firstName, lastName, email, phnNumber, cvLink, role, msg } = props;

    const handleDelete = async () => {
        let status = window.confirm('Are you sure you want to delete this?');
        console.log(status);

        if (status) {
            const data = await ApiService("post", '/application/deleteApplication', { id: id })
            window.location.reload()
        } else {
            // Cancel deletion
            console.log('Deletion canceled');
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.dataDisplay}>
                {firstName + " " + lastName}
            </div>
            <div className={styles.dataDisplay}>
                {phnNumber}
            </div>
            <div className={styles.dataDisplay}>
                {email}
            </div>
            <div className={styles.dataDisplay}>
                {role}
            </div>
            <div className={styles.dataDisplay}>
                {cvLink}
            </div>
            <div className={styles.dataDisplay}>
                {msg}
            </div>
            <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => handleDelete()}
            >
                Delete
            </button>
        </div>
    )
}

export default AppCard