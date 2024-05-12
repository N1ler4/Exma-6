import { create } from "zustand";
import http from "@http";
import { saveDataFromCookie } from "../utils/tokenService";

const useAuthStore = create(() => ({
  signin: async (payload: any) => {
    try {
      const response = await http.post("/login", payload);
      if (response.status === 200) {
        saveDataFromCookie("token", response?.data?.access_token);
        return response
      }
      
    } catch (err) {
      console.error(err);
    }
  },
}));

export default useAuthStore;