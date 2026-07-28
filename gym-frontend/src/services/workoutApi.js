import axios from "axios";

const API_URL = "http://localhost:5000/api/workouts";

export const getWorkouts = () => {
  return axios.get(API_URL);
};

export const addWorkout = (data) => {
  return axios.post(API_URL, data);
};

export const updateWorkout = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteWorkout = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};