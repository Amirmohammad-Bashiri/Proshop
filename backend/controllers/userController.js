import asyncHandler from "express-async-handler"
import User from "../models/User.js"
import generateToken from "../utils/generateToken.js"

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    res.status(404)
    throw new Error(`No user found with email of ${email}`)
  }

  const token = generateToken(user._id)

  const isMatch = await user.matchPassword(password)

  if (user && isMatch) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    })
  } else {
    res.status(401)
    throw new Error("invalid email or password")
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})
