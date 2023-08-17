const express = require('express');

const app = express();

require('./database');

//settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());

//rutas
app.use(require('./src/routes/perfil'));
app.use(require('./src/routes/biografia'));


//Server in listenning
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});