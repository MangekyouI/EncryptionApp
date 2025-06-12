import api from "./axios";

export const getMessages = async () => {
  const response = await api.get("/messages");
  return response.data;
};

export const deleteMessage = async (id) => {
  const response = await api.delete(`/messages/${id}`);
  return response.data;
};

export const saveMessage = async ({ content }) => {
  return await api.post("/messages/save", { content });
};
