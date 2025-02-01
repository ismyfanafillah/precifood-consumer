import { Card, CardContent, Typography } from "@mui/material";

import LayoutWithBottomNav from "@/components/LayoutWithBottomNav";
// import { Restaurant } from "@/interfaces/restaurant";
import { useGetRestaurantProfile } from "@/hooks/useGetData";

export default function Restaurant() {
  const { data: restaurant_profile } = useGetRestaurantProfile();
  return (
    <LayoutWithBottomNav>
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold">Restoran</h1>
        <hr className="border-t-2 border-primary mt-2" />
      </div>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <Card className="max-w-3xl mx-auto shadow-lg rounded-lg bg-white">
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Typography
                variant="subtitle1"
                className="font-bold text-gray-800"
              >
                {restaurant_profile?.contact.name}
              </Typography>
              <Typography variant="body2" className="text-gray-500 italic">
                (dipilih)
              </Typography>
            </div>

            <div className="mb-6">
              <Typography variant="subtitle2" className="text-gray-700">
                <strong>Email:</strong> {restaurant_profile?.contact.email}
              </Typography>
              <Typography variant="subtitle2" className="text-gray-700">
                <strong>Contact:</strong> {restaurant_profile?.contact.phone}
              </Typography>
              <Typography variant="subtitle2" className="text-gray-700">
                <strong>Address:</strong> {restaurant_profile?.address.address_detail}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutWithBottomNav>
  );
}
