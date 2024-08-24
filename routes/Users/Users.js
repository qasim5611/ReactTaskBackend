// const nodemailer = require("nodemailer");

const UserModel = require("../../Models/user.Model");

const Users = {
  // import sendEmail from "./../../services/EmailSender/sendmail";
  addUser: async function (req, res) {
    try {
      console.log(req.body);
      let {
        firstName,
        lastName,
        email,
        phone,
        age,
        dob,
        cnic,
        hobby,
        profession,
      } = req.body;
      let image;

      if (req.file) image = req.file.filename;

      let existingUser = await UserModel.findOne({ email: email });
      if (existingUser) {
        return res.send({
          msg: "Email already exists",
          status: 400,
        });
      }
      // The data is valid and new we can register the user
      let newUser = new UserModel({
        firstname: firstName,
        lastname: lastName,
        email,
        phone,
        age,
        dob,
        cnic,
        hobby,
        profession,

        image,
      });

      let result = await newUser.save();

      console.log("result", result);

      return res.send({
        msg: "User Added Successfully",
        result,
      });
    } catch (err) {
      console.error("Error saving user:", err);
      return res.status(err.status || 500).send(err.message);
    }
  },

  getUser: async function (req, res) {
    try {
      console.log(req.body);
      const user = await UserModel.find();

      // return res.json(user);
      return res.send({
        msg: "Find Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteUserByid: async function (req, res) {
    console.log("req", req.body);
    console.log("req", req.body.id);

    let isfind = await UserModel.findById(req.body.id);

    if (isfind) {
      await UserModel.deleteOne({ _id: req.body.id });
      return res.send({
        msg: "Deleted Successfully",
      });
    } else {
      throw new Error("Service not Found");
    }
  },

  updateUser: async function (req, res) {
    console.log(req.body.idtoUpdate);
    let data = Object.assign({}, req.body);
    let user_id = req.body.idtoUpdate;
    let image;
    if (req.file) {
      image = req.file.filename;
      data.image = image;
    }

    let isupdate = await UserModel.findOneAndUpdate({ _id: user_id }, data, {
      isNew: true,
    });

    if (isupdate) {
      return res.send({
        msg: "User Updated Successfully",
        isupdate,
      });
    }

    return res.json("Successfuly Updated");
  },

  getUserByid: async function (req, res) {
    try {
      console.log("req", req.query.id);

      const user = await UserModel.find().where("_id").equals(req.query.id);

      return res.send({
        msg: "Find Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = Users;
