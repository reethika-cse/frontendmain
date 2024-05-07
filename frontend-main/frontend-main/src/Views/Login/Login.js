import './Login.css';

import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import {call} from '../../Services/call';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';


const defaultTheme = createTheme();


const Login = (props) => {

  const {
    loginUser,
   
    submitUser,
  } = props;

  const navigate = useNavigate();
  const [activateSignup, setActivateSignup] = useState(false);

  const handleSubmit = async (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    if(activateSignup)
    {
      await call(submitUser, data.get('username'), data.get('email'), data.get('password'), navigate);
    }
    else {
      await call(loginUser, data.get('email'), data.get('password'), navigate);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            {activateSignup ? 'Sign Up' : 'Sign In'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {activateSignup && <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {!activateSignup && <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {activateSignup ? 'Sign Up' : 'Sign In'}
            </Button>
            <Grid container>

              <Grid item>
                <a href='#' onClick={() => setActivateSignup(!activateSignup)}>
                  {`Don't have an account? ${!activateSignup ? 'Sign Up' : 'Sign In'}`}
                </a>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default Login;

