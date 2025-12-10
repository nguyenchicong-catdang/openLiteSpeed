async function reqApi() {
    const response = await fetch('/dev/api-login/');
    const result = await response.json();
    console.log(result)
}
reqApi();