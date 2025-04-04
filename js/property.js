document.addEventListener('DOMContentLoaded', function() {
    // Sample property data (in a real application, this would come from a database)
    let properties = localStorage.getItem('properties') ? 
        JSON.parse(localStorage.getItem('properties')) : 
        [
            {
                id: 1,
                title: "Modern Apartment with Ocean View",
                type: "apartment",
                status: "for-sale",
                price: 350000,
                area: 1200,
                bedrooms: 2,
                bathrooms: 2,
                city: "Miami",
                location: "Ocean Drive, Miami Beach",
                description: "Beautiful modern apartment with stunning ocean views. Features include an open floor plan, high-end finishes, and a spacious balcony perfect for entertaining.",
                image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                features: ["parking", "ac", "balcony", "security"]
            },
            {
                id: 2,
                title: "Spacious Family Home",
                type: "house",
                status: "for-sale",
                price: 520000,
                area: 2500,
                bedrooms: 4,
                bathrooms: 3,
                city: "Los Angeles",
                location: "Beverly Hills, Los Angeles",
                description: "Spacious family home in a quiet neighborhood. Features a large backyard, updated kitchen, and plenty of natural light throughout.",
                image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                features: ["parking", "ac", "pool", "security"]
            },
            {
                id: 3,
                title: "Downtown Loft",
                type: "condo",
                status: "for-rent",
                price: 2500,
                area: 950,
                bedrooms: 1,
                bathrooms: 1,
                city: "New York",
                location: "SoHo, New York",
                description: "Stylish downtown loft with exposed brick walls and high ceilings. Perfect for urban living with easy access to restaurants, shops, and public transportation.",
                image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                features: ["ac", "security"]
            },
            {
                id: 4,
                title: "Luxury Villa with Pool",
                type: "villa",
                status: "for-sale",
                price: 1200000,
                area: 4500,
                bedrooms: 5,
                bathrooms: 4.5,
                city: "San Diego",
                location: "La Jolla, San Diego",
                description: "Stunning luxury villa with panoramic ocean views. Features include a private pool, gourmet kitchen, home theater, and expansive outdoor living spaces.",
                image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                features: ["parking", "ac", "pool", "gym", "security", "balcony"]
            },
            {
                id: 5,
                title: "Cozy Studio Apartment",
                type: "apartment",
                status: "for-rent",
                price: 1200,
                area: 550,
                bedrooms: 0,
                bathrooms: 1,
                city: "Chicago",
                location: "River North, Chicago",
                description: "Cozy studio apartment in the heart of the city. Modern finishes, great amenities, and close to public transportation.",
                image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
                features: ["ac", "security"]
            },
            {
                id: 6,
                title: "Mountain Retreat",
                type: "house",
                status: "for-sale",
                price: 750000,
                area: 3200,
                bedrooms: 3,
                bathrooms: 2.5,
                city: "Denver",
                location: "Aspen, Colorado",
                description: "Beautiful mountain retreat with stunning views. Perfect for year-round enjoyment with skiing in the winter and hiking in the summer.",
                image: "https://images.unsplash.com/photo-1542889601-399c4f3a8402?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                features: ["parking", "ac", "security", "balcony"]
            }
        ];
    
    // Save initial properties to localStorage if not already there
    if (!localStorage.getItem('properties')) {
        localStorage.setItem('properties', JSON.stringify(properties));
    }
    
    // Function to create property card HTML
    function createPropertyCard(property) {
        return `
            <div class="property-card" data-id="${property.id}">
                <div class="property-image">
                    <img src="${property.image}" alt="${property.title}">
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
    function displayFeaturedProperties() {
        const featuredPropertiesContainer = document.getElementById('featured-properties');
        if (featuredPropertiesContainer) {
            // Display only 3 featured properties
            const featuredProperties = properties.slice(0, 3);
            
            featuredPropertiesContainer.innerHTML = '';
            featuredProperties.forEach(property => {
                featuredPropertiesContainer.innerHTML += createPropertyCard(property);
            });
            
            // Add click event to property cards
            addPropertyCardClickEvents();
        }
    }
    
    // Function to display all properties on the view-all page
    function displayAllProperties(filteredProperties = null) {
        const allPropertiesContainer = document.getElementById('all-properties');
        const noResultsElement = document.querySelector('.no-results');
        
        if (allPropertiesContainer) {
            const propertiesToDisplay = filteredProperties || properties;
            
            if (propertiesToDisplay.length === 0 && noResultsElement) {
                allPropertiesContainer.innerHTML = '';
                noResultsElement.style.display = 'block';
                return;
            }
            
            if (noResultsElement) {
                noResultsElement.style.display = 'none';
            }
            
            allPropertiesContainer.innerHTML = '';
            propertiesToDisplay.forEach(property => {
                allPropertiesContainer.innerHTML += createPropertyCard(property);
            });
            
            // Add click event to property cards
            addPropertyCardClickEvents();
        }
    }
    
    // Function to populate city filter options
    function populateCityFilter() {
        const cityFilter = document.getElementById('filter-city');
        if (cityFilter) {
            // Get unique cities
            const cities = [...new Set(properties.map(property => property.city))];
            
            // Add city options
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
        
        let filteredProperties = [...properties];
        
        // Filter by type
        if (typeFilter !== 'all') {
            filteredProperties = filteredProperties.filter(property => property.type === typeFilter);
        }
        
        // Filter by status
        if (statusFilter !== 'all') {
            filteredProperties = filteredProperties.filter(property => property.status === statusFilter);
        }
        
        // Filter by city
        if (cityFilter !== 'all') {
            filteredProperties = filteredProperties.filter(property => property.city === cityFilter);
        }
        
        // Filter by price
        if (minPrice) {
            filteredProperties = filteredProperties.filter(property => property.price >= parseInt(minPrice));
        }
        
        if (maxPrice) {
            filteredProperties = filteredProperties.filter(property => property.price <= parseInt(maxPrice));
        }
        
        displayAllProperties(filteredProperties);
    }
    
    // Function to add click events to property cards
    function addPropertyCardClickEvents() {
        const propertyCards = document.querySelectorAll('.property-card');
        propertyCards.forEach(card => {
            card.addEventListener('click', function() {
                const propertyId = this.getAttribute('data-id');
                window.location.href = `property-details.html?id=${propertyId}`;
            });
        });
    }
    
    // Function to display property details
    function displayPropertyDetails() {
        const propertyDetailsContainer = document.getElementById('property-details');
        const similarPropertiesContainer = document.getElementById('similar-properties');
        
        if (propertyDetailsContainer) {
            // Get property ID from URL
            const urlParams = new URLSearchParams(window.location.search);
            const propertyId = urlParams.get('id');
            
            if (!propertyId) {
                window.location.href = 'view-all.html';
                return;
            }
            
            // Find the property
            const property = properties.find(p => p.id === parseInt(propertyId));
            
            if (!property) {
                window.location.href = 'view-all.html';
                return;
            }
            
            // Display property details
            propertyDetailsContainer.innerHTML = `
                <div class="property-details-image">
                    <img src="${property.image}" alt="${property.title}">
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
                            ${property.features.includes('parking') ? '<div class="amenity-item"><i class="fas fa-car"></i><span>Parking</span></div>' : ''}
                            ${property.features.includes('ac') ? '<div class="amenity-item"><i class="fas fa-snowflake"></i><span>Air Conditioning</span></div>' : ''}
                            ${property.features.includes('pool') ? '<div class="amenity-item"><i class="fas fa-swimming-pool"></i><span>Swimming Pool</span></div>' : ''}
                            ${property.features.includes('gym') ? '<div class="amenity-item"><i class="fas fa-dumbbell"></i><span>Gym</span></div>' : ''}
                            ${property.features.includes('security') ? '<div class="amenity-item"><i class="fas fa-shield-alt"></i><span>Security</span></div>' : ''}
                            ${property.features.includes('balcony') ? '<div class="amenity-item"><i class="fas fa-door-open"></i><span>Balcony</span></div>' : ''}
                        </div>
                    </div>
                </div>
            `;
            
            // Display similar properties (same type or city)
            if (similarPropertiesContainer) {
                const similarProperties = properties.filter(p => 
                    p.id !== property.id && (p.type === property.type || p.city === property.city)
                ).slice(0, 3);
                
                similarPropertiesContainer.innerHTML = '';
                similarProperties.forEach(property => {
                    similarPropertiesContainer.innerHTML += createPropertyCard(property);
                });
                
                // Add click event to property cards
                addPropertyCardClickEvents();
            }
            
            // Add buy/remove property functionality
            const buyPropertyBtn = document.getElementById('buy-property');
            const removePropertyBtn = document.getElementById('remove-property');
            
            if (buyPropertyBtn) {
                buyPropertyBtn.addEventListener('click', function() {
                    alert(`Congratulations! You've purchased "${property.title}" for $${property.price.toLocaleString()}`);
                });
            }
            
            if (removePropertyBtn) {
                removePropertyBtn.addEventListener('click', function() {
                    if (confirm(`Are you sure you want to remove "${property.title}" from listings?`)) {
                        // Remove property from array
                        properties = properties.filter(p => p.id !== property.id);
                        
                        // Update localStorage
                        localStorage.setItem('properties', JSON.stringify(properties));
                        
                        // Redirect to all properties page
                        window.location.href = 'view-all.html';
                    }
                });
            }
        }
    }
    
    // Function to handle property form submission
    function handlePropertyFormSubmission() {
        const propertyForm = document.getElementById('property-form');
        
        if (propertyForm) {
            propertyForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const title = document.getElementById('property-title').value;
                const type = document.getElementById('property-type').value;
                const status = document.getElementById('property-status').value;
                const price = parseInt(document.getElementById('property-price').value);
                const area = parseInt(document.getElementById('property-area').value);
                const bedrooms = parseInt(document.getElementById('property-bedrooms').value);
                const bathrooms = parseFloat(document.getElementById('property-bathrooms').value);
                const city = document.getElementById('property-city').value;
                const location = document.getElementById('property-location').value;
                const description = document.getElementById('property-description').value;
                const image = document.getElementById('property-image').value || 
                    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80';
                
                // Get features
                const features = [];
                if (document.getElementById('feature-parking').checked) features.push('parking');
                if (document.getElementById('feature-ac').checked) features.push('ac');
                if (document.getElementById('feature-pool').checked) features.push('pool');
                if (document.getElementById('feature-gym').checked) features.push('gym');
                if (document.getElementById('feature-security').checked) features.push('security');
                if (document.getElementById('feature-balcony').checked) features.push('balcony');
                
                // Create new property object
                const newProperty = {
                    id: Date.now(), // Use timestamp as ID
                    title,
                    type,
                    status,
                    price,
                    area,
                    bedrooms,
                    bathrooms,
                    city,
                    location,
                    description,
                    image,
                    features
                };
                
                // Add to properties array
                properties.push(newProperty);
                
                // Update localStorage
                localStorage.setItem('properties', JSON.stringify(properties));
                
                // Show success message
                alert('Property added successfully!');
                
                // Reset form
                propertyForm.reset();
                
                // Redirect to all properties page
                window.location.href = 'view-all.html';
            });
        }
    }
    
    // Initialize functions based on current page
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === '' || currentPage === 'index.html') {
        displayFeaturedProperties();
    } else if (currentPage === 'view-all.html') {
        displayAllProperties();
        populateCityFilter();
        
        // Add event listeners for filters
        const applyFiltersBtn = document.getElementById('apply-filters');
        const resetFiltersBtn = document.getElementById('reset-filters');
        
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', applyFilters);
        }
        
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', function() {
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
        handlePropertyFormSubmission();
    }
});
