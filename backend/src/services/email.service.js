const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
const tenderService = require('./tender.service');
const userService = require('./user.service');
const {Offer} = require('../models');

const gmailSMTPHost = 'smtp.gmail.com';
const testSMTPPort = 587;
const testSMTPUsername = 'programiranjefoto@gmail.com';
const testSMTPPassword = 'mvpx vtoo npxv ctpk';

const transport = nodemailer.createTransport({
  host: gmailSMTPHost,
  port: testSMTPPort,
  auth: {
    user: testSMTPUsername,
    pass: testSMTPPassword
  },
});

/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = {from: config.email.from, to, subject, text};

  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://localhost/reset-password?token=${token}`;
  const text = `Dear admin,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://localhost/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

const sendWinningOfferEmail = async (offer) => {
  try {
    console.log('email service, offer: ', offer);
    const winningTender = await tenderService.getTenderById(offer.tender);

    const winnerUser = await userService.getUserById(offer.createdBy);

    const tenderDeadline = new Date(winningTender.deadline);
    const formattedDeadline = tenderDeadline.toISOString().split('T')[0];
    const emailSubject = 'Congratulations! You have won the Tender';
    const emailText = '\n' +
      `Dear ${winnerUser.firstName},\n` +
      '\n' +
      'We are pleased to inform you that your proposal has been selected as the winning bid for the following tender:\n' +
      '\n' +
      `Tender Title: ${winningTender.title}\n` +
      `Tender Description: ${winningTender.description}\n` +
      `Tender Criteria: ${winningTender.criteria}\n` +
      `Tender Weightage: ${winningTender.weightage}\n` +
      `Tender Deadline: ${formattedDeadline}\n` +
      '\n' +

      `Offered Amount: $${offer.offer}\n` +
      '\n' +
      'Your exceptional submission has set you apart from other vendors, and we believe that your expertise will greatly contribute to the success of this project.\n' +
      '\n' +
      'To proceed with the tender and officially secure your position, we kindly ask you to complete the payment as per the tender terms and conditions. Once the payment is confirmed, we will initiate the necessary steps to finalize the agreement and project details.\n' +
      '\n' +
      'Please follow the payment instructions provided in the tender documentation or get in touch with our support team if you have any questions or need assistance. The completion of the payment is essential to move forward with the tender process.\n' +
      '\n' +
      'We congratulate you once again on your successful bid and look forward to working together. Thank you for your commitment and dedication.\n' +
      '\n' +
      'Best regards,\n' +
      '\n' +
      'Tender Pro Team'
    await sendEmail(winnerUser.email, emailSubject, emailText);

  } catch (error) {
    console.log('Error occurred while sending email!!!', error);
  }
}

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendWinningOfferEmail
};

