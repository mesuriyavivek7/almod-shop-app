import React, { useEffect, useState } from 'react';
import styles from './career.module.css';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import CareerCard from '../../components/careerCard/CareerCard';
import ApiService from '../../services/api.service';

const Career = () => {
    const [jobs, setJobs] = useState([]);
    const [formData, setFormData] = useState({})


    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await ApiService('get', '/career/findCareerPost')
                setJobs(data.data)
            } catch (err) {
                console.error("An Error:-" + err)
            }
        }
        fetchJobs()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await ApiService('post', '/application/createApplication', formData);
        console.log(data);

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.workSection}>
                    Work With Us
                </div>
                <div className={styles.careerNote}>
                    <p>
                        Joining First Unified means becoming part of a dynamic team that values creativity, dedication, and collaboration. Whether you’re a production specialist, a marketing guru, or an innovative product developer, we offer a range of career paths to match your skills and passions.
                    </p>
                </div>
                <div className={styles.careerCardContainer}>
                    {jobs.map((item, index) => (
                        <div key={index}>
                            <CareerCard
                                title={item.title}
                                category={item.category}
                                description={item.description}
                                requirement={item.requirement}
                            />
                        </div>
                    ))}
                </div>
                <div className={styles.formContainer}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.applyTitle}>
                            Apply Now
                            <div className={styles.applyTitleUnderline}></div>
                        </div>
                        <div className={styles.inputGroup}>
                            <input name='firstName' onChange={handleChange} type="text" placeholder="First Name" className={styles.input} required />
                            <input name='lastName' onChange={handleChange} type="text" placeholder="Last Name" className={styles.input} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <input name='email' onChange={handleChange} type="email" placeholder="Email ID" className={styles.input} required />
                            <input name='phnNumber' onChange={handleChange} type="tel" placeholder="Phone Number" className={styles.input} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <input name='cvLink' onChange={handleChange} type="text" placeholder='Link Your CV' className={styles.inputFile} />
                            <select name='role' onChange={handleChange} className={styles.select} required>
                                <option value="">Select</option>
                                {jobs.map((item, index) => (
                                    <option className={styles.sansFont} key={index} value={item.title}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <textarea name='msg' onChange={handleChange} placeholder="Message" className={styles.textarea}></textarea>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button type="submit" className={styles.submitButton}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Career;
