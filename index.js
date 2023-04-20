import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'node:module';

const port = 8000;
const app = express();



//  1

app.get('/', (req, res)=>{
    res.send('<h1>Wellcome to our shop</h1>');
})
app.get('/product', (req, res)=>{
    const title = req.query?.title || '';
    const price = req.query?.price || '';
    res.send(`<h1>${title}</h1><h2>For just ${price}</h2>`);
})
        


//  2

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname + '/views/index.html'));
})



//  3
app.set('view engine', 'pug');
app.get('/product', (req, res)=>{
    const title = req.query?.title || '';
    const price = req.query?.price || '';
    res.render('product', {product_title: title, product_price: price});   
})


//  4

const require = createRequire(import.meta.url);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swagger.json')));


app.listen(port, ()=> {
    console.log(`Server started on http://localhost:${port}`);
})
