import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Films from './pages/films/index.js'

export default () => {
    
    return (
        <Routes>
            <Route exact path='/' element={<Films/>} />
        </Routes>
    )
}