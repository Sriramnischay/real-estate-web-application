const API_URL_ADMIN = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', async () => {
    // Check Auth
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user || user.role !== 'admin') {
        alert('Access Denied: Admins only');
        window.location.href = 'login.html';
        return;
    }

    const tableBody = document.getElementById('property-table-body');

    try {
        const res = await fetch(`${API_URL_ADMIN}/properties`);
        const data = await res.json();

        if (data.success) {
            const properties = data.data;
            tableBody.innerHTML = '';

            properties.forEach(property => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><img src="${property.image}" alt="${property.title}" style="width: 50px; hieght: 50px; object-fit: cover;"></td>
                    <td>${property.title}</td>
                    <td>${property.location}</td>
                    <td>$${property.price.toLocaleString()}</td>
                    <td>
                        <button class="action-btn delete-btn" onclick="deleteProperty('${property._id}')">Delete</button>
                    </td>
                `;
                tableBody.appendChild(tr);
            });
        }
    } catch (err) {
        console.error(err);
    }
});

async function deleteProperty(id) {
    if (!confirm('Are you sure?')) return;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL_ADMIN}/properties/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();

        if (data.success) {
            alert('Property deleted');
            window.location.reload();
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.error(err);
        alert('Error deleting');
    }
}
