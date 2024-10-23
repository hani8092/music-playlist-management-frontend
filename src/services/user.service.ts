import axios from "axios";

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
});

export const signUp = async (formData: SignUpFormData) => {
  try {
    const response = await axiosClient.post("users/sign-up", formData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const signIn = async (formData: SignInFormData) => {
  try {
    const response = await axiosClient.post("users/sign-in", formData);
    return response.data;
  } catch (error) {
    return error;
  }
};
