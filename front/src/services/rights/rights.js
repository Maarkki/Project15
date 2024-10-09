import { Instance } from "../../lib/axios/axios.config";

const RightsService = {
  async getAll() {
    const response = await Instance.get("/rights");
    return response.data;
  },
};

export default RightsService;
