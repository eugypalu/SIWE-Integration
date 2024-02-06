import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getInformation } from '../utils/siweAuth';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { REACT_APP_BACKEND_HOST, REACT_APP_BACKEND_PORT } from '../config';

export default function CreateProfile() {
  const history = useHistory();
  // Define state variables for the user's username, bio, and address
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');

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
          setUsername(username);
          setBio(bio);
        })
        .catch(error => console.error('Error:', error));
    };

    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Send a PUT request to the backend to update the user's profile
    try {
      const response = await fetch(`${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/user/updateprofile/${address}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: data.get('username'), userBio: data.get('bio') })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
    // Redirect to the profile page after updating the profile
    history.push('/profile');
  };

  // Render the CreateProfile component
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
        <Button
          sx={{ position: 'absolute', left: 0, top: 0 }}
          onClick={() => history.goBack()}
        >
          <ArrowBackIcon />
        </Button>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AccountBoxIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update your profile
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                value={username}
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="bio"
                label="Bio"
                value={bio}
                multiline
                rows={4}
                name="bio"
                onChange={(e) => setBio(e.target.value)}
                inputProps={{ maxLength: 200 }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
}