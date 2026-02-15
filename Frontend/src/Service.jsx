import React, { useState } from "react";
import "./Service.css"; // Keep your CSS as-is
import Footer from "./CommonComonent/Footer";

const servicesData = [
    {
        id: 1,
        category: "Plumbing",
        title: "Pipe Repair & Installation",
        description:
            "Professional pipe repair, replacement, and installation services for residential and commercial properties.",
        image: "https://picsum.photos/seed/plumbing1/400/300.jpg",
        badge: "Popular",
        provider: { name: "John Davis", title: "Master Plumber", avatar: "JD" },
        price: 75,
        rating: 4.8,
        reviews: 24,
    },
    {
        id: 2,
        category: "Electrical",
        title: "Electrical Panel Upgrade",
        description:
            "Upgrade your electrical panel for better safety and capacity. Licensed electricians available.",
        image: "https://picsum.photos/seed/electrical1/400/300.jpg",
        badge: null,
        provider: { name: "Sarah Miller", title: "Licensed Electrician", avatar: "SM" },
        price: 95,
        rating: 5.0,
        reviews: 18,
    },
    {
        id: 3,
        category: "HVAC",
        title: "AC Installation & Repair",
        description:
            "Complete air conditioning services including installation, repair, and maintenance for all brands.",
        image: "https://picsum.photos/seed/hvac1/400/300.jpg",
        badge: "Best Value",
        provider: { name: "Mike Johnson", title: "HVAC Specialist", avatar: "MJ" },
        price: 85,
        rating: 4.7,
        reviews: 32,
    },
    {
        id: 4,
        category: "Carpentry",
        title: "Custom Furniture Building",
        description:
            "Design and build custom furniture pieces tailored to your space and style preferences.",
        image: "https://picsum.photos/seed/carpentry1/400/300.jpg",
        badge: null,
        provider: { name: "Robert Brown", title: "Master Carpenter", avatar: "RB" },
        price: 65,
        rating: 4.2,
        reviews: 15,
    },
    {
        id: 5,
        category: "Appliance Repair",
        title: "Washing Machine Repair",
        description:
            "Fast and reliable washing machine repair service for all major brands and models.",
        image: "https://picsum.photos/seed/appliance1/400/300.jpg",
        badge: "Emergency",
        provider: { name: "Tom Wilson", title: "Appliance Technician", avatar: "TW" },
        price: 70,
        rating: 4.9,
        reviews: 28,
    },
    {
        id: 6,
        category: "Cleaning",
        title: "Deep House Cleaning",
        description: "Thorough deep cleaning service for your entire home. Eco-friendly products used.",
        image: "https://picsum.photos/seed/cleaning1/400/300.jpg",
        badge: null,
        provider: { name: "Lisa Garcia", title: "Cleaning Specialist", avatar: "LG" },
        price: 50,
        rating: 4.6,
        reviews: 41,
    },
];

function Service() {
    const [activeCategory, setActiveCategory] = useState("All Services");
    const [viewMode, setViewMode] = useState("grid"); // grid or list
    const [searchTerm, setSearchTerm] = useState("");

    // Filter services based on active category and search
    const filteredServices = servicesData.filter((service) => {
        const matchesCategory =
            activeCategory === "All Services" || service.category === activeCategory;
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div>


            {/* Services Section */}
            <section className="services-section">
                <div className="services-container">
                    <div className="section-header">
                        <h2 className="section-title">Available Services</h2>
                        <div className="view-toggle">
                            <div
                                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                                onClick={() => setViewMode("grid")}
                            >
                                <i className="fas fa-th"></i>
                            </div>
                            <div
                                className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                                onClick={() => setViewMode("list")}
                            >
                                <i className="fas fa-list"></i>
                            </div>
                        </div>
                    </div>

                    {/* Grid View */}
                    <div className={`services-grid ${viewMode === "list" ? "list-view" : ""}`}>
                        {filteredServices.map((service) => (
                            <div className="service-card" key={service.id}>
                                <div
                                    className="service-image"
                                    style={{ backgroundImage: `url(${service.image})` }}
                                >
                                    {service.badge && <div className="service-badge">{service.badge}</div>}
                                </div>
                                <div className="service-content">
                                    <div className="service-category">{service.category}</div>
                                    <h3 className="service-title">{service.title}</h3>
                                    <p className="service-description">{service.description}</p>
                                    <div className="service-provider">
                                        <div className="provider-avatar">{service.provider.avatar}</div>
                                        <div className="provider-info">
                                            <div className="provider-name">{service.provider.name}</div>
                                            <div className="provider-title">{service.provider.title}</div>
                                        </div>
                                    </div>
                                    <div className="service-footer">
                                        <div className="service-price">${service.price} <span>/hour</span></div>
                                        <div className="service-rating">
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <i
                                                    key={i}
                                                    className={`fas fa-star${i + 0.5 >= service.rating ? "-half-alt" : ""}`}
                                                ></i>
                                            ))}
                                            <span>{service.rating} ({service.reviews})</span>
                                        </div>
                                    </div>
                                    <button className="btn-book">Book Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Service;
