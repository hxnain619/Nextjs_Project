import styles from '../styles/Home.module.css'
import { Grid, Card, Typography, CardContent, Chip} from '@material-ui/core';
import Image from 'next/image';

// Job Card, it will get the details of each job from props and will render the data as required
const JobCard = ({ JobDetails }) => {
    let { jobId, companyLogo, companyName, shortDesc, jobTitle, jobDLPUrl, skillsets, companyInitial, showNewJobBedge } = JobDetails;

    return <Grid key={jobId} item xs={12} md={12} lg={6} xl={4}>
        <Card className={styles.card} spacing={2}>
            {showNewJobBedge && <div className={styles.badge} >NEW</div>}
            <Grid container >
                <Grid item xs={12} md={4} className={styles.img_container}>
                    {companyLogo ? <Image
                        className={styles.cover}
                        src={companyLogo}
                        layout="fill"
                    /> : <span style={{ fontSize: 88, padding: 10, color: '#2c2c2c', margin: '0 auto' }}>{companyInitial}</span>}
                </Grid>
                <Grid item xs={12} md={8} style={{ paddingTop: 0, minHeight: 160 }}>
                    <CardContent className={styles.content}>
                        <Typography >
                            {companyName}
                        </Typography>
                        <Typography color={"textSecondary"}>
                            {jobTitle}
                        </Typography>
                        <div >
                            {skillsets.map((skill, i) => {
                                if (i < 3) {
                                    return <Chip style={{ marginTop: 5, marginLeft: 5, fontSize: 12 }} color="secondary" label={skill} />
                                }
                            })}
                        </div>
                    </CardContent>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} >
                    <div className={styles.desc}>
                        {shortDesc}
                    </div>
                    <div style={{ textAlign: 'right', lineHeight: 2 }}>

                        <a href={`http://${jobDLPUrl}`} target="_blank" rel="noreferrer"  className={styles.button} >Apply Now</a>
                    </div>
                </Grid>
            </Grid>
        </Card>
    </Grid>
}

export default JobCard;