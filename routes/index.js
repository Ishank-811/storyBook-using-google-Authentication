const express = require("express");
const router = express.Router();
const Story = require("../models/story");
const { ensureGuest, ensureAuth } = require("../middleware/auth");

const app = express();
router.get("/", ensureGuest, (req, res) => {
  res.render("main.ejs");

});

router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id });
    // console.log(stories);
    res.render("dashboard.ejs", {
      name: req.user.FirstName,
      stories: stories,
    });

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
