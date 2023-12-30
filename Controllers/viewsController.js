exports.getOverview = (req, res) => {
  res.status(200).render("overview");
};

exports.main = (req, res) => {
  res.status(200).render("base");
};

exports.register = (req, res) => {
  res.status(200).render("register");
};
