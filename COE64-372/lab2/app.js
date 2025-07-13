const http = require('http');
const PORT = 8080;

const server = http.createServer((req, res) => {

    const { url, method } = req;
    console.log(url, method);

    let resBody = {message: "Not Found!!!"};
    let statusCode = 404;

    if (method === "GET" && url === "/users"){
        // GET /users
        resBody = [{
            id: 1, firstname: "demo", lastname: "demo2"
        }];
        statusCode = 200;
        res.writeHead(statusCode, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(resBody));
    } else if (method === "GET" && url.includes("/users/")){
        // GET /users/:id
        let param = url.split("/");
        let id = param[2];
        if (id){
            resBody = {
                id: id, firstname: "demo", lastname: "demo2"
            };
            statusCode = 200;
        }
        res.writeHead(statusCode, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(resBody));
    } else if (method === "POST" && url === "/users"){
        // POST /users
        let body = '';

        req.on('data', (chuck) => {
            body += chuck.toString();
        });

        req.on('end', () => {

            const contentType = req.headers['content-type'];
            if(contentType === 'application/json'){
                const data = JSON.parse(body);
                console.log(data);
                if(data.firstname){
                    resBody = {
                        message: "created successfully"
                    };
                    statusCode = 201;
                    res.writeHead(statusCode, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(resBody));
                } else {
                    resBody = {
                        message: "Bad Request for incorrect information"
                    };
                    statusCode = 400;
                    res.writeHead(statusCode, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(resBody));
                }
            }
        })

    } else if (method === "PUT" && url.includes("/users/")){
        // PUT /users/:id
        let param = url.split("/");
        let id = param[2];
        if (id){
            let body = '';

            req.on('data', (chuck) => {
                body += chuck.toString();
            });

            req.on('end', () => {

                const contentType = req.headers['content-type'];
                if(contentType === 'application/json'){
                    const data = JSON.parse(body);
                    console.log(data);
                    if(data.firstname){
                        resBody = {
                            message: "updated successfully"
                        };
                        statusCode = 200;
                        res.writeHead(statusCode, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(resBody));
                    } else {
                        resBody = {
                            message: "Bad Request for incorrect information"
                        };
                        statusCode = 400;
                        res.writeHead(statusCode, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(resBody));
                    }
                }
            })
        } else {
            res.writeHead(statusCode, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(resBody));
        }

    } if(method === "DELETE" && url.includes("/users/")){
        // DELETE /users/:id
        let param = url.split("/");
        let id = param[2];
        if (id){
            resBody = {
                message: "Deleted Successfully"
            };
            statusCode = 200;
        }
        res.writeHead(statusCode, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(resBody));
    } else {
        res.writeHead(statusCode, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(resBody));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});