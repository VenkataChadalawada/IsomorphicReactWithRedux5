import React from 'react';
import {renderToString} from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from '../client/Routes';
// import Home from '../client/components/Home'; // we use from Routes.js 
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