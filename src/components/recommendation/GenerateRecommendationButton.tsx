import { openToast } from "../Toast";

import { Button } from "@mui/material";

import { postDataAuthenticated } from "@/utils/http";

export function GenerateRecommendationButton() {
  const generateRecommendation = async () => {
    try {
      await postDataAuthenticated(
        `/restaurants/${process.env.NEXT_PUBLIC_RESTAURANT_ID}/recommendations`,
      );
      openToast({
        type: "success",
        message:
          "Generate rekomendasi berhasil! Silahkan untuk merefresh halaman rekomendasi menu setelah 5 menit",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        openToast({ type: "error", message: error.message });
      }
    }
  };
  return (
    <Button
      className="rounded-3xl"
      size="small"
      variant="contained"
      onClick={generateRecommendation}
    >
      Rekomendasi Baru
    </Button>
  );
}
