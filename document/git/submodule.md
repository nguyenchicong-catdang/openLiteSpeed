# link git custom ln -s /home/cong/openLiteSpeed/my-custom-logic src
cd ~/openLiteSpeed/example-app
git submodule add https://github.com/your-user/my-custom-logic.git src

## Ưu điểm: Khi đẩy lên Git, 
Git sẽ lưu tham chiếu đến repo kia. Khi deploy, bạn chỉ cần chạy git submodule update --init là code sẽ tự động được tải về đúng thư mục src.

git submodule update --init