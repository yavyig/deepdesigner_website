const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("main/home", {
        title: "Ana Sayfa",
    });
});

router.get("/about", (req, res) => {
    res.render("main/about", {
        title: "Hakkımda",
    });
});

module.exports = router;