import 'babel-polyfill';
import express from 'express';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
const app = express();
app.use(express.static('public'));

// divert all the requests from express route handler to React Router handler
app.get('*', (req,res) => {
    const store = createStore();
    console.log('---server store', store);
    // some logic to initialize & load the data into the store
    res.send(renderer(req, store));
});
app.listen(3000, () => {
    console.log('Listening on port 3000');
});