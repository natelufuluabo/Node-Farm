const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = (template, product) => {
    let output = template.replace(/{%ProductName%}/g, product.productName);
    output = output.replace(/{%Image%}/g, product.image);
    output = output.replace(/{%Price%}/g, product.price);
    output = output.replace(/{%From%}/g, product.from);
    output = output.replace(/{%Nutrients%}/g, product.nutrients);
    output = output.replace(/{%Quantity%}/g, product.quantity);
    output = output.replace(/{%Description%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if (!product.organic) output = output.replace(/{%Not_Organic%}/g, 'not-organic');
    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {
            'Content-type' : 'text/html'
        });
        const cardsHTML = dataObject.map(product => replaceTemplate(tempCard, product)).join('');
        const output = tempOverview.replace('{%Product_Cards%}', cardsHTML);
        res.end(output);
    } else if (pathName === '/product') {
        res.end('This is the product :)');
    } else if (pathName === '/api') {
        res.writeHead(200, {
            'Content-type' : 'application/json'
        });
        res.end(data);
    } else {
        res.writeHead(404, {
            'Content-type' : 'text/html'
        });
        res.end('<h1>Page not found :(</h1>');
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening to requests now...');
});