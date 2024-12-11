import { useCallback, useRef, useState } from "react";

import { Button, Dialog } from "@mui/material";

import MenuDialogContent from "@/components/menu/MenuDialogContent";
import { Menu } from "@/interfaces/menu";
import { getDataAuthenticated } from "@/utils/http";

export default function InfoMenuDialog({ id }: { id: number }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<Menu | null>(null);
  const menuFetched = useRef(false);

  const fetchData = useCallback(async () => {
    try {
      if (menuFetched.current) return;
      const data = await getDataAuthenticated(
        `/restaurants/${process.env.NEXT_PUBLIC_RESTAURANT_ID}/menus/${id}`,
      );
      setMenu(data);
      menuFetched.current = true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }, [id]);

  const openInfoMenuDialog = () => {
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
        onClick={openInfoMenuDialog}
      >
        Lihat
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        {menu ? <MenuDialogContent menu={menu} /> : null}
      </Dialog>
    </div>
  );
}
