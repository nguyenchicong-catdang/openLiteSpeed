# tham khoao
Giai đoạn,Loại Repository nên dùng,Lý do
Phát triển (Dev),Path,"Để sửa code nhanh, test lỗi trực tiếp giữa code cũ và nhân Laravel mới."
Thử nghiệm (Test),VCS (Git),"Để kiểm tra xem khi kéo code từ Git về một môi trường sạch (Clean environment), code có chạy đúng không."
Triển khai (Deploy),VCS hoặc Artifact,"Đảm bảo tính đóng gói, không phụ thuộc vào đường dẫn thư mục tuyệt đối trên server."
## Cấu trúc thư mục chuẩn cho Package
core-logic-v1/
├── src/                # Chứa code logic chính
│   ├── Providers/
│   ├── Controllers/
│   └── Views/
├── composer.json       # File cấu hình của riêng package
└── README.md

# core-logic-v1/composer.json
{
    "name": "my-project/core-logic",
    "description": "Thư viện logic cốt lõi dùng chung cho nhiều phiên bản Laravel",
    "type": "library",
    "license": "MIT",
    "autoload": {
        "psr-4": {
            "SrcApp\\": "src/"
        }
    },
    "require": {
        "php": "^8.2"
    }
}
# Cập nhật file example-app/composer.json (Dự án Laravel)
{
    "repositories": [
        {
            "type": "path",
            "url": "../core-logic-v1",
            "options": {
                "symlink": true
            }
        }
    ],
    "require": {
        "my-project/core-logic": "dev-main"
    }
}