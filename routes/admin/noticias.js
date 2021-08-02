const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = { dest: './public/tmp'};
const upload = multer(config);
const {addImagen}  = require('./../../services/imagenes');
const {getSigleNoticia,getAllNoticiasUsuario, habilitarDeshabilitarNoticia} = require('./../../models/noticias');
const {getAllSecciones} = require('./../../models/secciones');
const { addNoticia, editNoticia } = require('../../services/noticias');
const {getSingleUsuario,} = require('../../models/usuarios');
const {validateCreacionNoticia} = require('./../../middlewares/noticia');


const crearNoticiaView = async (req, res)=>{
  const id= req.session.user;
  //const {id} = req.params;
      const secciones = await getAllSecciones();
      res.render('crearNoticia',{id,secciones});
}


const createNoticia = async (req, res)=>{
    const id= req.session.user;
    //const {id} = req.params;
    
    const message = validateCreacionNoticia(req,res);
   if (message){
     res.render('crearNoticia',{message});
   }
   else{
    const secciones = await getAllSecciones();
    const id_noticia = await addNoticia(req.body, req.file, id);
    const [usuario] = await getSingleUsuario(id);
    const noticias = await  getAllNoticiasUsuario(id);
    res.render('usuario',{usuario,noticias,id,secciones});
  }
}

const editarNoticiaView = async (req, res) =>{
  // const id= req.session.user;
  const {id} = req.params;
  const [noticia ]= await getSigleNoticia(id);
  const secciones = await getAllSecciones();
  res.render('editarNoticia',{noticia,secciones});
}


const editarNoticia = async (req, res) =>{
    // const id= req.session.user;
    const {id} = req.params;
    const id_noticia = await editNoticia(req.body, req.file, id);
    const [noticia]= await getSigleNoticia(id);
    const secciones = await getAllSecciones();
    const message = 'Edición de la noticia exitosa'
    res.render('editarNoticia',{noticia,secciones,message});
  }

  const agregarImagenView = async (req, res) =>{
    const {id} = req.params;
    const [noticia] = await getSigleNoticia(id);
    res.render('agregarImagen',{noticia});
  }


  const agregarImagen = async (req, res) =>{
   const {id} = req.params;
    const ret = await addImagen(req.body,req.file,id );
    const [noticia] = await getSigleNoticia(id);
    res.render('agregarImagen',{noticia});
  }

  const habilitar = async (req, res) =>{
    const {id} = req.params;
    const usuario = await habilitarDeshabilitarNoticia(id,1);
    res.redirect('/usuario');
  }
  
  const deshabilitar = async (req, res) =>{
    const {id} = req.params;
    const usuario = await habilitarDeshabilitarNoticia(id,0);
    res.redirect('/usuario');
  }

router.get('/create', crearNoticiaView);
router.post('/create',upload.single("imagen"), createNoticia);
router.get('/editar/:id',editarNoticiaView);
router.post('/editar/:id',upload.single("imagen"),editarNoticia);
router.get('/agregarImagen/:id',agregarImagenView);
router.post('/agregarImagen/:id',upload.single("imagen"), agregarImagen);
router.get('/habilitar/:id', habilitar);
router.get('/deshabilitar/:id', deshabilitar);
module.exports = router;