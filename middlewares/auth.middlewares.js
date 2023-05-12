function isLoggedIn(req,res,next)
{
    if(req.session.user===undefined)
    {
        res.redirect("/auth/login")

    }
    else{
        next()
    }
}

function isUser(req,res,next)
{
    if(req.session.user.role==="user")
    {
        next()
    }
    else 
    {
        res.redirect("/admin/index-admin")
    }
}

function isAdmin(req,res,next)
{
    if(req.session.user===undefined)
    {
        res.redirect("/auth/login")

    }
     else if(req.session.user.role==="admin")
    {
        next()
    }
    else 
    {
        res.redirect("/")
    }
}
module.exports={isLoggedIn,isUser,isAdmin}