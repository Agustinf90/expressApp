
import express from 'express';
import apiRouter from './routes/apiRouter.js';
import __dirname from './utils.js';
import './persistence/mongo.js'
import isAdmin from './middlewares/isAdmin.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', isAdmin, apiRouter);
app.use((err, req, res, next)=>{
    res.status(500).send("There was an error", err);
});

const server = app.listen(PORT, () => console.log(`Listening to the port:  ${PORT}`));
server.on('error', error => console.log('Servidor express en error:', error));