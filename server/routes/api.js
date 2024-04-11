const express = require("express");
const router = express.Router();
const propertyController = require("../controller/propertyController.js");

//Get Route for all properties base on date
router.get("/properties/default", propertyController.sortByDate, (req, res) => {

    return res.status(200).json(res.locals.storage)
})
//Additional Info
router.get("/properties/additionalInfo/:mls", propertyController.additionalInfo, (req, res) => {
    return res.status(200).json(res.locals.additional)
})

//Update votes 
router.patch("/properties/upvoteOrDownvote/:mls", propertyController.upOrDownVote, (req, res) => {
    return res.status(200).json(res.locals.scores)
})

module.exports = router;