# array.map(function(currentValue, index, arr), thisValue)

const arrPosts = dataPosts.map(post => {
        return /* html */ `
        <tr>
            <td>${post.id}</td>
            <td>${post.title}</td>
        </tr>
        `
    })

# array.reduce(function(total, currentValue, currentIndex, arr), initialValue)

let rowsHtml = arrPosts.reduce((total, currentValue) => {
        return total + currentValue
    }, "")
    //console.log(rowsHtml)

## render
const elementTbody = elemetContent.querySelector('tbody');

elementTbody.innerHTML = rowsHtml