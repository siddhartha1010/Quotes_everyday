import "@babel/polyfill";
import { login, logout } from "./login";

// const logout = async () => {
//   console.log("ds");

//   try {
//     const res = await axios({
//       method: "GET",
//       url: "http://127.0.0.1:4000/api/v1/users/logout",
//     });
//     if (res.data.status === "success") server.reload(true);
//   } catch (err) {
//     showAlert("error", "Error logging out!Try again.");
//   }
// };

const loginForm = document.querySelector(".modal__form");
const logOutBtn = document.querySelector(".button-warning");

if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    console.log("yo click vayo");

    e.preventDefault();
    const email = document.getElementById("logemail").value;
    const password = document.getElementById("logpassword").value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener("click", logout);
// if (logOutBtn)
//   logOutBtn.addEventListener("click", (e) => {
//     console.log("logged");
//   });
