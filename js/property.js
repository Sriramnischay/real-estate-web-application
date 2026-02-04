const API_URL = 'http://127.0.0.1:5000/api';

document.addEventListener('DOMContentLoaded', async function () {

    // Check Auth on Load
    if (typeof checkAuth === 'function') {
        checkAuth();
    }

    // Function to create property card HTML
    function createPropertyCard(property) {
        return `
            <div class="property-card" data-id="${property._id}">
                <div class="property-image">
                    <img src="${property.image}" alt="${property.title}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                </div>
                <div class="property-status ${property.status.replace('-', '-')}">${property.status === 'for-sale' ? 'For Sale' : 'For Rent'}</div>
                <div class="property-info">
                    <h3 class="property-title">${property.title}</h3>
                    <div class="property-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${property.location}</span>
                    </div>
                    <div class="property-price">
                        ${property.status === 'for-sale' ? '$' + property.price.toLocaleString() : '$' + property.price.toLocaleString() + '/month'}
                    </div>
                    <div class="property-features">
                        <div class="feature">
                            <i class="fas fa-ruler-combined"></i>
                            <span>${property.area} sq ft</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-bed"></i>
                            <span>${property.bedrooms} ${property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-bath"></i>
                            <span>${property.bathrooms} ${property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to display featured properties on the home page
    async function displayFeaturedProperties() {
        const featuredPropertiesContainer = document.getElementById('featured-properties');
        if (featuredPropertiesContainer) {
            try {
                const res = await fetch(`${API_URL}/properties?limit=3`);
                const data = await res.json();

                if (data.success) {
                    const properties = data.data.slice(0, 3); // Fallback slice if limit param ignored
                    featuredPropertiesContainer.innerHTML = '';
                    properties.forEach(property => {
                        featuredPropertiesContainer.innerHTML += createPropertyCard(property);
                    });
                    addPropertyCardClickEvents();
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    // Function to display all properties on the view-all page
    async function displayAllProperties(queryString = '') {
        const allPropertiesContainer = document.getElementById('all-properties');
        const noResultsElement = document.querySelector('.no-results');

        if (allPropertiesContainer) {
            // Show explicit loading state
            allPropertiesContainer.innerHTML = '<div style="width:100%; text-align:center; padding:20px;"><h3>Loading properties...</h3><p>Connecting to database...</p></div>';

            try {
                console.log(`Connecting to ${API_URL}/properties?${queryString}`);
                const res = await fetch(`${API_URL}/properties?${queryString}`);

                if (!res.ok) {
                    throw new Error(`Server returned status: ${res.status}`);
                }

                const data = await res.json();

                if (data.success) {
                    const properties = data.data;

                    if (properties.length === 0) {
                        allPropertiesContainer.innerHTML = '';
                        if (noResultsElement) {
                            noResultsElement.style.display = 'block';
                            noResultsElement.innerHTML = `<h3>No properties found</h3><p>The database is connected but has no listings matching your criteria.</p>`;
                        } else {
                            allPropertiesContainer.innerHTML = '<h3>No properties found</h3>';
                        }
                        return;
                    }

                    if (noResultsElement) {
                        noResultsElement.style.display = 'none';
                    }

                    allPropertiesContainer.innerHTML = '';
                    properties.forEach(property => {
                        allPropertiesContainer.innerHTML += createPropertyCard(property);
                    });

                    addPropertyCardClickEvents();

                    // Populate cities only on initial load
                    if (!queryString) populateCityFilter(properties);
                } else {
                    allPropertiesContainer.innerHTML = `<div style="color:red; text-align:center;"><h3>API Error</h3><p>${data.error}</p></div>`;
                }
            } catch (err) {
                console.error('Fetch error:', err);
                allPropertiesContainer.innerHTML = `<div style="color:red; text-align:center; padding:20px;">
                    <h3>Connection Error</h3>
                    <p>Could not load properties from <strong>${API_URL}</strong>.</p>
                    <p>Error details: ${err.message}</p>
                    <p>Please ensure the server is running on port 5000.</p>
                </div>`;
            }
        }
    }

    // Function to populate city filter options
    function populateCityFilter(properties) {
        const cityFilter = document.getElementById('filter-city');
        if (cityFilter && cityFilter.options.length <= 1) { // Prevents duplicating options
            const cities = [...new Set(properties.map(property => property.city))];
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                cityFilter.appendChild(option);
            });
        }
    }

    // Function to apply filters
    function applyFilters() {
        const typeFilter = document.getElementById('filter-type').value;
        const statusFilter = document.getElementById('filter-status').value;
        const cityFilter = document.getElementById('filter-city').value;
        const minPrice = document.getElementById('price-min').value;
        const maxPrice = document.getElementById('price-max').value;

        const params = new URLSearchParams();
        if (typeFilter !== 'all') params.append('type', typeFilter);
        if (statusFilter !== 'all') params.append('status', statusFilter);
        if (cityFilter !== 'all') params.append('city', cityFilter);
        if (minPrice) params.append('price[gte]', minPrice);
        if (maxPrice) params.append('price[lte]', maxPrice);

        displayAllProperties(params.toString());
    }

    // Function to add click events to property cards
    function addPropertyCardClickEvents() {
        const propertyCards = document.querySelectorAll('.property-card');
        propertyCards.forEach(card => {
            card.addEventListener('click', function () {
                const propertyId = this.getAttribute('data-id');
                window.location.href = `property-details.html?id=${propertyId}`;
            });
        });
    }

    // Function to display property details
    async function displayPropertyDetails() {
        const propertyDetailsContainer = document.getElementById('property-details');
        const similarPropertiesContainer = document.getElementById('similar-properties');

        if (propertyDetailsContainer) {
            const urlParams = new URLSearchParams(window.location.search);
            const propertyId = urlParams.get('id');

            if (!propertyId) {
                window.location.href = 'view-all.html';
                return;
            }

            try {
                const res = await fetch(`${API_URL}/properties/${propertyId}`);
                const data = await res.json();

                if (!data.success) {
                    window.location.href = 'view-all.html';
                    return;
                }

                const property = data.data;

                // Display property details
                propertyDetailsContainer.innerHTML = `
                    <div class="property-details-image">
                        <img src="${property.image}" alt="${property.title}" onerror="this.src='https://via.placeholder.com/800x400?text=No+Image'">
                    </div>
                    <div class="property-details-info">
                        <div class="property-details-header">
                            <div class="property-details-title">
                                <h2>${property.title}</h2>
                                <div class="property-details-location">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span>${property.location}</span>
                                </div>
                            </div>
                            <div class="property-details-price">
                                ${property.status === 'for-sale' ? '$' + property.price.toLocaleString() : '$' + property.price.toLocaleString() + '/month'}
                            </div>
                        </div>
                        
                        <div class="property-details-features">
                            <div class="property-details-feature">
                                <i class="fas fa-ruler-combined"></i>
                                <span>${property.area} sq ft</span>
                            </div>
                            <div class="property-details-feature">
                                <i class="fas fa-bed"></i>
                                <span>${property.bedrooms} ${property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                            </div>
                            <div class="property-details-feature">
                                <i class="fas fa-bath"></i>
                                <span>${property.bathrooms} ${property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
                            </div>
                            <div class="property-details-feature">
                                <i class="fas fa-home"></i>
                                <span>${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</span>
                            </div>
                        </div>
                        
                        <div class="property-details-description">
                            <h3>Description</h3>
                            <p>${property.description}</p>
                        </div>
                        
                        <div class="property-details-amenities">
                            <h3>Amenities</h3>
                            <div class="amenities-list">
                                ${property.features && property.features.includes('parking') ? '<div class="amenity-item"><i class="fas fa-car"></i><span>Parking</span></div>' : ''}
                                ${property.features && property.features.includes('ac') ? '<div class="amenity-item"><i class="fas fa-snowflake"></i><span>Air Conditioning</span></div>' : ''}
                                ${property.features && property.features.includes('pool') ? '<div class="amenity-item"><i class="fas fa-swimming-pool"></i><span>Swimming Pool</span></div>' : ''}
                                ${property.features && property.features.includes('gym') ? '<div class="amenity-item"><i class="fas fa-dumbbell"></i><span>Gym</span></div>' : ''}
                                ${property.features && property.features.includes('security') ? '<div class="amenity-item"><i class="fas fa-shield-alt"></i><span>Security</span></div>' : ''}
                                ${property.features && property.features.includes('balcony') ? '<div class="amenity-item"><i class="fas fa-door-open"></i><span>Balcony</span></div>' : ''}
                            </div>
                        </div>
                    </div>
                `;

                // Display similar properties
                if (similarPropertiesContainer) {
                    const resSim = await fetch(`${API_URL}/properties?type=${property.type}&limit=3`);
                    const dataSim = await resSim.json();

                    if (dataSim.success) {
                        const similarProperties = dataSim.data.filter(p => p._id !== property._id);
                        similarPropertiesContainer.innerHTML = '';
                        similarProperties.forEach(prop => {
                            similarPropertiesContainer.innerHTML += createPropertyCard(prop);
                        });
                        addPropertyCardClickEvents();
                    }
                }

            } catch (err) {
                console.error(err);
            }
        }
    }

    // Function to handle property form submission
    function handlePropertyFormSubmission() {
        const propertyForm = document.getElementById('property-form');

        if (propertyForm) {
            propertyForm.addEventListener('submit', async function (e) {
                e.preventDefault();

                const token = localStorage.getItem('token');
                if (!token) {
                    alert('You must be logged in to add a property');
                    window.location.href = 'login.html';
                    return;
                }

                // Get form values
                const title = document.getElementById('property-title').value;
                const type = document.getElementById('property-type').value;
                const status = document.getElementById('property-status').value;

                // Parse numeric values explicitly
                const price = parseFloat(document.getElementById('property-price').value);
                const area = parseFloat(document.getElementById('property-area').value);
                const bedrooms = parseFloat(document.getElementById('property-bedrooms').value);
                const bathrooms = parseFloat(document.getElementById('property-bathrooms').value);

                const city = document.getElementById('property-city').value;
                const location = document.getElementById('property-location').value;
                const description = document.getElementById('property-description').value;
                const image = document.getElementById('property-image').value ||
                    'https://images.unsplash.com/photo-1560518883-ce09059eeffa';

                // Get features
                const features = [];
                if (document.getElementById('feature-parking').checked) features.push('parking');
                if (document.getElementById('feature-ac').checked) features.push('ac');
                if (document.getElementById('feature-pool').checked) features.push('pool');
                if (document.getElementById('feature-gym').checked) features.push('gym');
                if (document.getElementById('feature-security').checked) features.push('security');
                if (document.getElementById('feature-balcony').checked) features.push('balcony');

                const newProperty = {
                    title, type, status, price, area, bedrooms, bathrooms, city, location, description, image, features
                };

                try {
                    const res = await fetch(`${API_URL}/properties`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(newProperty)
                    });

                    const data = await res.json();

                    if (data.success) {
                        alert('Property added successfully!');
                        propertyForm.reset();
                        window.location.href = 'view-all.html';
                    } else {
                        console.error('Server error response:', data);
                        alert(`Failed to add property: ${data.error}`);
                    }
                } catch (err) {
                    console.error('Network error:', err);
                    alert('An error occurred while communicating with the server. Please check the console for details.');
                }
            });
        }
    }

    // Initialize functions based on current page
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === '' || currentPage === 'index.html') {
        displayFeaturedProperties();
    } else if (currentPage === 'view-all.html') {
        displayAllProperties();

        const applyFiltersBtn = document.getElementById('apply-filters');
        const resetFiltersBtn = document.getElementById('reset-filters');

        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', applyFilters);
        }

        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', function () {
                document.getElementById('filter-type').value = 'all';
                document.getElementById('filter-status').value = 'all';
                document.getElementById('filter-city').value = 'all';
                document.getElementById('price-min').value = '';
                document.getElementById('price-max').value = '';

                displayAllProperties();
            });
        }
    } else if (currentPage === 'property-details.html') {
        displayPropertyDetails();
    } else if (currentPage === 'add-property.html') {
        // Protect this route
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'login.html';
        } else {
            handlePropertyFormSubmission();
        }
    }
});
