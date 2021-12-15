require('dotenv').config()
const nodemailer = require('nodemailer')

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: EMAIL_USER, // generated ethereal user
    pass: EMAIL_PASSWORD, // generated ethereal password
  },
})
exports.handler = async (event, context, cb) => {
  const method = event.httpMethod
  if (method !== 'POST') {
    return {
      statusCode: 405,
      body: 'Only "POST" requests allowed',
    }
  }
  const { name, email, subject, message } = JSON.parse(event.body)
  if (!name || !email || !subject || !message) {
    return {
      statusCode: 400,
      body: 'Please Provide All Values',
    }
  }

  const data = {
    from: 'Christopher Ak <cm.akoto@yahoo.com>',
    to: `${name} <${email}>`,
    subject: subject,
    html: `<p>${message}<p>`,
  }
  try {
    await transporter.sendMail({ ...data })
    return {
      statusCode: 200,
      body: 'success',
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: error.message,
    }
  }
}
