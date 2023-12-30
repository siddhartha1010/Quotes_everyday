const login = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:4000/api/v1/users/login",
      data: {
        email,
        password,
      },
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

document.querySelector(".modal__form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("logemail").value;
  const password = document.getElementById("logpassword").value;
  login(email, password);
});
