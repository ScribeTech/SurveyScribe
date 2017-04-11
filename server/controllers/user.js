const User = require('../models/user.js');
const controller = require('express').Router();

controller.route('/')
  .get((request, response, next) => {})
  .post((request, response, next) => {});

controller.route('/:id')
  .get((request, response, next) => {})
  .put((request, response, next) => {})
  .delete((request, response, next) => {});

module.exports = controller;
