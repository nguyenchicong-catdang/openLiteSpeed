// vite_admin/adminVite.config.js
//import { testServer } from './server/testServer';
//testServer()

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

import { root } from '../root';
export default defineConfig({
    // ...
    plugins: [react()],
    root: root("vite_admin"),
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8888'
            }
        }
    },
})