// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";

export const testTest = async (name) => {
  // let testEmailAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: "gmail",
    auth: {
      user: "nik.test.test.nik1@gmail.com",
      pass: "nik-test-test-nik1",
      // user: testEmailAccount.user,
      // pass: testEmailAccount.pass,
    },
  });

  let result = await transporter.sendMail({
    from: '"Node js" <nik.test.test.nik1@gmail.com>',
    to: "koballucijan@cudimex.com, koballucijan@cudimex.com",
    subject: `hi ${name}`,
    text: "This message was sent from Node js server.",
    html: "This <i>message</i> was sent from <strong>Node js</strong> server.",
  });
  // console.log(result);
  return { result: result };

  // let transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: "youremail@gmail.com",
  //     pass: "yourpassword",
  //   },
  // });
};
// nik-test-test-nik1
// nik.test.test.nik1@gmail.com
// module.exports = testTest();
// export default testTest();
