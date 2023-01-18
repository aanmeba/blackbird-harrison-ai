import { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import logo from "../../assets/logo.svg";
import validator from "email-validator";

export default function LoginForm() {
  const [showAlert, setShowAlert] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validatePassword = (password) => {
    const pwRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]).{8,}$/;
    const letterCase = /^(?=.*[a-z])(?=.*[A-Z])/;
    const digit = /^(?=.*\d)/;
    const special = /^(?=.*[!@#$%^&*()_+\-=\]{};':"\\|,.<>?])/;

    if (!pwRegex.test(password)) {
      if (password.length < 8) {
        return "Password should be 8 or more characters";
      } else if (!letterCase.test(password)) {
        return "Password should contain minimum 1 character for both uppercase and lowercase letter";
      } else if (!digit.test(password)) {
        return "Password should contain minimum 1 digit of numeric value";
      } else if (!special.test(password)) {
        return "Password should contain minimum 1 special character";
      }
    }

    return null;
  };

  const validateEmail = (email) => {
    if (!validator.validate(email)) {
      return setEmailError(true);
    }
    return setEmailError(false);
  };

  const validateForm = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    // Add validation code here
    setPasswordError(validatePassword(password));
    validateEmail(email);

    if (passwordError === null && !emailError) {
      setShowAlert("Login Successful");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    validateForm(event);
  };

  return (
    <>
      {showAlert && (
        <Snackbar
          open={showAlert ? true : false}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={showAlert}
        >
          <Alert>{showAlert}</Alert>
        </Snackbar>
      )}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              my: 2,
            }}
          >
            <img src={logo} width="147" alt="harrison.ai" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
              helperText={emailError ? "Please enter valid email address" : ""}
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
              error={passwordError ? true : false}
              helperText={passwordError ? passwordError : ""}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
