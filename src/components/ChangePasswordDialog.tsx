import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { openToast } from "@/components/Toast";
import { putDataAuthenticated } from "@/utils/http";
import { ChangePasswordSchema } from "@/validations/updateData";

export default function ChangePasswordDialog() {
  const [open, setOpen] = useState(false);

  const changePasswordForm = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = changePasswordForm;

  const handleUpdate = handleSubmit(async (data) => {
    try {
      await putDataAuthenticated("/auth/password", data);
      openToast({ type: "success", message: "Data berhasil diperbarui" });
      setOpen(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        openToast({ type: "error", message: error.message });
        console.error(error.message);
      }
    }
  });

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <TextField
          required
          disabled
          id="password"
          type="password"
          label="Password"
          size="small"
          className="w-full mr-4"
          value="password"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <Button
          size="small"
          onClick={() => setOpen(true)}
          variant="contained"
          color="secondary"
          className="h-10 px-3 text-xs text-white"
        >
          Ganti Password
        </Button>
      </div>

      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle
          id="alert-dialog-title"
          className="text-xl font-semibold text-center text-gray-800"
        >
          Ganti Password
        </DialogTitle>
        <DialogContent>
          <TextField
            {...register("old_password")}
            required
            label="Password saat ini"
            type="password"
            size="small"
            name="old_password"
            variant="outlined"
            fullWidth
            margin="dense"
            error={!!errors.old_password}
            helperText={errors.old_password?.message}

          />
          <TextField
            {...register("new_password")}
            required
            label="Password baru"
            type="password"
            size="small"
            name="new_password"
            variant="outlined"
            fullWidth
            margin="dense"
            error={!!errors.new_password}
            helperText={errors.new_password?.message}
          />
          <TextField
            {...register("password_confirmation")}
            required
            label="Konfirmasi Password"
            type="password"
            size="small"
            name="password_confirmation"
            variant="outlined"
            fullWidth
            margin="dense"
            error={!!errors.password_confirmation}
            helperText={errors.password_confirmation?.message}
          />
        </DialogContent>
        <DialogActions className="justify-center pb-8 pt-0">
          <Button onClick={handleUpdate} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
