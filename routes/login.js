const express = require('express');
const router = express.Router();
const {loguear,getAllUsuarios} = require('./../models/usuarios');
const {getAllNoticiasUsuario} = require('./../models/noticias');
const {getAllSecciones} = require('./../models/secciones');
const sha1 = require('sha1');
const {validateLogin} = require('./../middlewares/auth');

const showLogin = (req, res) => res.render('login', {message : ''});

const login = async (req, res) => {
    let {email, pass} = req.body;
    pass = sha1(pass);
    const [usuario] = await loguear(email, pass);
    if (usuario == null) {
        res.render('login', {message: 'Usuario o pass incorrectos'});
    }
    else {
        const id  = usuario.id;
        req.session.user = id;
        req.session.admin = usuario.admin;
        req.session.hab = usuario.habilitado;
        const noticias = await  getAllNoticiasUsuario(id);
        const secciones = await getAllSecciones();
        const usuarios = await  getAllUsuarios();
      res.render('usuario',{usuario,noticias,id,secciones,usuarios});

    }
}

router.get('/', showLogin);
router.post('/', validateLogin, login);
module.exports = router;