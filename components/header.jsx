import { useRouter } from 'next/dist/client/router';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import styles from '../styles/Home.module.css'

const Header = () => {
    return (<AppBar position="static" className={styles.navbar}>
        <Toolbar>
            <Typography variant="h6" className={styles.title}>
                LOGO
            </Typography>
        </Toolbar>
    </AppBar>)
}
export default Header;