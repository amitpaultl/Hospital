import React from 'react';
import {  RouterProvider } from 'react-router-dom';
import Router from './Dashbord/router/Router';

const App = () => {
  return (
    <div>
      <RouterProvider router={Router}>
      
      </RouterProvider>
    </div>
  );
};

export default App;