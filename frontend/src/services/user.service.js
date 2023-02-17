import axios from "axios";

const API_URL = "http://localhost:8000/";

const getArrivals = () => {
  const config = {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  };
  return axios.get(API_URL + "arrivals/", config);
};

const getArrival = (id) => {
  const config = {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  };
  return axios.get(API_URL + "arrivals/" + id + "/", config);
};

const deleteArrival = (id) => {
  const config = {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  };
  return axios.delete(API_URL + "arrivals/" + id + "/", config);
};

const updateArrival = (arrival) => {
  const config = {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  };
  if (arrival && arrival.id) {
    return axios.put(
      API_URL + "arrivals/" + arrival.id + "/",
      {
        arrivedAt: arrival.arrivedAt,
        name: arrival.name,
      },
      config
    );
  } else {
    return axios.post(
      API_URL + "arrivals/",
      {
        arrivedAt: arrival.arrivedAt,
        name: arrival.name,
      },
      config
    );
  }
};

// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };

// const getUserBoard = () => {
//   return axios.get(API_URL + "user");
// };

// const getModeratorBoard = () => {
//   return axios.get(API_URL + "mod");
// };

// const getAdminBoard = () => {
//   return axios.get(API_URL + "admin");
// };

const UserService = {
  getArrivals,
  getArrival,
  deleteArrival,
  updateArrival,
};

export default UserService;
