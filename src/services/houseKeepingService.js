import { app } from "../utils/axiosConfig";

const houseKeepingService = {
  getUsersData: async () => {
    return await app.get(`/housekeeping/users`);
  },
  getListingsData: async () => {
    return await app.get(`/housekeeping/listings`);
  },
};

export default houseKeepingService;
