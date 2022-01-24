import { getAxiosInstance } from ".";

export const updateShiftPublish = async () => {
  const api = getAxiosInstance();
  const { data } = await api.post("/shiftPublish");
  return data;
};

export const getShiftPublish = async () => {
  const api = getAxiosInstance();
  const { data } = await api.get(`/shiftPublish`);
  return data;
};
export const createShiftPublish = async (date: string) => {
  const api = getAxiosInstance();
  const payload = { date };
  const { data } = await api.post(`/shiftPublish`, payload);
  return data;
};
