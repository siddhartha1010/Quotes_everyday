import "@babel/polyfill";
import {
  login,
  logout,
  signup,
  sendEmail,
  stopEmail,
  DeleteUser,
} from "./login";

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
const signupBtn = document.querySelector(".modal__form__login");
const sendEmailBtn = document.querySelector(".button-sending");
const stopEmailBtn = document.querySelector(".button-primary");
const deleteUserBtn = document.querySelector(".button-secondary");

if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    console.log("yo click vayo");

    e.preventDefault();
    const email = document.getElementById("logemail").value;
    const password = document.getElementById("logpassword").value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener("click", logout);
if (sendEmailBtn) sendEmailBtn.addEventListener("click", sendEmail);
if (stopEmailBtn) stopEmailBtn.addEventListener("click", stopEmail);
if (deleteUserBtn) deleteUserBtn.addEventListener("click", DeleteUser);

if (signupBtn)
  signupBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("reg_name").value;
    const email = document.getElementById("reg_email").value;
    const password = document.getElementById("reg_password").value;
    const passwordConfirm = document.getElementById(
      "reg_passwordConfirm"
    ).value;
    signup(name, email, password, passwordConfirm);
  });
