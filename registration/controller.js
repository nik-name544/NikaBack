// const { validationResult } = require("express-validator");
import { validationResult } from "express-validator";
import { addNew, delOne, getAll } from "../models/Date.js";
import User from "../models/User.js";
import { testTest } from "../sendMail/sendMail.js";
// const User = require("../models/User");
// const { testTest } = require("../sendMail/sendMail");
// const testTest = require("../sendMail/sendMail");

class registrationController {
  async addUser(req, res) {
    try {
      const { errors } = validationResult(req);
      if (!!errors[0]) {
        return res.status(400).json({ message: "smth not ok(reg)" });
      } else {
        // console.log(req.body, "req.body");
        const { name, phone, instagram, dateFrom, dateTo, comment, email } =
          req.body;
        const uesr = new User({ name, phone, instagram, comment, email });
        console.log(dateFrom, "dateFrom1");
        console.log(dateTo, "dateTo1");
        // await uesr.save().then((res) => console.log(res.name));
        await uesr
          .save()
          .then((res) => testTest(res.name))
          .then(() =>
            addNew(dateFrom, dateTo).then((chldRes) =>
              console.log(chldRes, "chldRes")
            )
          );

        return res.json({ message: `welcome ${name}` });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "smth not ok(reg)" });
    }
  }

  async getUsers(req, res) {
    try {
      const uesrs = await User.find();
      res.json(uesrs);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "smth not ok" });
    }
  }

  async delUser(req, res) {
    try {
      await User.deleteMany();
      return res.json({ message: "user was deleted" });
    } catch (e) {
      console.log(e);
    }
  }

  async test(req, res) {
    try {
      // delOne(req.body.id);
      // const message = "all ok";
      // return "all ok";
      // return message.toJSON();
      return res.json({ message: `all ok` });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteFromCalendar(req, res) {
    try {
      delOne(req.body.id);
      return res.json({
        message: `all ok user with id: ${req.body.id} was deleted`,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getAllFromCalendar(req, res) {
    try {
      let events = await getAll().then((res) => res.items);
      return res.json({
        message: `all ok`,
        items: events,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new registrationController();
// module.exports = new registrationController();
