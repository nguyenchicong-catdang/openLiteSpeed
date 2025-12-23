async function checkAuth() {
    const response = await fetch('/api/check-auth');
    console.log(response)
}
checkAuth()
