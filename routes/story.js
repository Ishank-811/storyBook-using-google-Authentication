const express = require("express");
const router = express.Router();
const Story = require("../models/story");
const { ensureAuth } = require("../middleware/auth");
const mongoose = require("mongoose"); 
const app = express();


router.get("/add", ensureAuth, (req, res) => {
  res.render("stories/add");
});
router.get("/public", async (req, res) => {
  const stories = await Story.find({ status: "public" })
    .populate("user")
    .sort({ CreatedAt: "desc" });

  res.render("stories/index.ejs", {
    stories: stories,
    user: req.user.id,
  });
});



router.post("/", ensureAuth, async (req, res) => {
  const newstory = new Story({
    title: req.body.title,
    status: req.body.status,
    body: req.body.body,
    user: req.user.id,
  });

  try {
    const newBook = await newstory.save();
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
  }
});
router.get("/:id", async (req, res) => {
  let newbook;

  try {
    
    let newbook = await Story.findById(req.params.id);
    res.render("stories/edit", {
      book: newbook,
    });
  } catch (error) {
    res.send(`hello user ${req.params.id}`);
  }
 
});

router.get("/show/:id", ensureAuth, async(req,res)=>{

  const showing =  await Story.findById(req.params.id).populate("user").lean();

  res.render("stories/show.ejs" ,{
    name: req.user.FirstName,
    stories:showing,
    user: req.user.id,
  })
 


})

router.put("/:id", async (req, res) => {
  let newbook;
  try {
    newbook = await Story.findById(req.params.id);
    (newbook.title = req.body.title),
      (newbook.body = req.body.body),
      (newbook.status = req.body.status);
    
    await newbook.save();
    res.redirect(`/stories/public`);
  } catch (err) {
    console.error(err);
    if (newbook == null) {
      res.redirect("/");
    } else {
      res.render("stories/edit", {
        book: book,
      });
    }
  }
});

router.delete("/:id", async (req, res) => {
  let book;
  try {
    console.log(req.params.id);
    book = await Story.findById(req.params.id);
    console.log(book);
    await book.remove();
    res.redirect(`/stories/public`);
  } catch (error) {
    console.log(error);
    if (book == null) {
      res.redirect("/");
    } else {
      res.redirect(`/stories/public`);
    }
  }
});



module.exports = router;
