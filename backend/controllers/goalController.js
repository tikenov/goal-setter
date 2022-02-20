const asyncHandler = require('express-async-handler')

// @desc    get goals
// @route   GET /api/goals
// @access  private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get goals' })
})

// @desc    set goals
// @route   POST /api/goals
// @access  private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field');
  }
  res.status(200).json({ message: 'Set goals' })
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  private
const updateGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Update goal id: ${id}` })
})

// @desc    delete goal
// @route   DELETE /api/goals/:id
// @access  private
const deleteGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Delete goal id: ${id}` })
})

module.exports = {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
}