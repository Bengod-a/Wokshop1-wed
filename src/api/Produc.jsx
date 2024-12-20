import axios from "axios";

export const createProduct = async (token, form) => {
  return axios.post("https://wokshop1.vercel.app/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listProduct = async (count = 20) => {
  return axios.get("https://wokshop1.vercel.app/api/products/" + count);
};

export const readProduct = async (token, id) => {
  return axios.get("https://wokshop1.vercel.app/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = async (token, id) => {
  return axios.delete("https://wokshop1.vercel.app/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = async (token, id, form) => {
  return axios.put("https://wokshop1.vercel.app/api/product/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const UploadFiles = async (token, form) => {
  return axios.post(
    "https://wokshop1.vercel.app/api/images",
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFiles = async (token, public_id) => {
  return axios.post(
    "https://wokshop1.vercel.app/api/removeimages",
    {
      public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const searchFilters = async (arg) => {
  return axios.post('https://wokshop1.vercel.app/api/search/filters', arg);
};



export const listproductBy = async (sort, order, limit) => {
  return axios.post('https://wokshop1.vercel.app/api/productby',
    {
      sort,
      order,
      limit,
    }
  );
};