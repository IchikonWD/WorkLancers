async function isLogguedIn(req, res, next) {
  //  console.log(req.user); // De aqui podemos sacar foto y demas cosas para el profile
  try {
    if(req.user.rows != undefined) {
      let emailLocal = await req.user.rows[0].email
      await res.cookie('email', emailLocal)
      req.user ? next() : res.sendStatus(401);
    }
    else if(req.user._json != undefined){
      let emailGoogle = await req.user._json.email
      await res.cookie('email', emailGoogle)
      req.user ? next() : res.sendStatus(401);
    }else{
      res.status(400).send('Debes loguearte primero');
    }
  } catch (error) {
    res.status(401).send({ message: 'Debes loguearte primero' })
  }
}

module.exports = isLogguedIn;