// root.js
import path from 'node:path'

function root(strPath) {
    return path.join(__dirname,strPath)
}

export {root}