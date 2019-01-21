const nodemailer = require('nodemailer');

module.exports = (formulario) => {
    var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'zapata.gabriel.avi', // Cambialo por tu email
        pass: '' // Cambialo por tu password
    }
    });
    const mailOptions = {
        from: `”${formulario.nombre} 👻” <${formulario.email}>`,
        to: formulario.email, // Cambia esta parte por el destinatario
        subject: formulario.asunto,
        html: `
        <strong>Nombre:</strong> ${formulario.nombre} <br/>
        <strong>E-mail:</strong> ${formulario.email} <br/>
        <strong>Mensaje:</strong> ${formulario.mensaje}
        `
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.error(err)
        else
            console.log(info);
    });
}