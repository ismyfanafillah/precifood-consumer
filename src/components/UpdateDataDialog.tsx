import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { openConfirmationDialog } from "./ConfirmationDialog";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";

import { openToast } from "@/components/Toast";
import { getCookies, setCookie } from "@/utils/cookie";
import { getDataAuthenticated, patchDataAuthenticated } from "@/utils/http";
import { UpdateDataSchema } from "@/validations/updateData";

export default function UpdateDataDialog() {
  const [open, setOpen] = useState(false);

  const updateDataForm = useForm<z.infer<typeof UpdateDataSchema>>({
    resolver: zodResolver(UpdateDataSchema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = updateDataForm;

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await getDataAuthenticated("/users/consumers/profile");
        setValue("weight", data.personal_information.weight);
        setValue("height", data.personal_information.height);
        setValue("medical_history", data.medical_history);
      } catch (error: unknown) {
        if (error instanceof Error) {
          openToast({ type: "error", message: error.message });
        }
      }
    };
    const updateData = getCookies("updateData");
    if (!updateData) {
      setOpen(true);
      setCookie("updateData", "true");
    }
    getProfile();
  }, [setValue]);

  const handleUpdate = handleSubmit(async (data) => {
    const confirmation = await openConfirmationDialog({
      title: "Konfirmasi Edit Profile",
      description: "Apakah Anda yakin ingin mengedit profile anda?",
    });
    if (!confirmation) return;
    try {
      await patchDataAuthenticated("/users/consumers/profile", data);
      openToast({ type: "success", message: "Data berhasil diperbarui" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        openToast({ type: "error", message: error.message });
        console.error(error.message);
      }
    } finally {
      setOpen(false);
    }
  });

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>
        <div className="mb-1 text-center">
          <h3 className="text-xl font-bold">Update Data</h3>
          <hr className="border-t-2 border-primary mt-1" />
        </div>
      </DialogTitle>
      <DialogContent className="py-0 mb-1">
        <p className="italic text-center mb-1">
          Apakah anda ingin melakukan update data berikut?
        </p>
        <TextField
          {...register("weight", {
            setValueAs: (value) => +value,
          })}
          required
          label="Weight"
          type="number"
          name="weight"
          variant="outlined"
          fullWidth
          margin="dense"
          error={!!errors.weight}
          helperText={errors.weight?.message}
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
          label="Height"
          name="height"
          type="number"
          variant="outlined"
          fullWidth
          margin="dense"
          error={!!errors.height}
          helperText={errors.height?.message}
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
          name="medical_history"
          fullWidth
          margin="dense"
          variant="outlined"
          className="mt-2"
          error={!!errors.medical_history}
          helperText={errors.medical_history?.message}
          value={updateDataForm.watch("medical_history") || ""}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        >
          <MenuItem value="">
            <em>Select Medical Condition</em>
          </MenuItem>
          <MenuItem value="no_history">Tidak Ada</MenuItem>
          <MenuItem value="cardiovascular">Jantung Koroner/Kolesterol</MenuItem>
          <MenuItem value="diabetes">Diabetes</MenuItem>
          <MenuItem value="hypertension">Hipertensi</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions className="px-7 mb-2">
        <Button onClick={handleUpdate} variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
