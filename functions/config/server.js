'use strict';
const cors = require("cors")({origin: true});
const express = require("express");
const app = express();
app.use(cors);

module.exports = app;
