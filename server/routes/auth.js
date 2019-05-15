
const jwt = require('jsonwebtoken');
const auth = {};
const JWT_KEY_PUBLIC = 'FGKFHOGFJHFJGN55FGH65H465GH4G';

auth.generarTokenPublico = ( req,res,next)=>{
    console.log("generando token");
    const token = jwt.sign(
        {
          userId: 'general'
        },
        JWT_KEY_PUBLIC,
        {
            expiresIn: "24h"
        }
      );
      res.status(200).json({
        message: "Auth successful",
        token: token
      });
}
auth.verificarTokenPublico = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_KEY_PUBLIC);
        req.userData = decoded;
        next();
    }catch(err){
        return res.status(401).json({
            mensaje: 'Autorizacion fallida'
        });
    }
}
module.exports = auth;