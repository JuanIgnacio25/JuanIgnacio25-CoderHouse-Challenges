const checkLogin = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.redirect("/login")
}

const isLoged = (req,res,next) => {
  if(!(req.isAuthenticated())) next();
  else res.redirect('/api/products');
}

/**const checkLogin = (req, res, next) => {
  if (req.session.passport) next()
  else res.redirect('/login');
}**/

/**const isLoged = (req, res, next) => {
  if (!(req.session.passport)) next()
  else res.redirect('/api/products');
}**/
module.exports = { checkLogin, isLoged }