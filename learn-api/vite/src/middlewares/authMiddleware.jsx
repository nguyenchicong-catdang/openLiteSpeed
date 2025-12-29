import { redirect } from "react-router"

// middlewares/authMiddleware.jsx
async function authMiddleware({request}, next) {
    if (!localStorage.getItem('laravel_token')) {
        throw redirect('login')
    }
    let response = await next()
    // if (response.status === 302) {
    //     console.log(response.status)
    //     throw redirect(response.url)
    // }
    console.log(response)

}

export {authMiddleware}
