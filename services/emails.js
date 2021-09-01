const nodemailer = require( 'nodemailer' );

let transporter = nodemailer.createTransport({
    host: 'cpanel.agamenon.yoursitesecure.net',
    port: '587',
    auth :{ 
      user: 'daniel@got-it.tv',
      pass: 'da6al9se3ri8'
    }
});

exports. sendMail = ( options ) => {
  let mailOptions = {
    from : 'daniel@got-it.tv',
    to : 'ingm.daniel.serrano@gmail.com',
    subject : 'Prueba Email desde aplicación',
    text : 'Texto de prueba',
  }
    transporter.sendMail(mailOptions  , ( error, info ) => {
      if ( !error ){
        console.log( {info} );
      }
      console.log( {error} );
  } );
}
