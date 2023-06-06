const router = require("express").Router();
const { User } = require("../../models");
// api/user

// add in a new user
router.post("/", async (req, res) => {
  try {
    // create the new user with body
    const newUser = await User.create(req.body);

    // log in the user, save their session id, and return status code with json of new user
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(200).json(newUser);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// get user by id
router.get("/:id", async (req, res) => {
  try {
    // grab the user by id
    const atId = await User.findByPk(req.params.id);
    // if there is no user at the given id send error with code
    if (!atId) {
      res.status(500).json({ message: "No user at id." });
    }

    // send the user along with code
    res.status(200).json(atId);
  } catch (error) {
    res.status(500).json(error);
  }
});

// user logs in
router.post("/login", async (req, res) => {
  try {
    // find the user whose email matches the one from the request
    const userData = await User.findOne({ where: { email: req.body.email } });
    // if the email does not exist send error message and return
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // if the given email checks out, not check the password for validation
    const validPassword = await userData.checkPassword(req.body.password);
    // if the password is falsy send error message and return
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // log in the user, save their session id, and send message
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// logout user
router.post("/logout", (req, res) => {
  // if the user is logged in
  if (req.session.logged_in) {
    // destroy the session id and send 204 code
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // if the user is not logged in send 404
    res.status(404).end();
  }
});
module.exports = router;
