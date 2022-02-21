// @desc    get user info
// @route   GET /api/users/me
// @access  private
const getMe = (req, res) => {
  res.status(200).json({ text: "ok" })
}

// @desc    login user
// @route   POST /api/users/login
// @access  public
const loginUser = (req, res) => {
  res.status(200).json({ text: "ok" })
}

// @desc    register user
// @route   POST /api/users
// @access  public
const registerUser = (req, res) => {
  res.status(200).json({ text: "ok" })
}


module.exports = {
  loginUser,
  registerUser,
  getMe
}