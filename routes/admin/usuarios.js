const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = { dest: './public/tmp'};
const upload = multer(config);
const {editUsuario}  = require('./../../services/usuarios');
const {getSingleUsuario,altaUser,getAllUsuarios} = require('./../../models/usuarios');
const {getAllNoticiasUsuario} = require('./../../models/noticias');
const {getAllSecciones} = require('./../../models/secciones');


const getMenuUser = async (req, res)=>{
      const id= req.session.user;
      const usuarios = await  getAllUsuarios();
      const [usuario] = await getSingleUsuario(id);
      const noticias = await  getAllNoticiasUsuario(id);
      const secciones = await getAllSecciones();
      res.render('usuario',{usuario,noticias,id,secciones,usuarios});
}


const getEditarUsuario = async (req, res)=>{
  const id= req.session.user;
    const [usuario] = await getSingleUsuario(id);
  res.render('editarUsuario', {usuario});
}

const upDateUsuario = async (req, res) =>{
  const id= req.session.user;
  const usuarioEditRespuesta = await editUsuario(req.body,req.file,id);
  const [usuario] = await getSingleUsuario(id);
  const message ="Edición realizada";
  res.render('editarUsuario', {usuario,message});
}

const altaUsuario  = async (req, res) =>{
    const {uid} = req.params;
    const messageId = await altaUser(uid);
    res.redirect('/usuario');
}

const adios  = async (req, res) =>{
  req.session.user = null;
  res.redirect('/login');
}

router.get('/', getMenuUser);
router.get('/editar',getEditarUsuario);
router.post('/editar', upload.single("imagen") ,upDateUsuario);
router.get('/verify/:uid', altaUsuario);
router.get('/adios', adios);

module.exports = router;