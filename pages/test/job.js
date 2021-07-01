import { Grid } from '@material-ui/core';
import styles from '../../styles/Home.module.css'
import Header from '../../components/header'
import JobCard from '../../components/card'
import Loader from '../../components/loader'
import { useState, useEffect } from 'react';

function Jobs({ jobs }) {

    const [loading, setLoader] = useState(false)
    const [search, setSearch] = useState('')
    const [job, setJob] = useState([])
    const [filter, setFilteredJobs] = useState([])
    const [day, setDay] = useState(0)

    // before rendering check whether the jobs has been fetched or not, if not then show the loader
    useEffect(() => {
        setLoader(true)
        if (jobs) {
            setLoader(false)
            setJob(jobs)
        }
    }, [jobs])

    // A function to detech the filter type and filter the jobs accordingly
    const Filter = (e, type) => {
        let val = (e.currentTarget.value).toLowerCase()
        if (type == 'name' && day == 0) {
            setSearch(val)
            let filtered = job.filter((data) => {
                if (((data.companyName).toLowerCase()).includes(val)) {
                    return data
                }
            })
            setFilteredJobs(filtered)
        } else if (type == 'day' && search == '') {
            setDay(val)
            let filtered = job.filter((data) => {
                let current = new Date();
                let jobDate = new Date(data.OBJpostingDate)
                const diffTime = Math.abs(jobDate - current);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays <= 7) {
                    return data
                }
            })
            setFilteredJobs(filtered)
        }

    }
    // A function to render the filter search elements
    const FilterElements = () => {
        return (<Grid container justify="center" style={{ marginBottom: 10 }}>
            <Grid item xs={12} md={5} style={{ marginRight: 10 }}>
                <select
                    value={day}
                    className={styles.input}
                    onChange={(e) => Filter(e, 'day')}
                >
                    <option value={0} >Filter By Days</option>
                    <option value={7}>Last 7 Days</option>
                </select>
            </Grid>
            <Grid item xs={12} md={5}>
                <input type="search" placeholder="Search By Company Name" className={styles.input} value={search} onChange={(e) => Filter(e, 'name')} />
            </Grid>
        </Grid>)
    }

    return (<>
        <Header />
        <div className={styles.container}>
            <h1 className={styles.main_heading}>
                <span>Developer</span>
                <span>jobs near me</span>
            </h1>
            {FilterElements()}
            {!loading ?
                <Grid container justify="center" >
                    {(search.length > 0) ? filter.length > 0 && filter.map((data, index) => {
                        // filtered data wil be rendered here
                        if (index < 11) {
                            return (<JobCard
                                key={index}
                                JobDetails={data}
                            />)
                        }
                    }) :
                        jobs.map((data, index) => {
                            // All the jobs wil be rendered here
                            if (index < 11) {
                                return (<JobCard
                                    key={index}
                                    JobDetails={data}
                                />)
                            }
                        })}
                </Grid> : <Loader />}
        </div>
    </>)
}

export async function getStaticProps() {
    const res = await fetch('https://www.zippia.com/api/jobs/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "companySkills": true,
            "dismissedListingHashes": [],
            "fetchJobDesc": true,
            "jobTitle": "Business Analyst",
            "locations": [],
            "numJobs": 20,
            "previousListingHashes": []
        })
    })
    const { jobs } = await res.json()

    return {
        props: {
            jobs,
        },
    }
}

export default Jobs