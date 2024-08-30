import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import styles from './dashboard.module.css'
import AdminCard from '../../components/adminCard/AdminCard'
import AdminCareerCard from '../../components/adminCard/AdminCareerCard'
import ApiService from '../../services/api.service'
import JoditEditor from 'jodit-react'
import AppCard from '../../components/applicationCard/AppCard'


const Dashboard = () => {
  const [productList, setProductList] = useState([]);
  const [careerList, setCareerList] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCareerForm, setShowCareerForm] = useState(false);
  const [productForm, setProductForm] = useState({ title: '', type: '', size: '', category: '', price: '', discount: '', images: [], desc: '', rating: '' });
  const [careerForm, setCareerForm] = useState({ id: '', title: '', category: '', description: '', requirement: '' });
  const [applications, setApplications] = useState([{
    firstName: "firstName",
    lastName: "lastName",
    email: "demo@email.com",
    role: "MERN developer",
    cvLink: "Link",
    msg: "msg",
    phnNumber: 9999999999
  }])
  const openProductForm = () => {
    if (showProductForm) {
      setShowProductForm(false)
    } else {
      setShowProductForm(true);
    }
  }


  const openCareerForm = () => {

    if (showCareerForm) {
      setShowCareerForm(false)
    } else {
      setShowCareerForm(true);
      setCareerForm({
        ...careerForm,
        "id": careerList.length
      })
    }
  }

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
    setCareerList([
      ...careerList,
      careerForm
    ])
    setShowCareerForm(false);
    console.log('Form Data:', careerForm);
    const req = await ApiService('post', '/career/careerCreate', careerForm);
    console.log(req);

    setCareerForm({ id: '', title: '', category: '', description: '', requirement: '' })
  }


  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setProductList([
      ...productList,
      productForm
    ])
    setShowProductForm(false);
    console.log('Form Data:', productForm);
    const res = await ApiService('post', '/product/addProduct', productForm)
    console.log(res);

    setProductForm({ title: '', type: '', size: '', category: '', price: '', discount: '', images: [], desc: '', rating: '' })
  }


  useEffect(() => {
    const fetchData = async () => {
      const data = await ApiService('get', '/product/top');
      const careers = await ApiService('get', '/career/findCareerPost')
      const application = await ApiService('get', '/application/findApplication')
      setProductList(data.data)
      setCareerList(careers.data)
      setApplications(application.data)

    }
    fetchData()

  }, [])
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div>
          <div className={styles.adminHead}>
            Welcome to Admin Section
          </div>
          <div className={styles.contentSection}>
            <div className={styles.listContainer}>
              <div className={styles.titleContainer}>
                <b>
                  Products:
                </b>
                <div>
                  <button onClick={() => openProductForm()}>Add New</button>
                </div>
              </div>
              {showProductForm &&
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
                      {/* <textarea
                        id="desc"
                        name="desc"
                        value={productForm.desc}
                        onChange={handleProductChange}
                        required
                      /> */}
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
              }
              <div className={styles.content}>
                {productList.map((item, index) => {
                  return (
                    <div key={index}>
                      <AdminCard
                        id={item._id}
                        title={item.title}
                        type={item.type}
                        size={item.size}
                        category={item.category}
                        price={item.price}
                        discount={item.discount}
                        images={item.images}
                        desc={item.desc}
                        rating={item.rating} />
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <div className={styles.titleContainer}>
                <b>
                  Careers:
                </b>
                <div>
                  <button onClick={() => openCareerForm()}>Add New</button>
                </div>
              </div>
              {showCareerForm &&
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
                      {/* <textarea
                        id="description"
                        name="description"
                        value={careerForm.description}
                        onChange={handleCareerChange}
                        required
                      /> */}
                      <JoditEditor
                        value={careerForm.description}
                        onChange={handleCareerDesc}
                      />
                    </div>
                    <div className={styles.formgroup}>
                      <label htmlFor="requirements">Requirements</label>
                      <JoditEditor
                        value={careerForm.requirement}
                        onChange={handleCareerReq}
                      />
                    </div>
                    <button type="submit">Submit</button>
                  </form>
                </div>
              }
              <div className={styles.content}>
                {careerList.map((item, index) => {
                  return (
                    <div key={index}>
                      <AdminCareerCard
                        id={item._id}
                        title={item.title}
                        category={item.category}
                        description={item.description}
                        requirements={item.requirement}

                      />
                    </div>
                  )
                })}
              </div>
              <div>
                <b>
                  Job Applications:
                </b>
                <div className={styles.content}>
                  {applications.map((item, index) => {
                    return (
                      <div key={index}>
                        <AppCard
                          id={item._id}
                          firstName={item.firstName}
                          lastName={item.lastName}
                          phnNumber={item.phnNumber}
                          email={item.email}
                          cvLink={item.cvLink}
                          msg={item.msg}
                          role={item.role}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard

