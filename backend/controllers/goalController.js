const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    get goals
// @route   GET /api/goals
// @access  private
const getGoals = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(400)
    throw new Error('Unauthorized');
  }
  const goals = await Goal.find({ user: req.user.id })
  res.status(200).json(goals)
})

// @desc    set goals
// @route   POST /api/goals
// @access  private
const setGoals = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(400)
    throw new Error('Unauthorized');
  }
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field');
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: user.id
  });
  res.status(200).json(goal)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  private
const updateGoal = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(400)
    throw new Error('Unauthorized');
  }
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
  if (goal.user.toString() !== user.id) {
    res.status(400)
    throw new Error('Unauthorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedGoal)
})

// @desc    delete goal
// @route   DELETE /api/goals/:id
// @access  private
const deleteGoal = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(400)
    throw new Error('Unauthorized');
  }
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
  if (goal.user.toString() !== user.id) {
    res.status(400)
    throw new Error('Unauthorized');
  }
  await goal.remove()
  res.status(200).json({ message: `Delete goal id: ${req.params.id}` })
})

module.exports = {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
}