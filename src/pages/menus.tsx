import { Alert } from "@mui/material";

import LayoutWithBottomNav from "@/components/LayoutWithBottomNav";
import Search from "@/components/Search";
import MenuList from "@/components/menu/MenuList";
import MenuListSkeleton from "@/components/skeletons/MenuListSkeleton";
import { useGetMenus } from "@/hooks/useGetData";
import { useSearchMenus } from "@/hooks/useSearchMenus";

export default function Menus() {
  const {
    data: menus,
    errorMessage: menusError,
    isLoading: isMenusLoading,
  } = useGetMenus();

  const {
    searchedMenus,
    isLoading,
    errorMessage,
    isSearchActive,
    handleSearch,
    handleCancelSearch,
  } = useSearchMenus();

  return (
    <LayoutWithBottomNav>
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold">Menu</h1>
        <hr className="border-t-2 border-primary mt-2" />
      </div>
      <Search
        onSearch={handleSearch}
        onCancelSearch={handleCancelSearch}
        isSearchActive={isSearchActive}
      />
      {errorMessage ||
        (menusError && (
          <Alert severity="error">{errorMessage || menusError}</Alert>
        ))}
      {isLoading || (isMenusLoading && <MenuListSkeleton />)}
      {isSearchActive && searchedMenus && searchedMenus.length > 0 && (
        <MenuList menulist={searchedMenus} />
      )}
      {!isSearchActive && menus && menus.length > 0 && (
        <MenuList menulist={menus} />
      )}
    </LayoutWithBottomNav>
  );
}
