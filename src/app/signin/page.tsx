/**
 * Страница логина
 * Перенаправляет при успешном входе в систему на главную страницу
 */
"use client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import Cookies from "universal-cookie";
export default function SignIn() {
  const router = useRouter();
  const methods = useForm();

  const { control, handleSubmit } = methods;
  const login = (data: any) => {
    console.log("data: ", data);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    axios
      .post("http://localhost:3000/api/user/login", {
        data: {
          username: data.get("email"),
          password: data.get("password"),
        },
      })
      .then((res) => {
        console.log("Successfully logged in");
        const cookies = new Cookies(null, { path: "/" });
        cookies.set("userId", res.data.userId);
        cookies.set("username", res.data.username);
        cookies.set("accessToken", res.data.accessToken);
        cookies.set("refreshToken", res.data.refreshToken);
        cookies.set("accessTokenExpiresAt", res.data.accessTokenExpiresAt);
        cookies.set("refreshTokenExpiresAt", res.data.refreshTokenExpiresAt);
        router.push("/");
      })
      .catch((err) => {
        console.log("Error while log in", err);
      });
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth="sm">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                autoFocus
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Button
            onClick={handleSubmit(login)}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Container>
    </FormProvider>
  );
}
