import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/Produc";
import _ from "lodash";
import { toast } from "react-toastify";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categorys: [],
  products: [],
  carts: [],
  logout: () => {
    set({
      user: null,
      token: null,
      categorys: [],
      products: [],
      carts: [],
    });
  },
  actionAddtocart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];

    const unip = _.unionWith(updateCart, _.isEqual);
    toast.success('เพิ่มสินค้าลงในตะกร้าสำเร็จ! 🎉')
    // console.log('click add in z', updateCart);
    // console.log('click add in z', unip);

    set({ carts: unip });
  },

  actionUpdateQuantity: (productId, newQuantity) => {
    // console.log('up click', productId, newQuantity);
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },

  actionRemovProduct: (productId) => {
    // console.log('Remove jaaaa', productId);
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
    toast.success('ลบสินค้าในตะกร้าสำเร็จ! 🎉')
  },

  getTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },

  actionLogin: async (form) => {
    const res = await axios.post("https://wokshop1.vercel.app/api/login", form);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },

  getCategoty: async () => {
    try {
      const res = await listCategory();
      set({ categorys: res.data });
    } catch (err) {
      console.log(err);
    }
  },

  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      // console.log("Get Product Response:", res.data); // ตรวจสอบข้อมูลที่ได้
      set({ products: res.data });
    } catch (err) {
      console.log("Error in Get Product:", err);
    }
  },

  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      // console.log("Search Filters Response:", res.data); // ตรวจสอบข้อมูลที่ได้
      set({ products: res.data });
    } catch (err) {
      console.log("Error in Search Filters:", err);
    }
  },

  clearCart: () => {
    set({ carts: [] });
  },
});

const userPersit = {
  name: "ecom-store",
  Storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomStore, userPersit));

export default useEcomStore;
