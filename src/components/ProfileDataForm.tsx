import { UseFormReturn } from "react-hook-form";

import dayjs from "dayjs";
import { z } from "zod";

import { MenuItem, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { Profile } from "@/interfaces/profile";
import { UpdateProfileSchema } from "@/validations/updateData";

export default function ProfileDataForm({
  form,
  profile,
}: {
  form: UseFormReturn<z.infer<typeof UpdateProfileSchema>>;
  profile: Profile | null;
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-wrap gap-4">
      <TextField
        required
        disabled
        id="name"
        label="Name"
        size="small"
        className="w-full"
        placeholder="Enter Name"
        value={profile?.personal_information.name || ""}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date of Birth"
          disabled
          value={profile ? dayjs(profile.personal_information.birth) : null}
          slotProps={{
            textField: {
              size: "small",
              placeholder: "Enter Date of Birth",
              required: true,
            },
          }}
          size-="small"
          className="w-full"
        />
      </LocalizationProvider>
      <TextField
        select
        required
        disabled
        label="Gender"
        size="small"
        className="w-full"
        value={profile?.personal_information.sex || ""}
        key={profile?.personal_information.sex}
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
        size="small"
        className="w-full"
        placeholder="Enter Weight"
        error={!!errors.weight}
        helperText={errors.weight?.message}
        value={watch("weight") || ""}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField
        {...register("height", {
          setValueAs: (value) => +value,
        })}
        required
        id="height"
        label="Height"
        type="number"
        size="small"
        className="w-full"
        placeholder="Enter Height"
        error={!!errors.height}
        helperText={errors.height?.message}
        value={watch("height") || ""}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField
        {...register("phone")}
        required
        id="phone-number"
        label="Phone Number"
        type="tel"
        size="small"
        className="w-full"
        placeholder="Enter Phone Number"
        error={!!errors.phone}
        helperText={errors.phone?.message}
        value={watch("phone") || ""}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField
        select
        {...register("medical_history")}
        required
        label="Medical Condition"
        size="small"
        className="w-full"
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
  );
}
