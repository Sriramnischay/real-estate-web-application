const API_URL = 'http://localhost:5000/api/auth';

document.addEventListener('DOMContentLoaded', () => {
    // Handle Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const res = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();

                if (data.success) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    alert('Login successful');

                    if (data.user.role === 'admin') {
                        window.location.href = '../pages/admin-dashboard.html';
                    } else {
                        window.location.href = '../index.html';
                    }
                } else {
                    alert(data.error);
                }
            } catch (err) {
                console.error(err);
                alert('An error occurred');
            }
        });
    }

    // Handle Signup
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;

            try {
                const res = await fetch(`${API_URL}/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password, role })
                });
                const data = await res.json();

                if (data.success) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    alert('Registration successful');

                    if (data.user.role === 'admin') {
                        window.location.href = '../pages/admin-dashboard.html';
                    } else {
                        window.location.href = '../index.html';
                    }
                } else {
                    alert(data.error);
                }
            } catch (err) {
                console.error(err);
                alert('An error occurred');
            }
        });
    }
});

// Logout Helper
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/pages/login.html';
}

// Check if user is logged in and update UI (Can be called from other scripts)
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
        // Update Nav
        const navUl = document.querySelector('nav ul');
        if (navUl) {
            // Remove existing Login link if any
            const loginLink = Array.from(navUl.querySelectorAll('li a')).find(a => a.textContent.includes('Login') || a.textContent.includes('Sign Up'));
            if (loginLink) loginLink.parentElement.remove();

            // Add Dashboard Link if admin
            if (user.role === 'admin') {
                const li = document.createElement('li');
                li.innerHTML = `<a href="/pages/admin-dashboard.html">Admin Dashboard</a>`;
                navUl.appendChild(li);
            }

            // Add Logout
            const li = document.createElement('li');
            li.innerHTML = `<a href="#" onclick="logout()">Logout</a>`;
            navUl.appendChild(li);
        }
    }
}
