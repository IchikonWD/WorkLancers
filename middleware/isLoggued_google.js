function isLogguedIn(req,res, next) {
  //  console.log(req.user); // De aqui podemos sacar foto y demas cosas para el profile
    req.user ? next(): res.sendStatus(401); 
} 

module.exports = isLogguedIn;