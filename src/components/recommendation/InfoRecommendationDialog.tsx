import { useCallback, useRef, useState } from "react";

import { Button, Dialog } from "@mui/material";

import RecommendationDialogContent from "@/components/recommendation/RecommendationDialogContent";
import { Recommendation } from "@/interfaces/menu";
import { getDataAuthenticated } from "@/utils/http";

export default function InfoRecommendationDialog({
  id,
  rank,
}: {
  id: number;
  rank: number;
}) {
  const [open, setOpen] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null,
  );
  const recommendationFetched = useRef(false);

  const fetchData = useCallback(async () => {
    try {
      if (recommendationFetched.current) return;
      const data = await getDataAuthenticated(
        `/restaurants/${process.env.NEXT_PUBLIC_RESTAURANT_ID}/recommendations/${id}`,
      );
      setRecommendation(data);
      recommendationFetched.current = true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }, [id]);

  const openInfoRecommendationDialog = () => {
    setOpen(true);
    fetchData();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className="rounded-3xl"
        size="small"
        variant="contained"
        onClick={openInfoRecommendationDialog}
      >
        Lihat
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        {recommendation ? (
          <RecommendationDialogContent
            recommendation={recommendation}
            rank={rank}
            id={id}
            nutrition_summary={recommendation.nutrition_summary}
          />
        ) : null}
      </Dialog>
    </div>
  );
}