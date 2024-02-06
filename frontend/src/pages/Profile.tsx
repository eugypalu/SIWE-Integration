import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { logout, getInformation } from '../utils/siweAuth';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { REACT_APP_BACKEND_HOST, REACT_APP_BACKEND_PORT } from '../config';

// Define the Profile component
export default function Profile() {
  const history = useHistory();
  // Define state variables for the user's username, bio, address, and profile status
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [hasProfile, setHasProfile] = React.useState(false);

  // Use an effect to fetch the user's information when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const address = await getInformation();
      setAddress(address);

      // Fetch the user's information from the backend
      fetch(`${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/user/getuser/${address}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(user => {
          const { username, bio } = user;
          // Set hasProfile to true if the user has a username or bio in order to display the correct information
          if (username !== '' || bio !== '') setHasProfile(true);
          setUsername(username);
          setBio(bio);
        })
        .catch(error => console.error('Error:', error));
    };

    fetchData();
  }, []);

  const handleProfile = () => {
    history.push('/createprofile');
  };

  // Define the handleLogout function for logging out and navigating to the login page
  const handleLogout = async () => {
    await logout();
    history.push('/login');
  };

  // Render the Profile component
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
          <AccountBoxIcon />
        </Avatar>
        <Typography component="h6">
          Hi,{address}
        </Typography>
        {hasProfile ? (
          <>
            <Box display="flex" flexDirection="column" alignItems="center" maxWidth={{ xs: '100%', sm: '80%', md: '60%', lg: '60%', xl: '50%' }}>
              <Typography component="h6">Username: {username}</Typography>
              <Typography component="h6" sx={{ overflowWrap: 'break-word' }}>Bio: {bio}</Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleProfile}
            >
              Edit your profile
            </Button>
          </>
        ) : (
          <>
            <Typography>You haven't created a profile yet, create one</Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleProfile}
            >
              Create your profile
            </Button>
          </>
        )}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogout}
          color="error"
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
}