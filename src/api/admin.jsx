import axios from "axios";

export const getOrdersadmin = async (token) => {
  return axios.get("https://wokshop1.vercel.app/api/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeStatus = async (token, orderId, orderStatus) => {
  return axios.put(
    "https://wokshop1.vercel.app/api/admin/oder-status",
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const getListAllUsers = async (token) => {
  return axios.get("https://wokshop1.vercel.app/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserStatus = async (token, value) => {
  return axios.post("https://wokshop1.vercel.app/api/change-status", value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserRole = async (token, value) => {
  return axios.post("https://wokshop1.vercel.app/api/change-role", value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};




