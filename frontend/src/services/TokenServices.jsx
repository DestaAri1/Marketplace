import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get("token") || localStorage.getItem("token");
};

export const setToken = (token) => {
  Cookies.set("token", token, {
    expires: 1,
    path: "/",
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production", // Use secure flag in production
  });
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  Cookies.remove("token", { path: "/" });
  localStorage.removeItem("token");
};
