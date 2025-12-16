// vite_admin/learn-json/src/postList.js
const dataPosts = [
    {
        id: 1,
        title: "abc 1"
    },

    {
        id: 2,
        title: "abc 2"
    },

]

async function fetchData() {
    const response = await fetch('/api/post/list');
    const result = await response.json();
    return result;
    console.log(result)
}

async function postList(elemetContent) {
    // fetch data
    //fetchData();
    const html = render()
    elemetContent.innerHTML = html;
    // fetch data
    const postsData = await fetchData();
    // tuong tap dom
    renderDom(elemetContent, postsData)
    //console.log("postList")
}

function render() {
    return /* html */`
    <table border="1">
        <thead>
            <tr>
                <th>id</th>
                <th>title</th>
                <th>content</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
    
    `;
}

// function renderDom(elemetContent, postsData) {
//     const elementTbody = elemetContent.querySelector('tbody');
//     // array.map(function(currentValue, index, arr), thisValue)
//     const arrPosts = postsData.map(post => {
//         return /* html */ `
//         <tr>
//             <td>${post.id}</td>
//             <td>${post.title}</td>
//             <td>${post.content}</td>
//         </tr>
//         `
//     })
//     // array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
//     let rowsHtml = arrPosts.reduce((total, currentValue) => {
//         return total + currentValue
//     }, "")
//     //console.log(rowsHtml)

//     elementTbody.innerHTML = rowsHtml
// }

function renderDom(elemetContent, arrPosts) {
    const elementTbody = elemetContent.querySelector('tbody');

    // Sử dụng arrPosts được truyền vào
    const rowsHtmlArray = arrPosts.map(post => {
        return /* html */ `
        <tr>
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.content}</td>
        </tr>
        `
    })

    // Tối ưu hóa: Dùng join('') thay vì reduce
    let rowsHtml = rowsHtmlArray.join('');

    elementTbody.innerHTML = rowsHtml
}

export {postList}