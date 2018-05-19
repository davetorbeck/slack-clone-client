import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8081',
});

const client = new ApolloClient({
  networkInterface: networkInterface,
});

const App = (
  <ApolloProvider>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
