import { Dialog, DialogContent, DialogActions, Divider, Typography, Button } from "@mui/material";
import { SuccessOrder } from "@/interfaces/order";
import React, {useState} from "react";

export default function SuccessOrderDialogContent({
  success
}: {
  success: SuccessOrder;
}) {
  console.log(success);
  const [open, setOpen] = useState(true);

  return (
    <>
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogContent className="space-y-4">
        <Typography
          variant="h6"
          className="text-lg font-bold text-center text-primary"
        >
          Pesanan Berhasil!
        </Typography>

        <Divider/>

        <div className="space-y-2">
          <Typography variant="subtitle1" className="text-gray-700 font-medium">
            Nama Consumer:{" "}
            <span className="font-normal">{success.consumer_name}</span>
          </Typography>
          <Typography variant="subtitle1" className="text-gray-700 font-medium">
            Nama Restaurant:{" "}
            <span className="font-normal">{success.restaurant_name}</span>
          </Typography>
          <Typography variant="subtitle1" className="text-gray-700 font-medium">
            Total Harga:{" "}
            <span className="font-normal">
              Rp{success.total_price.toLocaleString("id-ID")}
            </span>
          </Typography>
        </div>

        <Divider/>

        <Typography variant="body2" className="text-gray-500 italic text-center">
          Silakan sampaikan pesanan kepada waitress.
        </Typography>
      </DialogContent>

      <DialogActions className="justify-center mb-2">
        <Button variant="contained" className="rounded-3xl" onClick={() => setOpen(false)}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
}
