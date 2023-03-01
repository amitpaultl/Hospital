import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Add from '../Page/Add';
import Home from '../Page/Home';
import Root from '../Page/Root';
import Update from '../Page/Update';

const Router = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        children:[
            {
               path:'/', 
               element:<Home></Home>
            },
            {
               path:'/add', 
               element:<Add></Add>
            },
            {
               path:'/update/:id', 
               element:<Update></Update>
            },
            

        ]
    }
])

export default Router;