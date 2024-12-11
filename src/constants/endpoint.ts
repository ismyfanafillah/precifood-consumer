export const GET_ORDERS = `/consumers/orders`;
export const GET_RECOMMENDATIONS = `/restaurants/${process.env.NEXT_PUBLIC_RESTAURANT_ID}/recommendations`;
export const GET_MENUS = `/restaurants/${process.env.NEXT_PUBLIC_RESTAURANT_ID}/menus`;
export const SEARCH_MENUS = (query: string) =>
  `/restaurants/${process.env.NEXT_PUBLIC_RESTAURANT_ID}/menus/search?name=${query}`;
export const PROFILE = `/users/consumers/profile`;