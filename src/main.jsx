import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';


const root=ReactDom.createRoot(document.getElementById("root"));
// root.render(<Provider store={store}><App /></Provider>);
root.render(<App />);
