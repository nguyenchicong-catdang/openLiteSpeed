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


function postList(elemetContent) {
    const html = render()
    elemetContent.innerHTML = html;
    // tuong tap dom
    renderDom(elemetContent)
    //console.log("postList")
}

function render() {
    return /* html */`
    <table border="1">
        <thead>
            <tr>
                <th>id</th>
                <th>title</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
    
    `;
}

function renderDom(elemetContent) {
    const elementTbody = elemetContent.querySelector('tbody');
    // array.map(function(currentValue, index, arr), thisValue)
    const arrPosts = dataPosts.map(post => {
        return /* html */ `
        <tr>
            <td>${post.id}</td>
            <td>${post.title}</td>
        </tr>
        `
    })
    // array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
    let rowsHtml = arrPosts.reduce((total, currentValue) => {
        return total + currentValue
    }, "")
    //console.log(rowsHtml)

    elementTbody.innerHTML = rowsHtml
}

export {postList}