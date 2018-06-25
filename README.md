# IsomorphicReactWithRedux5

To manage State we want to integrate with Redux. However there are 4 problems
- Redux needs different configuration on browser vs server
- Aspects of authentication needs to be handled in the server Normally this is only on browser
- Needs someway to detect when all initial data load action creators are completed on server.
- Need state rehydration on browser

Solving few in this

### created seperate stores for server & client
- server side:
#### 1 getting store seperately
```javascript
app.get('*', (req,res) => {
    const store = createStore();
    console.log('---server store', store);
    // some logic to initialize & load the data into the store
    res.send(renderer(req, store));
});
```
#### 2 createStore is 
```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';

export default () => {
   const store = createStore(reducers, {}, applyMiddleware(thunk));
   return store;
}
```
#### 4 now renderer gets that store & renders as per store if store is empty it renders empty but then client hydrates on top of it

```javascript
export default (req, store) => {
    console.log('--------taken', store);
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={{}}>
                <Routes/>
            </StaticRouter>
        </Provider>
    );
    console.log('----ser hand', content);    
    return `
        <html>
            <head>
                <title>react ssr app</title>
            </head>
            <body>
                <div id="root">${content}</div>
                <script src="bundle.js"></script>
            </body>
        </html>
    `;
}
```




- client side:
#### main client is regular SPA with react & redux
``` javascript
//Start up point for the client side application
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import Routes from './Routes';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(thunk));

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter> 
            <Routes />
        </BrowserRouter>
    </Provider>
, document.querySelector('#root')
);

```
