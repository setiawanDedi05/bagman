import axios from "axios";

export const api = axios.create({
  	headers: {
		"Content-Type":"application/json"
	},
	withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);


