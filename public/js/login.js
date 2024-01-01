import { showAlert } from "./alert";
import axios from "axios";
export const login = async (email, password) => {
  // console.log(email, password);
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:4000/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfuly!");
      window.setTimeout(() => {
        location.assign("/_overview");
      }, 1500);
    }
    console.log(res);
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const logout = async () => {
  console.log("logged");

  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:4000/api/v1/users/logout",
    });

    // Use strict equality operator (===) for comparison
    if (res.data.status === "success") {
      // location.reload(true);
      location.assign("/");
      // window.location.href = window.location.href;
    }
  } catch (err) {
    showAlert("error", "Error logging out! Try again.");
  }
};
