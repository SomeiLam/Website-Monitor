const request = require('request');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();
const { checkingTime, websiteList } = require('./constants.js');

const writeCurrentContent = (currentContent, fileName) => {
  fs.writeFile(`./history/${fileName}`, currentContent, 'utf8', (error) => {
    if (error) {
      // Handle any error while writing the file
      console.error('Error writing current content:', error);
    } else {
      console.log('Previous content updated successfully!');
    };
  });
};

const readContent = (fileName) => {
  try {
    const previousContent = fs.readFileSync(`./history/${fileName}`, 'utf8');
    return previousContent;
  } catch (error) {
    // Handle any error while reading the file
    console.error('Error reading previous content:', error);
    return ''; // Return an empty string if no previous content found or an error occurred
  };
};

// Email configuration
const senderEmail = process.env.SENDER_EMAIL;
const receiverEmail = process.env.RECEIVER_EMAIL;
const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};

// Send email function
const sendEmail = (subject, body) => {
  const transporter = nodemailer.createTransport(smtpConfig);

  const mailOptions = {
    from: senderEmail,
    to: receiverEmail,
    subject: subject,
    text: body
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    };
  });
};

const requestData = () => {
  const now = new Date();
  console.log('---------------------------------')
  console.log('Checking at', now.toLocaleString(),);
  // Retrieve the current content from the website
  websiteList.forEach(website => {
    request(website.url, function (error, response, html) {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        const currentContent = $(website.selector).text();
        // Compare current and previous content
        const previous = readContent(`${website.id}.txt`);
        if (currentContent !== previous) {
          console.log(`Update is found on ${website.name}`);
          // Send email notification
          const subject = 'Website Update Notification';
          const body = `The website ${website.url} has been updated. Visit it now!`;
          sendEmail(subject, body);

          // Store the current content for future comparison
          writeCurrentContent(currentContent, `${website.id}.txt`);
        } else {
          console.log(`Update is not found on ${website.name}`);
        };
      } else {
        console.error('Error retrieving website content:', error);
      };
    });
  });
};

requestData();
setInterval(() => {
  requestData();
}, [checkingTime]);
