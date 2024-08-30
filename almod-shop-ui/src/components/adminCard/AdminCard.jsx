import React, { useState } from 'react';
import styles from './adminCard.module.css';
import ApiService from '../../services/api.service';
import { Modal, Box } from '@mui/material';
import JoditEditor from 'jodit-react';

const AdminCard = (props) => {

    const [open, setOpen] = useState(false)
    const { id, title, type, size, category, price, discount, images, desc, rating } = props;
    const [productForm, setProductForm] = useState({
        title: title,
        type: type,
        size: size,
        category: category,
        price: price,
        discount: discount,
        images: images,
        desc: desc,
        rating: rating
    });



    const handleDelete = async () => {
        let status = window.confirm('Are you sure you want to delete this item?');
        console.log(status);

        if (status) {
            const data = await ApiService("post", '/deleteProduct', { id: id })

        } else {
            // Cancel deletion
            console.log('Deletion canceled');
        }
    };

    const handleProductChange = (e) => {
        if (e.target.name === "images") {
            setProductForm({
                ...productForm,
                [e.target.name]: [e.target.value]
            })
        } else {
            setProductForm({
                ...productForm,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleProductDesc = (val) => {
        setProductForm({
            ...productForm,
            "desc": val
        })
    }

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', productForm);
        const res = await ApiService('post', '/product/addProduct', productForm)
        console.log(res);

        setProductForm({ title: '', type: '', size: '', category: '', price: '', discount: '', images: [], desc: '', rating: '' })
    }



    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img src={images[0]} alt={title} className={styles.image} />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.type}>{type} - {size}</p>
                <p className={styles.category}>{category}</p>
                <div className={styles.desc} dangerouslySetInnerHTML={{ __html: desc }}></div>
                <div className={styles.priceContainer}>
                    <span className={styles.price}>${price}</span>
                    {discount && (
                        <span className={styles.discount}>-{discount}%</span>
                    )}
                </div>
                <div className={styles.rating}>
                    Rating: {rating} / 5
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
                        <form className={styles.productform} onSubmit={handleProductSubmit}>
                            <div className={styles.formTitle}>
                                Product Form
                            </div>
                            <div className={styles.formgroup}>
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" name="title" value={productForm.title} onChange={handleProductChange} required />
                            </div>
                            <div className={styles.formgroup}>
                                <label htmlFor="type">Type</label>
                                <input type="text" id="type" name="type" value={productForm.type} onChange={handleProductChange} required />
                            </div>
                            <div className={styles.formgroup}>
                                <label htmlFor="size">Size</label>
                                <input type="text" id="size" name="size" value={productForm.size} onChange={handleProductChange} required />
                            </div>
                            <div className={styles.formgroup}>
                                <label htmlFor="category">Category</label>
                                <input type="text" id="category" name="category" value={productForm.category} onChange={handleProductChange} required />
                            </div>
                            <div className={styles.formgroup}>
                                <label htmlFor="price">Price</label>
                                <input type="number" id="price" name="price" value={productForm.price} onChange={handleProductChange} required />
                            </div>
                            <div className={styles.formgroup}>
                                <label htmlFor="discount">Discount</label>
                                <input type="number" id="discount" name="discount" value={productForm.discount} onChange={handleProductChange} />
                            </div>
                            <div className={styles.formgroup}>
                                <label htmlFor="images">Images</label>
                                <input type="text" id="images" name="images" value={productForm.images} onChange={handleProductChange} />
                            </div>
                            <div className={styles.formgroup}>
                                <label htmlFor="desc">Description</label>
                                <JoditEditor
                                    value={productForm.desc}
                                    onChange={handleProductDesc}
                                />
                            </div>
                            <div className={styles.formgroup}>
                                <label htmlFor="rating">Rating</label>
                                <input type="number" id="rating" name="rating" value={productForm.rating} onChange={handleProductChange} min="1" max="5" required />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default React.memo(AdminCard);
