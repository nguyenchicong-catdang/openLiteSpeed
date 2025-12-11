// vite_admin/adminVite.config.js
//import { testServer } from './server/testServer';
//testServer()

import { defineConfig } from 'vite';
import { root } from '../root';
export default defineConfig({
    // ...
    root: root("vite_admin"),
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8888'
            }
        }
    },
})