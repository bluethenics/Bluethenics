const nodemailer = require('nodemailer');

// Setup mail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password'
  }
});

// Send email function
function sendEmail(customerEmail, customerName, amount) {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: customerEmail,
    subject: 'Payment Confirmation',
    text: `Hello ${customerName},\n\nThank you for your payment of ₹${amount}.\n\nBest Regards,\nYour Company`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// Call sendEmail() after verifying payment


function adjustLayout() {
  const width = window.innerWidth;

  if (width < 600) {
    // Mobile view adjustments
    document.getElementById('container9').style.width = '100%';
  } else if (width >= 600 && width < 1024) {
    // Tablet view adjustments
    document.getElementById('container9').style.width = '80%';
  } else {
    // Laptop/Desktop view adjustments
    document.getElementById('container9').style.width = '60%';
  }
}

// Run on page load
adjustLayout();

// Add an event listener to run the function when the window is resized
window.addEventListener('resize', adjustLayout);

