const http = require('http');

const requestListener = (request, response) => {
    // response.setHeader('Content-Type', 'text/html');

    response.writeHead(200, {
        'Content-Type': 'text/html',
    });

    const url = request.url;
    if(url === '/'){
        response.write('<h1>Ini adalah halaman home</h1>');
        response.end();
    }

    else if(url === '/about'){
        response.write('<h1>Ini adalah halaman about</h1>');
        response.end();
    }
    else{
    response.write('<h1>Hello, World!</h1>');
    response.end();
}
    // response.statusCode = 200;
    // response.end('<h1>Hello, World!</h1>');

}
const server = http.createServer(requestListener);
server.listen(5000, () => {
    console.log(`Server is running on http://localhost:5000`);
});