const express = require('express');
const router = express.Router();

const Biografia = require('../models/Biografia');

//Get todos las Biografias
router.get('/api/get-biografias', async (req, res) => {
    try{
        const biografias = await Biografia.find().lean();
        res.send(biografias)
    }
    catch(err){
        res.send("Error al obtener los perfiles: ", err)
    }
    
});

//Get Biografia por Id
router.get('/api/get-biografia/:id', async (req, res) => {
    try {
        const biografia = await Biografia.findById(req.params.id).lean();

        if(biografia) res.send(biografia);
        else res.send("No encontrado");

    }
    catch (err) {
        res.send("Error al obtener el perfil: ", err);
    }

});

//Post nueva Biografia
router.post('/api/post-biografia', async (req, res) => {

    try {
        const { perfilId, descripcion } = req.body;

        if (!perfilId) {
            res.send("Perfil Id vacío");
            return;
        }
        if (!descripcion) {
            res.send("descripcion vacía");
            return;
        }
        else {
            const NewBiografia = new Biografia({ perfilId, descripcion });
            await NewBiografia.save();
            res.send(NewBiografia._id);
        }
    }
    catch(err){
        res.send("Error al guardar el perfil: ", err);
    }
});

//Put/editar Biografia
router.put('/api/put-biografia/:id', async (req, res) => {
    const { perfilId, descripcion, estado } = req.body;
    try {
        if(await Biografia.findByIdAndUpdate(req.params.id, { perfilId, descripcion, estado })){
            res.send(true);
        }
        else{
            res.send(false);
        }
        
    }
    catch (err) {
        res.send("Error al editar la biografía: ", err);
    }
});

//delete Perfil
router.delete('/api/delete-biografia/:id',  async (req, res) => {
    if(await Biografia.findByIdAndDelete(req.params.id)){
        res.send(true);
    }
    else{
        res.send(false);
    }
   
});


module.exports = router;