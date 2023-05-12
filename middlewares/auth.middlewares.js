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

function isAdmin(req,res,next)
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

module.exports={isLoggedIn,isAdmin}