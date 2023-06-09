import { Button, Grid } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithRedirect } from 'firebase/auth';
import { provider, auth } from '../firebase';
const Login = ({ type, color}) => {
    const loginwithme = () => {
        signInWithRedirect(auth, provider)
    }
    return(
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight:'100vh' }}>

                <Button variant='contained' startIcon={<GoogleIcon />}
                onClick={loginwithme}
                >Sign in with Google</Button>
        </Grid>
    )
}

export default Login