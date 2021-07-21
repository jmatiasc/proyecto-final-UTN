const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = { dest: './public/tmp'};
const upload = multer(config);
const {addUsuario}  = require('./../../services/usuarios');
const {getAllUsuarios, habilitarDeshabilitarUsuario} = require('./../../models/usuarios');
const {validateCreacionUsuario} = require('./../../middlewares/usuario');



const getMenuAdmin = async (req, res)=>{
      const usuarios = await  getAllUsuarios();
      res.render('administrador',{usuarios});
}


const getCrearUsuario = async (req, res)=>{
  res.render('crearUsuario');
}

const crearUsuario = async (req, res) =>{
  const message = validateCreacionUsuario(req,res);
  if(message){
    res.render('crearUsuario',{message});
  }
  else{
  const usuario = await addUsuario(req.body,req.file);

  res.redirect('/usuario');}
}

const habilitar = async (req, res) =>{
  const {id} = req.params;
  const usuario = await habilitarDeshabilitarUsuario(id,1);
  res.redirect('/administrador');
}

const deshabilitar = async (req, res) =>{
  const {id} = req.params;
  const usuario = await habilitarDeshabilitarUsuario(id,0);
  res.redirect('/administrador');
}


router.get('/', getMenuAdmin);
router.get('/create',getCrearUsuario);
router.post('/create', upload.single("imagen"), crearUsuario);
router.get('/habilitar/:id', habilitar);
router.get('/deshabilitar/:id', deshabilitar);



module.exports = router;