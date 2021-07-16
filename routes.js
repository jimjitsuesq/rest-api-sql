'use strict';

const express = require('express');
const { asyncHandler } = require('./middleware/async-handler');
const { User, Course } = require('./models');
const { authenticateUser } = require('./middleware/auth-user');

// Construct a router instance.
const router = express.Router();

/**
 * Route to return the currently authenticated user
 */
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;

    res.status(200).json({user})
    
}));
  
/**
 * Route to create a new user
 */
router.post('/users', asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.status(201).json({ "message": "Account successfully created!" });
      res.location('/');
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });   
      } else {
        throw error;
      }
    }
}));

/**
 * Route to return all courses and the users associated with each course
 */
router.get('/courses', asyncHandler(async (req, res) => {
  let courses = await Course.findAll();

  res.status(200).json({courses})
  
}));

/**
 * Route to return the course associated with a given id
 */
router.get('/courses/:id', asyncHandler(async (req, res) => {
  let course = await Course.findByPk(req.params.id);

  res.status(200).json({course})
  
}));

/**
 * Route to create a new course
 */
router.post('/courses', authenticateUser, asyncHandler(async (req, res, next) => {
  try {
    let course = await Course.create(req.body);
    res.status(201).location(`api/courses/${course.id}`).end()
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));

/**
 * Route to modify an existing course
 */
 router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res, next) => {
  try {
    const course = req.body;
    await Course.update(course, { where: { id: req.params.id } } );
    res.status(204).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
  
}));

/**
 * Route to delete an existing course
 */
 router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res, next) => {
  let course = await Course.findByPk(req.params.id);
  course.destroy();
  res.status(204).end()
}));

module.exports = router;