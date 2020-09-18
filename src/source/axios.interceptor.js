import axios from "axios";
import store from "./store";
import app from "./main";

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "../api/";
} else {
  // axios.defaults.baseURL = "http://10.0.19.148/roadtax3api/public/";
  // axios.defaults.baseURL = "http://10.0.19.222/roadtax3api/public/";
  axios.defaults.baseURL = "../api/";
}

export default function setup() {
  axios.interceptors.request.use(
    config => {
      app.$Progress.start();
      const token = store.get("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );
  axios.interceptors.response.use(
    res => {
      app.$Progress.finish();
      return res;
    },
    error => {
      app.$Progress.finish();
      if (error.response) {
        switch (error.response.status) {
          case 401:
            app.$router.replace("/login");
            return Promise.resolve("Session logout");
          case 403:
            app.$swal({
              type: "error",
              title: "Permission Denied",
              text: "ທ່ານບໍ່ໄດ້ຮັບອະນຸຍາດໃຫ້ເຂົ້າໃຊ້ສ່ວນນີ້"
            });
            break;
          case 404:
            app.$swal({
              type: "error",
              title: "ບໍ່ພົບ ສີ່ງທີ່ທ່ານ ກຳລັງຊອກຫາ",
              text: "ສິ່ງທີ່ທ່ານກຳລັງ ເຂົ້າຫາ ບໍ່ມີຢູ່ ຫຼື ອາດຖືກລຶບໄປແລ້ວ"
            });
            break;
          case 450:
            app.$swal({
              type: "error",
              title: "ຜິດພາດ",
              text: "ຊື່ຫຼື ລະຫັດ ບໍ່ຖືກຕ້ອງ"
            });
            break;
          default:
            var data = error.response.data;
            var msg = "ມີຂໍ້ຜິດພາດ";
            if (typeof data === "string") {
              msg = data;
            }
            if (typeof data === "object") {
              if ("message" in data) msg = data.message;
            }
            app.$swal({
              type: "error",
              title: "ບໍ່ສຳເລັດ",
              text: msg
            });
        }
      } else {
        app.$swal({
          type: "error",
          text: "ມີຂໍ້ຜິດພາດ"
        });
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
}
