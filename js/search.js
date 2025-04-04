document.addEventListener('DOMContentLoaded', function() {
    // Get properties from localStorage
    const properties = localStorage.getItem('properties') ? 
        JSON.parse(localStorage.getItem('properties')) : [];
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchSubmitBtn = document.getElementById('search-submit');
    const searchOverlay = document.querySelector('.search-overlay');
    
    if (searchInput && searchSubmitBtn) {
        searchSubmitBtn.addEventListener('click', function() {
            performSearch();
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            alert('Please enter a search term');
            return;
        }
        
        // Filter properties based on search term
        const searchResults = properties.filter(property => 
            property.title.toLowerCase().includes(searchTerm) ||
            property.location.toLowerCase().includes(searchTerm) ||
            property.city.toLowerCase().includes(searchTerm) ||
            property.description.toLowerCase().includes(searchTerm)
        );
        
        // Store search results in sessionStorage
        sessionStorage.setItem('searchResults', JSON.stringify(searchResults));
        sessionStorage.setItem('searchTerm', searchTerm);
        
        // Close search overlay
        if (searchOverlay) {
            searchOverlay.classList.remove('active');
        }
        
        // Redirect to search results page (using view-all.html)
        window.location.href = window.location.pathname.includes('/pages/') ? 
            'view-all.html?search=true' : 
            'pages/view-all.html?search=true';
    }
    
    // Display search results if coming from search
    const urlParams = new URLSearchParams(window.location.search);
    const isSearch = urlParams.get('search');
    
    if (isSearch && currentPage === 'view-all.html') {
        const searchResults = JSON.parse(sessionStorage.getItem('searchResults') || '[]');
        const searchTerm = sessionStorage.getItem('searchTerm');
        
        // Update page header to show search results
        const pageHeader = document.querySelector('.page-header');
        if (pageHeader) {
            pageHeader.innerHTML = `
                <h1>Search Results</h1>
                <p>Found ${searchResults.length} properties matching "${searchTerm}"</p>
            `;
        }
        
        // Display search results
        displayAllProperties(searchResults);
    }
});
