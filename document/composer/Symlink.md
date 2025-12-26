# true
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
# fale copy depluy
"options": {
    "symlink": false
}

## script
"scripts": {
    "deploy-server": [
        "composer config repositories.core-logic '{\"type\": \"path\", \"url\": \"../core-logic-v1\", \"options\": {\"symlink\": false}}'",
        "composer install --no-dev --optimize-autoloader"
    ],
    "setup-local": [
        "composer config repositories.core-logic '{\"type\": \"path\", \"url\": \"../core-logic-v1\", \"options\": {\"symlink\": true}}'",
        "composer install"
    ]
}