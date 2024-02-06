import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { signInWithEthereum, connectWallet } from '../utils/siweAuth';

// Define the SignIn component
export default function SignIn() {
  const history = useHistory();

  // Define the handleLogin function for signing in with Ethereum and navigating to the profile page
  const handleLogin = async () => {
    connectWallet();
    if (await signInWithEthereum()) {
      history.push('/profile');
    }
  };

  // Render the SignIn component
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogin}
        >
          Sign in with Ethereum
        </Button>
      </Box>
    </Container>
  );
}