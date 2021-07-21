const express = require('express');
const router = express.Router();
const {getImagenesNoticia} = require('./../models/imagenes');
const {
        getUltimasNoticias,
        getSigleNoticia,
        getTop5vistas,
        getAllNoticiasForSeccion,
        getUltimasNoticiasForSeccion,
        buscarPorTitular,
        buscarPorBajada,
        buscarPorCuerpo,
        editarNoticia } = require('./../models/noticias');

const {getAllSecciones} = require('./../models/secciones');

const {crearComentario, getAllComentarios} = require('./../models/comentarios');


const todoHome = async (req, res)=>{
    const masVistas = await getTop5vistas();
    const ultimasNoticias = await getUltimasNoticias ();
    const noticiasDeportes = await getUltimasNoticiasForSeccion(1);
    const noticiasPolitica = await getUltimasNoticiasForSeccion(2);
    const noticiasActualidad = await getUltimasNoticiasForSeccion(3);
    const secciones = await getAllSecciones();
    res.render('index',{masVistas,ultimasNoticias,noticiasDeportes,noticiasPolitica,noticiasActualidad,secciones});
}

const getNoticia = async (req, res)=>{
    const {id} = req.params;
    const imagenes = await getImagenesNoticia(id);
    const [noticia] = await getSigleNoticia(id);
    const secciones = await getAllSecciones();
    const masVistas = await getTop5vistas();
    const comentarios = await getAllComentarios(id);

    //este control se hace para que los escritores (usuarios) de la pagina puedan darle un visto a sus propias noticias
    if(!req.session.user){

        const nuevaVista = noticia.vistas + 1;
        const obj = {
            vistas:nuevaVista
        }
        editarNoticia(id,obj);
    }

    
    res.render('noticia',{noticia,secciones,imagenes,masVistas,comentarios });
}

const getPorSeccion = async (req, res)=>{
    const {id} = req.params;
    const noticias = await getAllNoticiasForSeccion(id);
    const nuevasNoticias = await getUltimasNoticiasForSeccion(id);
    const secciones = await getAllSecciones();
    const masVistas = await getTop5vistas();
    res.render('seccionDeNoticias',{noticias,nuevasNoticias,secciones,masVistas});
}

const buscar = async (req, res)=>{
    const {dato:dato} = req.body;
    const busquedaTitular = await buscarPorTitular(dato);
    const busquedaBajada = await buscarPorBajada(dato);
    const busquedaCuerpo = await buscarPorCuerpo(dato);
    const secciones = await getAllSecciones();
    
    res.render('resultadoBusqueda',{secciones, busquedaTitular, busquedaBajada, busquedaCuerpo});
}

const agregarComentario = async(req, res) =>{
    const {id} = req.params;
    const datos = req.body;
    const obj ={
        id_noticia : id,
        texto : datos.texto,
        habilitado : 1
    }
    const ret = crearComentario(obj);
    const imagenes = await getImagenesNoticia(id);
    const [noticia] = await getSigleNoticia(id);
    const secciones = await getAllSecciones();
    const masVistas = await getTop5vistas();
    const comentarios = await getAllComentarios(id);
    res.render('noticia',{noticia,secciones,imagenes,masVistas,comentarios });
} 

router.get('/', todoHome);
router.get('/noticia/:id', getNoticia);
router.get('/seccion/:id', getPorSeccion);
router.post('/buscar', buscar);
router.post('/addComentario/:id',agregarComentario);
module.exports = router;