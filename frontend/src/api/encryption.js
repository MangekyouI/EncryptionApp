import api from "./axios";

export const encryptMessage = async (text) => {
  const response = await api.post("/messages/encrypt", { content: text });
  return response.data;
};

export const decryptMessage = async (text) => {
  const response = await api.post("/messages/decrypt", { content: text });
  return response.data;
};
