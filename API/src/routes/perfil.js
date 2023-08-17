const express = require('express');
const router = express.Router();

const Perfil = require('../models/Perfil');

//Get todos los Perfiles
router.get('/api/get-perfiles', async (req, res) => {
    try{
        const perfiles = await Perfil.find().lean();
        res.send(perfiles);
    }
    catch(err){
        res.send("Error al obtener los perfiles: ", err)
    }
    
});

//Get Perfil por id
router.get('/api/get-perfil/:id', async (req, res) => {
    try {
        const perfil = await Perfil.findById(req.params.id).lean();
        if(perfil) res.send(perfil);
        else res.send("No encontrado");
    }
    catch (err) {
        console.log(err);
        res.send("Error al obtener el perfil: ", err);
    }

});

//Post nuevo Perfil
router.post('/api/post-perfil', async (req, res) => {

    try {
        const { nombre, email } = req.body;

        if (!nombre) {
            res.send("nombre vacío");
            return;
        }
        if (!email) {
            res.send("email vacío");
            return;
        }
        else {
            if((await Perfil.find({email: email})).length){
                res.send("Perfil duplicado");
                return;
            }
            const NewPerfil = new Perfil({ nombre, email });
            await NewPerfil.save();
            res.send(NewPerfil._id);
        }
    }
    catch(err){
        res.send("Error al guardar el perfil: ", err);
    }
});

//Put/editar Perfil
router.put('/api/put-perfil/:id', async (req, res) => {
    const { nombre, email, estado } = req.body;
    try {

        if(await Perfil.findByIdAndUpdate(req.params.id, { nombre, email, estado })) res.send(true);
        else res.send(false);
    }
    catch (err) {
        res.send("Error al editar el perfil: ", err);
    }
});

//delete Perfil
router.delete('/api/delete-perfil/:id',  async (req, res) => {
    try{
        if(await Perfil.findByIdAndDelete(req.params.id)){
            res.send(true);
        }
        else{
            res.send(false);
        }
        
    }
    catch(err){
        res.send("Error al eliminar el perfil: ", err);
    }
    
});


module.exports = router;