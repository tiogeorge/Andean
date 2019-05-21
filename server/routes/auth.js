
const jwt = require('jsonwebtoken');
const auth = {};
const JWT_KEY_PUBLIC = 'FGKFHOGFJHFJGN55FGH65H465GH4G';
const JWT_KEY_PRIVATE = '455thgkfdktrjkgldfpktklgklgtrklgktk htkgnjtgnrkgngjkgmtkhnythytt4g6rt4hymjgkgñltrmhjktnmk';
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
auth.generarTokenPrivado = (iduser)=>{
    console.log("generando token privado");
    const token = jwt.sign(
        {
          userId: iduser
        },
        JWT_KEY_PRIVATE,
        {
            expiresIn: "24h"
        }
      );
    return token;
}
auth.verificarTokenPublico = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_KEY_PUBLIC);
        req.userData = decoded;
        next();
    }catch(err){
        return res.status(401).json({
            message: 'Error 401 unauthorized'
        });
    }
}
auth.verificarTokenPrivado = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_KEY_PRIVATE);
        req.userData = decoded;
        next();
    }catch(err){
        return res.status(401).json({
            error:401,
            message: 'unauthorized request'
        });
    }
}
module.exports = auth;