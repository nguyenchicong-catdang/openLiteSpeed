//vite_admin/learn-json/src/router.js
function router() {
    //const url = window.location.href;
    const queryString = window.location.search;
    // URLSearchParams
    const params = new URLSearchParams(queryString);
    // get p
    const page = params.get("p");
    let id = params.get("id") ?? "";
    //console.log(page)
    return {page, id}
}

export {router}