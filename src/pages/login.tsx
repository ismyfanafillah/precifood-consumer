import { useState } from "react";
import { useForm } from "react-hook-form";
import Carousel from "react-material-ui-carousel";

import Image from "next/image";
import { useRouter } from "next/router";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  Link,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import { setCookie } from "@/utils/cookie";
import { postData } from "@/utils/http";
import { LoginSchema } from "@/validations/auth";
import { useGetRestaurants } from "@/hooks/useGetData";

const image = [
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png",
  "/images/image4.png",
  "/images/image5.png",
];

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { data: restaurants } = useGetRestaurants();
  const router = useRouter();

  const loginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = loginForm;

  const login = handleSubmit(async (data) => {
    try {
      const responseData = await postData("/auth/login", data);
      setCookie("token", responseData.access_token);
      setCookie("restaurant_id", data.restaurant_id);
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  });

  return (
    (<div className="w-full h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Carousel indicators={false} navButtonsAlwaysInvisible>
          {image.map((img, index) => (
            <div
              key={index}
              className="relative w-full h-screen overflow-hidden"
            >
              <Image
                src={img}
                alt={`Foto ${index + 1}`}
                className="rounded-lg"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover"
                }} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
      <div className="relative z-20 items-center justify-center w-full h-full p-8">
        <div className="text-center mb-8">
          <div className="mb-4">
            {/* Menampilkan logo */}
            {/* <Image
              src="/public/images/logo.png"
              alt="Precifood Logo"
              width={150} // Lebar gambar
              height={50} // Tinggi gambar
              className="mx-auto"
            /> */}
          </div>
          <Typography
            variant="h4"
            component="h1"
            color="white"
            className="font-bold"
          >
            PreciFood
          </Typography>
          <Typography variant="body1" color="white" className="mt-2 italic">
            For Specific Restaurant
          </Typography>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
          <form onSubmit={login}>
            <Typography
              variant="h6"
              color="primary"
              className="mt-2 text-center font-bold"
            >
              Selamat datang kembali!
            </Typography>
            <Typography
              variant="body1"
              color="primary"
              className="mb-2 text-center"
            >
              Silakan masuk untuk melanjutkan.
            </Typography>
            <div className="mb-4">
              <TextField
                {...register("email")}
                required
                id="email"
                label="Email"
                size="small"
                type="email"
                className="w-full"
                placeholder="Masukkan Email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </div>
            <div className="mb-4">
              <TextField
                {...register("password")}
                required
                id="password"
                label="Kata Sandi"
                size="small"
                type="password"
                className="w-full"
                placeholder="Masukkan Kata Sandi"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </div>
            <TextField
              select
              {...register("restaurant_id")}
              required
              label="Restaurants"
              className="w-full"
              size="small"
              error={!!errors.restaurant_id}
              helperText={errors.restaurant_id?.message}
              value={watch("restaurant_id") || ""}
            >
              <MenuItem value="">
                <em>Pilih Restoran</em>
              </MenuItem>
              {restaurants?.map((restaurant) => (
                <MenuItem key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </MenuItem>
              ))}
              {/* <MenuItem value="R-0192c857-35e6-7cc2-98da-46f0faf6f651">Restoran Karimata</MenuItem> */}
            </TextField>
            <Button
              variant="contained"
              type="submit"
              className="w-full py-2 mt-4"
              size="large"
            >
              Masuk
            </Button>
          </form>

          {errorMessage && (
            <Alert severity="error" className="mt-4">
              {errorMessage}
            </Alert>
          )}
          <p className="mt-4 text-center">
            Belum memiliki akun?{" "}
            <Link href="/register" className="text-primary font-semibold">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>)
  );
}
