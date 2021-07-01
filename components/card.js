import styles from '../styles/Home.module.css'
import { Grid, Card, Typography, CardContent, Chip} from '@material-ui/core';
import Image from 'next/image';

const COLOR  = ['red', 'yellow', 'green', 'black', 'orange', 'purple']
const rand_BG = () => {
    let rand = Math.floor(Math.random()*5)
    return COLOR[rand]
}
// Job Card, it will get the details of each job from props and will render the data as required
const JobCard = ({ JobDetails }) => {
    let { jobId, companyLogo, companyName, shortDesc, jobTitle, OBJurl, skillsets, companyInitial, showNewJobBedge } = JobDetails;

    return <Grid key={jobId} item xs={12} md={12} lg={6} xl={4}>
        <Card className={styles.card} spacing={2}>
            {showNewJobBedge && <div className={styles.badge} >NEW</div>}
            <Grid container >
                <Grid item xs={12} md={4} className={styles.img_container}>
                    {companyLogo ? <Image
                        className={styles.cover}
                        src={companyLogo}
                        layout="fill"
                    /> : <span style={{ fontSize: 88, padding: '5px 25px', color: 'white', margin: '0 auto', background: rand_BG() }}>{companyInitial}</span>}
                </Grid>
                <Grid item xs={12} md={8} style={{ paddingTop: 0, minHeight: 160, maxHeight: 160 }}>
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
                                    return <Chip style={{ marginTop: 5, marginLeft: 5, fontSize: 10, color: 'gray' }} label={skill} />
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

                        <a href={OBJurl} target="_blank" rel="noreferrer"  className={styles.button} >Apply Now</a>
                    </div>
                </Grid>
            </Grid>
        </Card>
    </Grid>
}

export default JobCard;