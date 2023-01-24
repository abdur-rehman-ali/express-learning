import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from "../models/user.js"

class UsersController {
  static userRegistration = async (req, res) => {
    const { name, email, password, password_confirmation, termsAndConditions } = req.body
    const user = await User.findOne({ email: email })
    if (user) {
      res.send({ status: "failed", message: "User with this email already exists!!!" })
    }
    else {
      if (name && email && password && password_confirmation && termsAndConditions) {
        if (password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const userData = new User({ name, email, password: hashPassword, termsAndConditions })
            await userData.save()
            const savedUser = User.find({ email })
            const payload = { userID: savedUser._id }
            const options = { expiresIn: '1d' }
            const token = jwt.sign(payload, process.env.SECRET_KEY, options)
            res.status(201).send({ status: "success", message: "Registration Successfull!!!", token: token })
          } catch (error) {
            res.send({ status: "failed", message: error.message })
          }
        } else {
          res.send({ status: "failed", message: "Password didn't match!!!" })
        }
      } else {
        res.send({ status: "failed", message: "All fields are required!!!" })
      }
    }

  }

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body
      if (email && password) {
        const user = await User.findOne({ email })
        if (user) {
          const isPasswordMatch = await bcrypt.compare(password, user.password)
          const isEmailMatch = (user.email === email)
          if (isEmailMatch && isPasswordMatch) {
            const payload = { userID: user._id }
            const options = { expiresIn: '1d' }
            const token = await jwt.sign(payload, process.env.SECRET_KEY, options)
            res.send({ status: "Success", message: "Login Successfull", token: token })
          } else {
            res.send({ status: "failed", message: "Email or password in invalid!!!" })
          }
        } else {
          res.send({ status: "failed", message: "You are not registered user!!!" })
        }
      } else {
        res.send({ status: "failed", message: "All fields are required!!!" })
      }
    } catch (error) {
      res.send({ status: "failed", message: "Unable to login" })
    }
  }

  static changePassword = async (req, res) => {
    try {
      const { password, password_confirmation } = req.body
      if (password && password_confirmation) {
        if (password === password_confirmation) {
          const { _id } = req.user
          const salt = await bcrypt.genSalt(10)
          const hashPassword = await bcrypt.hash(password, salt)
          await User.findByIdAndUpdate(_id, { password: hashPassword })
          res.send({ status: "success", message: "Password updated successfully" })
        } else {
          res.send({ status: "failed", message: "Password and Password confirmation didn't match!!!" })
        }
      } else {
        res.send({ status: "failed", message: "Both fields are required" })
      }
    } catch (error) {
      res.send({ status: "failed", message: error.message })
    }
  }

  static currentUser = async (req, res) => {
    try {
      res.send({ user: req.user })
    } catch (error) {
      res.send({ status: "failed", message: error.message })
    }
  }
}

export default UsersController