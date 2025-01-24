
const express = require("express")
const eyelashController = require("../controllers/eyelash-controller")
const eyelashesRouter = express.Router()

eyelashesRouter.get("/", eyelashController.index)
eyelashesRouter.get("/:id", eyelashController.readOne)

module.exports = eyelashesRouter