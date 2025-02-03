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
import { Profile } from "@/interfaces/profile";
import { putDataAuthenticated } from "@/utils/http";
import { ChangeEmailSchema } from "@/validations/updateData";

export default function ChangeEmailDialog({
  profile,
}: {
  profile: Profile | null;
}) {
  const [open, setOpen] = useState(false);

  const changeEmailForm = useForm<z.infer<typeof ChangeEmailSchema>>({
    resolver: zodResolver(ChangeEmailSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = changeEmailForm;

  const handleUpdate = handleSubmit(async (data) => {
    try {
      await putDataAuthenticated("/auth/email", data);
      openToast({ type: "success", message: "Data berhasil diperbarui" });
      setOpen(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        openToast({ type: "error", message: error.message });
        console.error(error.message);
      }
    }
  });

  const handleDialogOpen = () => {
    reset(); // Reset nilai formulir ke nilai default
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <TextField
          {...register("new_email")}
          required
          disabled
          id="email"
          label="Email"
          size="small"
          className="w-full mr-4"
          value={profile?.user.email || ""}
          key={profile?.user.email}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <Button
          size="small"
          onClick={handleDialogOpen}
          variant="outlined"
          // color="secondary"
          className="h-10 px-6 whitespace-nowrap text-xs text-primary border-2 border-primary"
        >
          Ganti Email
        </Button>
      </div>

      <Dialog onClose={handleDialogClose} open={open}>
        <DialogTitle
          id="alert-dialog-title"
          className="text-lg text-center font-semibold text-gray-800"
        >
          Ganti Email
        </DialogTitle>
        <DialogContent>
          <TextField
            className="mb-4"
            {...register("new_email")}
            required
            label="Email baru"
            type="email"
            size="small"
            name="new_email"
            variant="outlined"
            fullWidth
            margin="dense"
            error={!!errors.new_email}
            helperText={errors.new_email?.message}
          />
          <TextField
            {...register("password")}
            required
            id="password"
            label="Kata sandi"
            size="small"
            type="password"
            className="w-full"
            error={!!errors.password}
          />
        </DialogContent>
        <DialogActions className="pb-8 pt-0 px-6">
          <Button onClick={() => setOpen(false)}>Batal</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
