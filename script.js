// ==========================================
// Prime Homes - JavaScript Application Logic
// ==========================================

// Property Data Repository with photorealistic image assets
const properties = [
    {
        id: 1,
        title: "Modern Sunset Villa",
        location: "Miami, Florida",
        type: "Villa",
        price: 1650000,
        status: "For Sale",
        beds: 5,
        baths: 6,
        sqft: 5200,
        image: "images/prop_villa.jpg",
        description: "An architectural masterpiece offering floor-to-ceiling glass, private infinity pool, outdoor kitchen, and panoramic coastal views."
    },
    {
        id: 2,
        title: "Skyline Luxury Penthouse",
        location: "New York, NY",
        type: "Apartment",
        price: 3200000,
        status: "For Sale",
        beds: 3,
        baths: 3.5,
        sqft: 2800,
        image: "images/prop_apartment.jpg",
        description: "Exquisite high-floor penthouse featuring 360-degree city views, custom designer finishes, private elevator entrance, and smart home automation."
    },
    {
        id: 3,
        title: "Heritage Stone Cottage",
        location: "Austin, Texas",
        type: "Cottage",
        price: 650000,
        status: "For Rent",
        beds: 3,
        baths: 2,
        sqft: 1950,
        image: "images/prop_cottage.jpg",
        description: "Charming stone cottage featuring manicured gardens, wood-beam ceilings, modern kitchen upgrade, and serene outdoor patio area."
    },
    {
        id: 4,
        title: "Contemporary Family Residence",
        location: "Los Angeles, CA",
        type: "House",
        price: 980000,
        status: "For Sale",
        beds: 4,
        baths: 3,
        sqft: 3200,
        image: "images/prop_family.jpg",
        description: "Spacious suburban modern home featuring a open floor plan, dual garage, custom kitchen island, and glass balcony."
    },
    {
        id: 5,
        title: "Oceanfront Horizon Villa",
        location: "Malibu, CA",
        type: "Villa",
        price: 4500000,
        status: "For Sale",
        beds: 6,
        baths: 7,
        sqft: 6800,
        image: "images/prop_villa.jpg",
        description: "Unmatched waterfront coastal estate with direct beach access, resort-style infinity pool, wine cellar, and private security gates."
    },
    {
        id: 6,
        title: "Metropolis Garden Apartment",
        location: "Chicago, IL",
        type: "Apartment",
        price: 4500,
        status: "For Rent",
        beds: 2,
        baths: 2,
        sqft: 1400,
        image: "images/prop_apartment.jpg",
        description: "Modern downtown condo with exposed concrete accents, floor-to-ceiling windows, high-end stainless appliances, and balcony."
    }
];

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initProperties();
});

// Navigation & Mobile Drawer Setup
function initNavigation() {
    const menuButton = document.getElementById("menubutton");
    const navlinks = document.getElementById("navlinks");

    if (menuButton && navlinks) {
        menuButton.addEventListener("click", () => {
            navlinks.classList.toggle("active");
        });

        // Close menu when clicking outside or on a link
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navlinks.classList.remove("active");
            });
        });
    }

    // Set Active State based on current filename
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPath || (currentPath === "" && href === "index.html")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// Property Rendering & Filtering Logic
function initProperties() {
    const container = document.getElementById("properties");
    if (!container) return; // Not on properties page or home search page

    renderProperties(properties);
}

function renderProperties(list) {
    const container = document.getElementById("properties");
    if (!container) return;

    container.innerHTML = "";

    if (!list || list.length === 0) {
        container.innerHTML = `
            <div class="no-properties">
                <h3>No Properties Match Your Search</h3>
                <p>Try adjusting your search criteria or price filters to view available listings.</p>
            </div>
        `;
        return;
    }

    list.forEach(prop => {
        const formattedPrice = prop.status === "For Rent" 
            ? `$${prop.price.toLocaleString()}/mo`
            : `$${prop.price.toLocaleString()}`;

        const cardHTML = `
            <div class="property-card">
                <div class="property-img-wrapper">
                    <img src="${prop.image}" alt="${prop.title}" loading="lazy">
                    <span class="property-badge ${prop.status === 'For Rent' ? 'for-rent' : ''}">${prop.status}</span>
                    <span class="property-price-tag">${formattedPrice}</span>
                </div>
                <div class="property-body">
                    <span class="property-type">${prop.type}</span>
                    <h3 class="property-title">${prop.title}</h3>
                    <p class="property-location">📍 ${prop.location}</p>
                    
                    <div class="property-features">
                        <div class="feature-item">🛏️ <span>${prop.beds}</span> Beds</div>
                        <div class="feature-item">🚿 <span>${prop.baths}</span> Baths</div>
                        <div class="feature-item">📐 <span>${prop.sqft.toLocaleString()}</span> sqft</div>
                    </div>
                    
                    <div class="property-footer">
                        <button class="btn-details" onclick="openPropertyModal(${prop.id})">View Details</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

function filterProperties() {
    const locationInput = document.getElementById("locationInput");
    const typeInput = document.getElementById("typeInput");
    const minPriceInput = document.getElementById("minPriceInput");
    const maxPriceInput = document.getElementById("maxPriceInput");
    const statusInput = document.getElementById("statusInput");

    const searchLoc = locationInput ? locationInput.value.toLowerCase().trim() : "";
    const selectedType = typeInput ? typeInput.value : "All";
    const minPrice = minPriceInput ? parseInt(minPriceInput.value) || 0 : 0;
    const maxPrice = maxPriceInput ? parseInt(maxPriceInput.value) || 100000000 : 100000000;
    const selectedStatus = statusInput ? statusInput.value : "All";

    const filtered = properties.filter(prop => {
        const matchLocation = prop.location.toLowerCase().includes(searchLoc) || prop.title.toLowerCase().includes(searchLoc);
        const matchType = selectedType === "All" || prop.type === selectedType;
        const matchPrice = prop.price >= minPrice && prop.price <= maxPrice;
        const matchStatus = selectedStatus === "All" || prop.status === selectedStatus;

        return matchLocation && matchType && matchPrice && matchStatus;
    });

    renderProperties(filtered);
}

// Property Details Modal
function openPropertyModal(id) {
    const prop = properties.find(p => p.id === id);
    if (!prop) return;

    const modal = document.getElementById("propertyModal");
    const modalBody = document.getElementById("modalBody");

    if (!modal || !modalBody) return;

    const formattedPrice = prop.status === "For Rent" 
        ? `$${prop.price.toLocaleString()}/month`
        : `$${prop.price.toLocaleString()}`;

    modalBody.innerHTML = `
        <div style="margin-bottom: 20px;">
            <img src="${prop.image}" alt="${prop.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 15px;">
            <span class="property-badge" style="position: static; display: inline-block; margin-bottom: 10px;">${prop.status}</span>
            <h2 class="modal-title" style="margin-bottom: 5px;">${prop.title}</h2>
            <p style="color: var(--accent-gold-hover); font-size: 24px; font-weight: 800; margin-bottom: 10px;">${formattedPrice}</p>
            <p style="color: var(--text-muted); margin-bottom: 20px;">📍 ${prop.location} | Property Type: ${prop.type}</p>
            
            <div style="display: flex; gap: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
                <div><strong>Bedrooms:</strong> ${prop.beds}</div>
                <div><strong>Bathrooms:</strong> ${prop.baths}</div>
                <div><strong>Square Feet:</strong> ${prop.sqft.toLocaleString()} sqft</div>
            </div>

            <h4 style="color: var(--primary-navy); margin-bottom: 8px;">Description</h4>
            <p style="color: #475569; line-height: 1.7; margin-bottom: 25px;">${prop.description}</p>

            <form onsubmit="handleInquirySubmit(event)" style="background: #f1f5f9; padding: 20px; border-radius: 8px;">
                <h4 style="color: var(--primary-navy); margin-bottom: 15px;">Schedule a Viewing or Inquiry</h4>
                <div class="form-group">
                    <label>Your Full Name</label>
                    <input type="text" placeholder="John Doe" required>
                </div>
                <div class="form-group">
                    <label>Phone Number or Email</label>
                    <input type="text" placeholder="+234..." required>
                </div>
                <button type="submit" class="btn-navy" style="width: 100%;">Submit Request</button>
            </form>
        </div>
    `;

    modal.classList.add("active");
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("active");
    }
}

function handleInquirySubmit(e) {
    e.preventDefault();
    alert("Thank you for your interest! A Prime Homes agent will contact you shortly.");
    closeModal('propertyModal');
    closeModal('serviceModal');
}
