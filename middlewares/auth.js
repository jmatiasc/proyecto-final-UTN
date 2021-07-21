const {schemas} = require ("./schemas/login");

const validateLogin = (req, res, next) => {
    const {error, value} = schemas.login.validate(req.body);
    if(error){
        const message = error.details[0].message;
        res.render('login', {message});
    }
    else {
        next();
    }   
}



const verifyUser = (req, res, next) => {
    if(req.session.user ){
        next();
    }
    else{
        res.render('login');
    }
}

const verifyAdmin = (req, res, next) => {
    if(req.session.admin == "1"){
        next();
    }
    else{
        if(req.session.id){
            res.render('error');
        }
        else
       { res.render('login');}
    }
}





module.exports = { verifyAdmin,verifyUser,validateLogin}