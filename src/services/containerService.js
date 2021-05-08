import { app } from "../utils/axiosConfig";

const containerService = {
  createContainer: async (title, listings) => {
    return await app.post("/container/", {
      title,
      listings,
    });
  },
  deleteContainer: async (title) => {
    return await app.delete(`/container/byTitle`, {
      data: { title },
    });
  },
  getContainer: async (title) => {
    return await app.get(`/container/byTitle/${title}`);
  },
  getAllContainers: async () => {
    return await app.get(`/container/allContainers`);
  },
  addListing: async (title, listingId) => {
    return await app.post(`/container/addListing`, {
      title,
      listingId,
    });
  },
  deleteListing: async (title, listingId) => {
    return await app.delete(`/container/deleteListing`, {
      data: {
        title,
        listingId,
      },
    });
  },
};

export default containerService;
