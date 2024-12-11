import { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";

import { Dayjs } from "dayjs";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Link, MenuItem, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { postData } from "@/utils/http";
import { RegisterSchema } from "@/validations/auth";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const registerForm = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  const handleDateChange = (newValue: Dayjs | null) => {
    setValue("birth", newValue?.format("YYYY-MM-DD") || "");
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = registerForm;

  const signup = handleSubmit(async (data) => {
    try {
      await postData("/signup/consumer", data);
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  });

  return (
    <div className="p-8 pb-24 space-y-5">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold">Registration</h1>
        <hr className="border-t-2 border-primary mt-2" />
      </div>
      <div className="flex flex-wrap gap-4">
        <TextField
          {...register("name")}
          required
          id="name"
          label="Name"
          className="w-full"
          size="small"
          placeholder="Enter Name"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Birth"
            onChange={handleDateChange}
            slotProps={{
              textField: {
                error: !!errors.birth,
                size: "small",
                helperText: errors.birth?.message,
                placeholder: "Enter Date of Birth",
                required: true,
              },
            }}
            className="w-full"
          />
        </LocalizationProvider>
        <TextField
          select
          {...register("sex")}
          required
          label="Gender"
          className="w-full"
          size="small"
          error={!!errors.sex}
          helperText={errors.sex?.message}
          value={watch("sex") || ""}
        >
          <MenuItem value="">
            <em>Select Gender</em>
          </MenuItem>
          <MenuItem value="Laki-laki">Laki-laki</MenuItem>
          <MenuItem value="Perempuan">Perempuan</MenuItem>
        </TextField>
        <TextField
          {...register("weight", {
            setValueAs: (value) => +value,
          })}
          required
          id="weight"
          label="Weight"
          type="number"
          className="w-full"
          size="small"
          placeholder="Enter Weight"
          error={!!errors.weight}
          helperText={errors.weight?.message}
        />
        <TextField
          {...register("height", {
            setValueAs: (value) => +value,
          })}
          required
          id="height"
          label="Height"
          type="number"
          className="w-full"
          size="small"
          placeholder="Enter Height"
          error={!!errors.height}
          helperText={errors.height?.message}
        />
        <TextField
          {...register("email")}
          required
          id="email"
          label="Email"
          type="email"
          className="w-full"
          size="small"
          placeholder="Enter Email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...register("phone")}
          required
          id="phone-number"
          label="Phone Number"
          type="tel"
          className="w-full"
          size="small"
          placeholder="Enter Phone Number"
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />
        <TextField
          {...register("password")}
          required
          id="password"
          label="Password"
          type="password"
          className="w-full"
          size="small"
          placeholder="Enter Password"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          {...register("password_confirmation")}
          required
          id="confirm-password"
          label="Confirm Password"
          type="password"
          className="w-full"
          size="small"
          placeholder="Enter Confirm Password"
          error={!!errors.password_confirmation}
          helperText={errors.password_confirmation?.message}
        />
        <TextField
          select
          {...register("medical_history")}
          required
          label="Medical Condition"
          className="w-full"
          size="small"
          error={!!errors.medical_history}
          helperText={errors.medical_history?.message}
          value={watch("medical_history") || ""}
        >
          <MenuItem value="">
            <em>Select Medical Condition</em>
          </MenuItem>
          <MenuItem value="no_history">Tidak Ada</MenuItem>
          <MenuItem value="cardiovascular">Jantung Koroner/Kolesterol</MenuItem>
          <MenuItem value="diabetes">Diabetes</MenuItem>
          <MenuItem value="hypertension">Hipertensi</MenuItem>
        </TextField>
      </div>
      <Button size="small" variant="contained" onClick={signup}>
        Sign Up
      </Button>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <p>
        Have an account?{" "}
        <Link href="/login" className="text-primary font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
}
