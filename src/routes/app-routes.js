import React from 'react';
import MainPage from './../pages/main-page';
import CrudAlterar from '../components/crud-dev-component/crud-alterar';

import {
    Routes,
    Route
} from 'react-router-dom';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/CrudAlterar/:id" element={<CrudAlterar />}></Route>
        </Routes>
    );
}