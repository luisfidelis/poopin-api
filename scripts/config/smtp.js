module.exports =  {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: process.env.SMTPMAIL,
        pass: process.env.SMTPPASS
    }
};