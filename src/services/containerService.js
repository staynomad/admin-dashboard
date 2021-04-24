import { app } from "../utils/axiosConfig";

export default {
  createContainer: async (title, listings) => {
    return await app.post("/container/", {
      title,
      listings,
    });
  },
  deleteContainer: async (title) => {
    return await app.delete(`/container/byTitle/${title}`);
  },
  getContainer: async (title) => {
    return await app.get(`/container/byTitle/${title}`);
  },
  addListing: async (title, listingId) => {
    return await app.post(`/container/addListing`, {
      title,
      listingId,
    });
  },
  deleteListing: async (title, listingId) => {
    return await app.delete(`/container/deleteListing`, {
      title,
      listingId,
    });
  },
};
