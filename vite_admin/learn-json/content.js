// vite_admin/learn-json/content.js
import { router } from "./src/router";
import { postList } from "./src/postList";
import { postInsert } from "./src/postInsert";
const routes = {
    postList: postList,
    postInsert: postInsert
}
document.addEventListener('DOMContentLoaded', () => {
    const routeInfo = router();
    const pageName = routeInfo.page;
    const pageId = routeInfo.id;

    // Tìm hàm xử lý tương ứng
    const handler = routes[pageName];

    // render content
    const elemetContent = document.getElementById('content');
    //console.log(elemetContent)
    if (handler) {
        handler(elemetContent, pageId)
    }
    //console.log(page)
    //page.page();
    
})