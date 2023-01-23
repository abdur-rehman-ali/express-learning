import bcrypt from 'bcrypt'

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
            res.status(201).send({ status: "success", message: "Registration Successfull!!!" })
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
}

export default UsersController