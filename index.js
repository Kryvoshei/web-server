const http = require('http');
const fs = require('fs');
const history = [];

http.createServer((request, response) => {

    if (request.url === '/index.html' || request.url === '/') {
        response.end(fs.readFileSync('index.html'))
    } else if (request.url === '/history') {
        response.end(history.map(item => {
            return `Method ${item.method} path ${item.url}`;
        }).join('\n'))
    } else {
        try {
            response.end(fs.readFileSync(request.url.slice(1)))
        } catch (error) {
            memorize(request.method, request.url);
            response.end(`Method ${request.method} path ${request.url}`)
        }
    }

}).listen(3000, () => console.log('Server started'));

function memorize(method, url) {
    history.push({
        method,
        url
    });
}