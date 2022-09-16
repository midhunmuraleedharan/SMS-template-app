import { userSchema } from "../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { requires } from "consolidate";
export async function signUp(req, res) {
  userSchema.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
     return res.status(400).json({
        message: "User already exsist",
      });
    } else {
      const { firstName, lastName, email, password } = req.body;

      const hash_password = bcrypt.hashSync(password, 10);

      const _user = new userSchema({
        firstName,
        lastName,
        email,
        hash_password,
        username: Math.random().toString(),
      });
      _user.save((err, data) => {
        if (data) {
        return res.status(200).json({ message: "User created successfully" });
        } else if (err) {
         return res.status(200).json({ message: "Please contact support" });
        }
      });
    }
  });
}

export async function signIn(req, res) { 
  userSchema.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword) {
        const token = jwt.sign({ _id: user._id,role:user.role }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
         res.status(200).json({
          token: token,
         });
      } else {
         res.status(400).json({
          message: "invalid user",
        });
      }
    } else {
       res.status(400).json({ message: "Something went wrong" });
    }
  });
}


