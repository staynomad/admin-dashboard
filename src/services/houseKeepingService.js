import { app } from "../utils/axiosConfig";

const houseKeepingService = {
  getUsersData: async () => {
    return await app.get(`/housekeeping/users`);
  },
  getListingsData: async () => {
    return await app.get(`/housekeeping/activeListings`);
  },
};

export default houseKeepingService;
