import { useRouter } from "next/router";

import { openConfirmationDialog } from "./ConfirmationDialog";

import Button from "@mui/material/Button";

import { removeCookiesLogout } from "@/utils/cookie";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const confirmation = await openConfirmationDialog({
      title: "Konfirmasi Logout",
      description: "Apakah Anda yakin ingin keluar dari aplikasi?",
    });
    if (!confirmation) return;
    removeCookiesLogout();
    router.push("/login");
  };
  return (
    <div className="text-left">
      <Button
        variant="contained"
        onClick={logout}
        color="error"
        className="rounded-full"
      >
        Keluar
      </Button>
    </div>
  );
}
