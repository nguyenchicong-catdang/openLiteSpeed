// src/check-auth.js
(async function () {
    try {
        const response = await fetch('/api/check-auth', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('laravel_token'),
            }
        });
        if (!response.ok) {
            return window.location.href = '/login/'
        }
        return document.getElementById('root').style.display = 'block';
    } catch (err) {
        window.location.href = '/login/'
    }
})();
