const  moment= require('moment');
const jwt = require('jsonwebtoken');
const auth = {};
const JWT_KEY_PUBLIC = 'FGKFHOGFJHFJGN55FGH65H465GH4G';
const JWT_KEY_REFRESH= 'FGKFHOGFJHFJGN55FGH65H465GH4RGJRJGFJGTIJREU EROIFJREIJERUIHREOIFJ REIH RGERG';
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
        token: token,
        expires_pt: moment().add(24,'hours').valueOf()
      });
}
auth.getExpirationToken = ()=>{
    return moment().add(8,'hours').valueOf();
}
auth.getExpirationRefreshToken = ()=>{
    return moment().add(7,'days').valueOf();
}
auth.generarTokenPrivado = (user)=>{
    console.log("generando token privado");
    const token = jwt.sign(user,JWT_KEY_PRIVATE,{expiresIn: "8h"});
    return token;
}
auth.generarRefreshToken = (user)=>{
    const refreshtoken = jwt.sign(user, JWT_KEY_REFRESH,{expiresIn:"7d"});
    return refreshtoken;
}
auth.verificarTokenPublico = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_KEY_PUBLIC);
        req.userData = decoded;
        console.log(decoded);
        next();
    }catch(err){
        try{
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, JWT_KEY_PRIVATE);
            req.userData = decoded;
            console.log(decoded);
            next();
        }catch(err){
            return res.status(401).json({
                error:401,
                message: 'unauthorized request'
            });
        }
    }
}
auth.generarNuevoTokenPrivado = (req,res,next)=>{
    try{
        const token = req.body.refresh_token;
        const decoded = jwt.verify(token, JWT_KEY_REFRESH);
        console.log("REFRESH TOKEN VALIDO");
        user={
            userId: decoded.userId,
            correo: decoded.correo           
        };
        console.log("ACTUALIZANDO NUEVO TOKEN DE SESION");
        const newtoken = jwt.sign(user,JWT_KEY_PRIVATE,{expiresIn: "8h"});
        
        return res.json({
            message:"REFRESH TOKEN VALIDO",
            newtoken: newtoken,
            exp_newtoken: moment().add(8,'hours').valueOf()
        });
    }catch(err){
        console.log("REFRESH TOKEN INVALIDO");
        return res.status(401).json({
            error:401,
            message: 'unauthorized request'
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