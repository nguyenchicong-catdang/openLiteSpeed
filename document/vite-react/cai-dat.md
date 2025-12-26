# vite react
https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react

https://www.npmjs.com/package/@vitejs/plugin-react

## npm
npm i react

npm i react-dom

npm i -D @vitejs/plugin-react

## vite.config.js
```bash

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
```
