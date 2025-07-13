const http = require('http');
const PORT = 8080;

/**
 * Sends a response to the client.
 * @param res
 * @param statusCode
 * @param resBody
 * @param contentType
 */
function sendResponse(res, statusCode, resBody, contentType = 'application/json') {
    res.writeHead(statusCode, {'Content-Type': contentType});
    res.end(JSON.stringify(resBody));
}

/**
 * Parses the request body and calls the callback with the parsed data.
 * @param req
 * @param callback
 */
function parseBody(req, callback) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            const parsedBody = JSON.parse(body);
            callback(null, parsedBody);
        } catch (error) {
            callback(error);
        }
    });
}

/**
 * Validates the book data.
 * @param data
 * @param isUpdate
 * @returns {boolean}
 */
function validateBookData(data, isUpdate = false) {
    if (!isUpdate && !data.title) return false;
    if (data.year && (typeof data.year !== 'number' || data.year.toString().length !== 4)) return false;
    return !(data.available !== undefined && typeof data.available !== 'boolean');
}

/**
 * Validates the content type of the request.
 * @param req
 * @returns {boolean}
 */
function validateContentType(req) {
    const contentType = req.headers['content-type'];
    return contentType && contentType.includes('application/json');
}

/**
 * Generates the next ID for a new book.
 * @param books
 * @returns {number|number}
 */
function generateNextId(books){
    return books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
}

let books = [
    {
        id: 1,
        title: "Something",
        author: "Someone",
        year: 2025,
        genre: "Sci-Fi",
        available: true
    },
    {
        id: 2,
        title: "Nothing",
        author: "Unknown",
        year: 2025,
        genre: "Classic",
        available: false
    }
];

const server = http.createServer((req, res) => {
    const { url, method } = req;
    let resBody = { message: "Not Found!!!" };
    let statusCode = 404;

    const path = url.split('?')[0];

    try {
        if (path === '/books' && method === 'GET') {
            sendResponse(res, 200, books);
            return;
        }

        if (path.startsWith('/books/') && method === 'GET') {
            const id = path.split('/')[2];
            const book = books.find(b => b.id === id);

            if (!book) {
                sendResponse(res, 404, { error: 'Book not found' });
                return;
            }

            sendResponse(res, 200, book);
            return;
        }

        if (path === '/books' && method === 'POST') {
            if (!validateContentType(req)) {
                sendResponse(res, 415, { error: 'Unsupported Media Type' });
                return;
            }

            parseBody(req, (error, body) => {
                if (error) {
                    sendResponse(res, 400, { error: 'Invalid JSON' });
                    return;
                }

                const { title, author, year, genre, available } = body;

                if (!title || !author || !year || !genre || available === undefined) {
                    sendResponse(res, 400, { error: 'Missing required fields: title, author, year, genre, available' });
                    return;
                }

                if (!validateBookData(body)) {
                    sendResponse(res, 400, { error: 'Invalid data format' });
                    return;
                }

                const newBook = {
                    id: generateNextId(books),
                    title,
                    author,
                    year,
                    genre,
                    available
                };

                books.push(newBook);
                console.log(books);
                sendResponse(res, 201, { message: 'Book has been successfully created.' });
            });
            return;
        }

        if (path.startsWith('/books/') && method === 'PUT') {
            if (!validateContentType(req)) {
                sendResponse(res, 415, { error: 'Unsupported Media Type' });
                return;
            }

            const id = path.split('/')[2];
            const bookIndex = books.findIndex(b => b.id === id);

            if (bookIndex === -1) {
                sendResponse(res, 404, { error: 'Book not found' });
                return;
            }

            parseBody(req, (error, body) => {
                if (error) {
                    sendResponse(res, 400, { error: 'Invalid JSON' });
                    return;
                }

                if (!body.title) {
                    sendResponse(res, 400, { error: 'Title is required' });
                    return;
                }

                if (!validateBookData(body, true)) {
                    sendResponse(res, 400, { error: 'Invalid data format' });
                    return;
                }

                books[bookIndex] = {
                    ...books[bookIndex],
                    ...body
                };

                sendResponse(res, 200, { message: 'Book has been successfully updated.' });
            });
            return;
        }

        if (path.startsWith('/books/') && method === 'DELETE') {
            if (!validateContentType(req)) {
                sendResponse(res, 415, { error: 'Unsupported Media Type' });
                return;
            }

            const id = path.split('/')[2];
            const bookIndex = books.findIndex(b => b.id === id);

            if (bookIndex === -1) {
                sendResponse(res, 404, { error: 'Book not found' });
                return;
            }

            books.splice(bookIndex, 1);
            sendResponse(res, 200, { message: 'Book has been successfully deleted.' });
            return;
        }

        sendResponse(res, 404, { error: 'Route not found' });
    } catch (error) {
        console.error("Error processing request:", error);
        resBody = { message: "Internal Server Error" };
        statusCode = 500;
        sendResponse(res, statusCode, resBody);
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})