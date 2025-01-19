import Cookies from "js-cookie";

export const setCookie = (key: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  Cookies.set(key, value, { expires });
};

export const getCookie = (key: string) => {
  return Cookies.get(key);
};

export const deleteCookie = (key: string) => {
  Cookies.remove(key);
};
