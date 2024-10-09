import { Instance } from "../../lib/axios/axios.config";

const EventsService = {
  async getAll() {
    const response = await Instance.get("/events");
    return response.data;
  },
  async removeById(id) {
    if (id === undefined || id < 1) return { remove: false };
    try {
      const response = await Instance.delete(`/events/e-${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
      return { remove: false };
    }
  },
  async create(title, description, startDate, endDate) {
    const event = await Instance.post("/events", {
      title: title,
      description: description,
      start_date: startDate,
      end_date: endDate,
    });
    return event.data;
  },
  async update(id, title, description, start_date, end_date) {
    let body = {};
    if (typeof title !== "undefined") body.title = title;
    if (typeof description !== "undefined") body.description = description;
    if (typeof start_date !== "undefined") body.start_date = start_date;
    if (typeof end_date !== "undefined") body.end_date = end_date;
    if (body == {}) return false;
    console.log(body);
    const response = await Instance.put(`/events/e-${id}`, body);
    return response.data;
  },
  async getById(id) {
    if (id === undefined) return null;
    try {
      const response = await Instance.get(`/events/e-${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  async getAchievementsByEventId(eventId) {
    if (eventId === undefined) return null;
    try {
      const response = await Instance.get(`/events/e-${eventId}/achievements`);
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  async ApproveAchievement(eventId, AchieveId) {
    if (eventId === undefined || AchieveId === undefined) return false;
  },
  async search(searchString) {
    if (searchString === "" || searchString === undefined) return null;
    try {
      const response = await Instance.get("/events/search", {
        params: { q: searchString },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

export default EventsService;
