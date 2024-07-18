import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from "redux-persist/integration/react";
import router from '@/router';
import '@/theme.css'
import { Provider } from 'react-redux';
import {store, persistorStore} from '@/store/index';
import "@/index.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistorStore}>
            <RouterProvider router={router}></RouterProvider>
        </PersistGate>
    </Provider>
);


