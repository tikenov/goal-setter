const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const protect = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers
  let token

  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1]
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error("Not Authorized")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not Authorized, no token")
  }
})

module.exports = { protect }