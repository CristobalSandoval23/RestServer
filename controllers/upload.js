
const path = require("path");
const  fs  = require("fs");

const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");

const mostrarImagen = async(req, res = response) => {

  const {id, coleccion} = req.params;

    let modelo;
    switch (coleccion) {
      case 'usuarios':
        modelo = await Usuario.findById(id);
        if(!modelo){
          return res.status(400).json({
            msg: `No existe un usuario con el id ${id}`
          })
        }
        break;
        case 'productos':
          modelo = await Producto.findById(id);
          if(!modelo){
            return res.status(400).json({
              msg: `No existe un producto con el id ${id}`
            })
          }
          
        break;
    
      default:
        return res.status(500).json({msg: 'Se me olvido validar eso'})
    }
  
    if(modelo.img){
      const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
      if(fs.existsSync(pathImagen)){
        return res.sendFile(pathImagen);
      }
    }

    //c3b82033-47c7-40b9-8319-4497eabc57d9.gif
      const pathImagen = path.join(__dirname, '../assets/no-image.jpg')
        return res.sendFile(pathImagen);
}

const cargarArchivo = async(req, res = response)=>{
   
  try {
    const nombre = await subirArchivo.subirArchivo(req.files, undefined, 'texto');
    res.json({nombre})
  } catch (msg) {
      res.status(400).json({
          msg
      })
  }
}

const  actualizarArchivo = async(req, res = response)=> {

    const {coleccion, id} = req.params;

    let modelo;
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        })
      }
      break;
      case 'productos':
        modelo = await Producto.findById(id);
        if(!modelo){
          return res.status(400).json({
            msg: `No existe un producto con el id ${id}`
          })
        }
        
      break;
  
    default:
      break;
  }

  if(modelo.img){
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
    if(fs.existsSync(pathImagen)){
      fs.unlinkSync(pathImagen);
    }
  }
  const nombre = await subirArchivo.subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;
  await modelo.save();
    res.json({modelo})
}

const  actualizarArchivoCloudinary = async(req, res = response)=> {

    const {coleccion, id} = req.params;

    let modelo;
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        })
      }
      break;
      case 'productos':
        modelo = await Producto.findById(id);
        if(!modelo){
          return res.status(400).json({
            msg: `No existe un producto con el id ${id}`
          })
        }
        
      break;
  
    default:
      break;
  }

  if(modelo.img){
    const nombreArr = modelo.img.split('/');
    const nombre    = nombreArr[ nombreArr.length - 1 ];
    const [ public_id ] = nombre.split('.');
    cloudinary.uploader.destroy( public_id );
  }
   const {tempFilePath} = req.files.archivo;
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
  modelo.img = secure_url;

  await modelo.save();

  res.json( modelo );
}


module.exports = {
    mostrarImagen,
    cargarArchivo,
    actualizarArchivo,
    actualizarArchivoCloudinary
}