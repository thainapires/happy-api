// REQ / RES localhost:3333

import express from 'express';
import path from 'path';
import 'express-async-errors';
import './database/connection';
import routes from './routes';
import errorHandler from './errors/handler';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler);

app.listen(3333);


//Metodos HTTP = GET, POST, PUT, DELETE
//Parâmetros
//GET = Buscar uma informação (Lista, item)
//POST = Criando uma informação nova
//PUT = Editando uma informação
//DELETE = Deletando uma informação

//Rota = conjunto 
//Recurso = usuário

//Query Params: http://localhost:3333/users?search=diego&page=2
//Route Params: http://localhost:3333/users/1 (Identificar um recurso)
//Body: http://localhost:3333/users (Informações mais complexas)

/*app.post('/users/:id', (request, response) =>{
    console.log(request.query);
    console.log(request.params);
    console.log(request.body)
    return response.json({message: 'Hello World'});
});*/

//Três formas de lidar com bd:
//Driver nativo (query com sql), Query builder (query com javascript), ORM (maior abstração)
//Query builder ou ORM: Trocar bancos sem precisar mudar nada na aplicação (Ex: Postgrees -> Mysql)