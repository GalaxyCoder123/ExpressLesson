import express from 'express';
import bodyParser from 'body-parser';
import { messageRouter } from './routers/message-router';

const app = express();
const port = process.env.SHIP_PORT || 8080;


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/dummy', (req, res) => {
    res.send('dummy data updated');
});

app.use((req, res, next) => {
    // tslint:disable-next-line:no-console
    console.log(`request made with url: ${req.url} and method: ${req.method}`);
    // const headers = req.rawHeaders;
    // console.log(headers);
    next();
});

// attach an actual object to req.body
app.use(bodyParser.json());

// attach the specific users session data to req.session
// app.use(sessionMiddleware);

// allow cross origins
app.use((req, resp, next) => {
    // tslint:disable-next-line:no-console
    console.log(req.get('host'));
    (process.env.SHIP_API_STAGE === 'prod')
        ? resp.header('Access-Control-Allow-Origin', process.env.SHIP_APP_URL)
        : resp.header('Access-Control-Allow-Origin', `${req.headers.origin}`);
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    resp.header('Access-Control-Allow-Credentials', 'true');
    resp.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, PATCH');
    next();
});

/**
 * Register Routers
 */
app.use('/message', messageRouter);

// start up the application
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`application started on port:` + port);
});
