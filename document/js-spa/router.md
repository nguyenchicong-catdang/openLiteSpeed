# url
const url = window.location.href;
# queryString
const queryString = window.location.search;
## get query string
const params = new URLSearchParams(queryString);
    // get p
    const page = params.get("p");
    let id = params.get("id") ?? "";
    //console.log(page)
    return {page, id}