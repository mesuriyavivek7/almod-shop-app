import React, { useState } from 'react';
import styles from './adminCareerCard.module.css';
import ApiService from '../../services/api.service';
import { Modal, Box } from '@mui/material';
import JoditEditor from 'jodit-react';

const AdminCareerCard = (props) => {
    const [open, setOpen] = useState(false);
    const { id, title, category, description, requirements } = props
    const [careerForm, setCareerForm] = useState({
        title: title,
        category: category,
        description: description,
        requirements: requirements
    })



    const handleDelete = async () => {
        let status = window.confirm('Are you sure you want to delete this item?');
        console.log(status);

        if (status) {
            const data = await ApiService("post", '/career/deleteCareerPost', { id: id })
            window.location.reload()
        } else {
            // Cancel deletion
            console.log('Deletion canceled');
        }
    };

    const handleCareerChange = (e) => {
        setCareerForm({
            ...careerForm,
            [e.target.name]: e.target.value
        })
    }

    const handleCareerReq = (val) => {
        setCareerForm({
            ...careerForm,
            "requirement": val
        })
    }

    const handleCareerDesc = (val) => {
        setCareerForm({
            ...careerForm,
            "description": val
        })
    }

    const handleCareerSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', careerForm);
        careerForm["id"] = id;
        const req = await ApiService('post', '/career/editCareerPost', careerForm);
        console.log(req);

        setCareerForm({ id: '', title: '', category: '', description: '', requirement: '' })
        setOpen(false)
        window.location.reload()
    }


    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {title}
            </div>
            <div>
                <div className={styles.category}>
                    {category}
                </div>
                <div className={styles.desc}
                    dangerouslySetInnerHTML={{ __html: description }}
                >

                </div>

                <div
                    dangerouslySetInnerHTML={{ __html: requirements }}
                >
                </div>
            </div>
            <div className={styles.btnContainer}>
                <button
                    className={styles.updateBtn}
                    type='button'
                    onClick={() => setOpen(true)}
                >
                    Update
                </button>
                <button
                    className={styles.deleteBtn}
                    type="button"
                    onClick={() => handleDelete()}
                >
                    Delete
                </button>
            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    maxHeight: '80vh', // Make sure the modal does not exceed the viewport height
                    overflowY: 'auto',  // Enable scrolling
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <div
                        className={styles.productForm}
                    >
                        <form className={styles.productform} onSubmit={handleCareerSubmit}>
                            <div className={styles.formTitle}>
                                Career Form
                            </div>
                            <div className={styles.formgroup}>
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" name="title" value={careerForm.title} onChange={handleCareerChange} required />
                            </div>
                            <div className={styles.formgroup}>
                                <label htmlFor="category">Category</label>
                                <input type="text" id="category" name="category" value={careerForm.category} onChange={handleCareerChange} required />
                            </div>
                            <div className={styles.formgroup}>
                                <label htmlFor="description">Description</label>
                                <JoditEditor
                                    value={careerForm.description}
                                    onChange={handleCareerDesc}
                                />
                            </div>
                            <div className={styles.formgroup}>
                                <label htmlFor="requirements">Requirements</label>
                                <JoditEditor
                                    value={careerForm.requirements}
                                    onChange={handleCareerReq}
                                />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default React.memo(AdminCareerCard);
