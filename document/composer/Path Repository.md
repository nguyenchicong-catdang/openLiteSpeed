# Path Repository

{
    "repositories": [
        {
            "type": "path",
            "url": "../my-custom-logic",
            "options": {
                "symlink": true
            }
        }
    ],
    "require": {
        "my-vendor/my-custom-logic": "dev-main"
    }
}

## ver 2
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
    "autoload": {
        "psr-4": {
            "App\\": "app/",
            "SrcApp\\": "../core-logic-v1/src/"
        }
    },
    "require": {
        "my-project/core-logic": "dev-main"
    }
}