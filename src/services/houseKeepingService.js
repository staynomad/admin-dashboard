import { app } from "../utils/axiosConfig";

const houseKeepingService = {
  getUsersData: async () => {
    return await app.get(`/housekeeping/users`);
  },
};

export default houseKeepingService;
