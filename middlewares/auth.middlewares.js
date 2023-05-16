function isLoggedIn(req, res, next) {
  if (req.session.user === undefined) {
    res.redirect("/auth/login");
  } else {
    next();
  }
}

function isUser(req, res, next) {
  if (req.session.user.role === "user") {
    next();
  } else {
    res.redirect("/admin/index-admin");
  }
}

function isAdmin(req, res, next) {
  if (req.session.user === undefined) {
    res.redirect("/auth/login");
  } else if (req.session.user.role === "admin") {
    next();
  } else {
    res.redirect("/");
  }
}

//para ocultar/ver la barra de navegacion del usuario o del admin
function updateLocals(req, res, next) {
  //crea una variable local para usar en el handlebars
  if (req.session.user !== undefined) {
    if (req.session.user.role === "admin") {
      res.locals.isAdminActive = true;
    } else if (req.session.user.role === "user") {
      res.locals.isUserActive = true;
    }
  }

  next();
}

module.exports = { isLoggedIn, isUser, isAdmin, updateLocals };
