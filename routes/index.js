const express = require('express');
const router = express.Router();
const {getUltimasNoticias,getUltimasNoticiasForSeccion,getTop5vistas} = require('./../models/noticias');
const {getAllSecciones} = require('./../models/secciones');




const todoHome = async ( req, res) =>{
    const masVistas = await getTop5vistas();
    const ultimasNoticias = await getUltimasNoticias ();
    const noticiasDeportes = await getUltimasNoticiasForSeccion(1);
    const noticiasPolitica = await getUltimasNoticiasForSeccion(3);
    const noticiasActualidad = await getUltimasNoticiasForSeccion(4);
    const secciones = await getAllSecciones();
    res.render('index',{masVistas,ultimasNoticias,noticiasDeportes,noticiasPolitica,noticiasActualidad,secciones});
}

router.get('/', todoHome);
module.exports = router;