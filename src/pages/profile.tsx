import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";

import ChangeEmailDialog from "@/components/ChangeEmailDialog";
import ChangePasswordDialog from "@/components/ChangePasswordDialog";
import { openConfirmationDialog } from "@/components/ConfirmationDialog";
import LayoutWithBottomNav from "@/components/LayoutWithBottomNav";
import { LogoutButton } from "@/components/LogoutButton";
import ProfileDataForm from "@/components/ProfileDataForm";
import { openToast } from "@/components/Toast";
import { useGetProfile } from "@/hooks/useGetData";
import { patchDataAuthenticated } from "@/utils/http";
import { UpdateProfileSchema } from "@/validations/updateData";

export default function Profile() {
  const { data: profile } = useGetProfile();
  const profileForm = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
  });

  const { handleSubmit, setValue } = profileForm;

  const handleUpdate = handleSubmit(async (data) => {
    const confirmation = await openConfirmationDialog({
      title: "Konfirmasi Edit Profile",
      description: "Apakah Anda yakin ingin mengedit profile anda?",
    });
    if (!confirmation) return;
    try {
      await patchDataAuthenticated("/users/consumers/profile", data);
      openToast({ type: "success", message: "Profil berhasil diperbarui" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        openToast({ type: "error", message: error.message });
        console.error(error.message);
      }
    }
  });

  useEffect(() => {
    if (!profile) return;
    setValue("phone", profile.personal_information.phone);
    setValue("height", profile.personal_information.height);
    setValue("weight", profile.personal_information.weight);
    setValue("medical_history", profile.medical_history);
  }, [profile, setValue]);

  return (
    <LayoutWithBottomNav>
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold">Profil</h1>
        <hr className="border-t-2 border-primary mt-2" />
      </div>

      <ProfileDataForm form={profileForm} profile={profile} />
      <ChangeEmailDialog profile={profile} />
      <ChangePasswordDialog />
      <div className="flex justify-between items-center min-h-[40vh]">
        <LogoutButton />
        <div className="text-right xrounded-full">
          <Button variant="contained" onClick={handleUpdate} className="rounded-full">
            Simpan
          </Button>
        </div>
      </div>
    </LayoutWithBottomNav>
  );
}
