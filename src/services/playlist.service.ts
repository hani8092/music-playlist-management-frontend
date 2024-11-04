import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getPlaylists = async (userID: string) => {
  try {
    const response = await axiosClient.get(`playlists/user/${userID}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getSongs = async (q: string) => {
  try {
    const response = await axiosClient.get(`playlists/search?q=${q}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createPlaylist = async (formData: {
  name: string;
  description: string;
  userID: string;
}) => {
  try {
    const response = await axiosClient.post(`playlists`, formData);
    return response.data;
  } catch (error) {
    return error;
  }
};
