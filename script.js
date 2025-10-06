// Main JavaScript file for Silk Elegance website

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    // Initialize based on current page
    const currentPage = window.location.pathname.split('/').pop();
    
    // Common functionality for all pages
    initializeNavigation();
    initializeFooter();
    initializeDemoBanner();
    
    // Initialize core features
    initializeCoreFeatures();
    
    // Page-specific initialization
    switch(currentPage) {
        case 'index.html':
        case '':
            initializeHomepage();
            break;
        case 'shop.html':
            initializeShop();
            break;
        case 'gallery.html':
            initializeGallery();
            break;
        case 'contact.html':
            initializeContact();
            break;
    }
}

// Initialize core features
function initializeCoreFeatures() {
    // Initialize shopping cart
    window.sareeCart = new ShoppingCart();
    
    // Initialize wishlist
    window.sareeWishlist = new Wishlist();
    
    // Initialize search
    window.sareeSearch = new Search();
}

// Mobile Navigation Functionality
class MobileNavigation {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navIcons = document.querySelectorAll('.nav-icon');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Hamburger click
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMenu();
            });
        }

        // Close menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Close menu when clicking on icons (except search)
        this.navIcons.forEach(icon => {
            if (!icon.classList.contains('search-icon')) {
                icon.addEventListener('click', () => {
                    this.closeMenu();
                });
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.navMenu && this.navMenu.classList.contains('active') && 
                !this.navMenu.contains(e.target) && 
                this.hamburger && !this.hamburger.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu && this.navMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });

        // Close menu on window resize (if resizing to larger screen)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (this.navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }

    closeMenu() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.classList.remove('active');
            this.navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    openMenu() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.classList.add('active');
            this.navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
}

// Navigation functionality
function initializeNavigation() {
    // Initialize mobile navigation
    window.mobileNav = new MobileNavigation();
    
    // Sticky navigation on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }
    });
}

// Footer functionality
function initializeFooter() {
    // Add current year to copyright
    const copyrightElement = document.querySelector('.footer-bottom p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = `&copy; ${currentYear} Silk Elegance. All rights reserved.`;
    }
}

// Demo Banner Close Functionality
function initializeDemoBanner() {
    const demoBanner = document.querySelector('.demo-banner');
    const closeBtn = document.getElementById('demo-close');
    
    if (closeBtn && demoBanner) {
        closeBtn.addEventListener('click', function() {
            demoBanner.style.display = 'none';
            // Adjust other elements after banner is closed
            const navbar = document.querySelector('.navbar');
            const pageHeader = document.querySelector('.page-header');
            const hero = document.querySelector('.hero');
            
            if (navbar) navbar.style.top = '0';
            if (pageHeader) pageHeader.style.marginTop = '70px';
            if (hero) hero.style.marginTop = '70px';
        });
    }
}

// Homepage functionality
function initializeHomepage() {
    initializeHeroSlider();
    initializeFeaturedProducts();
    initializeStyleQuiz();
}

// Hero Slider functionality
function initializeHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Next slide function
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slideCount;
        showSlide(nextIndex);
    }
    
    // Previous slide function
    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slideCount) % slideCount;
        showSlide(prevIndex);
    }
    
    // Event listeners for buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Featured products functionality
function initializeFeaturedProducts() {
    const productGrid = document.querySelector('.featured .product-grid');
    
    if (!productGrid) return;
    
    // Sample product data
    const featuredProducts = [
        {
            id: 1,
            name: 'Banarasi Silk Saree',
            price: '₹8,999',
            image: 'https://plus.unsplash.com/premium_photo-1669977749819-d8737b4408f7?q=80&w=1178&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            badge: 'Bestseller'
        },
        {
            id: 2,
            name: 'Kanjivaram Silk',
            price: '₹12,499',
            image: 'https://images.unsplash.com/photo-1610030468706-9a6dbad49b0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fEthbmppdmFyYW0lMjBTaWxrfGVufDB8fDB8fHww',
            badge: 'New'
        },
        {
            id: 3,
            name: 'Chanderi Cotton Saree',
            price: '₹4,999',
            image: 'https://www.utpaladesigns.com/cdn/shop/files/image6.jpg?v=1692276151&width=1946',
            badge: ''
        },
        {
            id: 4,
            name: 'Designer Georgette',
            price: '₹6,499',
            image: 'https://cdn.exoticindia.com/images/products/original/textiles-01-2025/gak610-classicrose.jpg',
            badge: 'Popular'
        },
        {
            id: 5,
            name: 'Bridal Silk Saree',
            price: '₹15,999',
            image: 'https://images.indianweddingsaree.com/product-image/1973230/1.jpg',
            badge: 'Bestseller'
        },
        {
            id: 6,
            name: 'Printed Cotton Saree',
            price: '₹3,499',
            image: 'https://jaipurtex.com/cdn/shop/files/001A0041.webp?v=1717072432&width=1946',
            badge: ''
        }
    ];
    
    // Generate product cards with wishlist buttons
    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <button class="wishlist-btn" data-id="${product.id}">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${product.price}</div>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="wishlist" data-id="${product.id}">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners for wishlist buttons in product image
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            if (window.sareeWishlist) {
                // Find the corresponding wishlist button in product actions
                const actionWishlistBtn = this.closest('.product-card').querySelector('.product-actions .wishlist');
                window.sareeWishlist.toggleWishlist(productId, actionWishlistBtn);
            }
        });
    });
}

// Style Quiz functionality
function initializeStyleQuiz() {
    const quizBtn = document.getElementById('quiz-btn');
    const quizModal = document.getElementById('quiz-modal');
    const closeModal = quizModal ? quizModal.querySelector('.close') : null;
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const currentQuestionEl = document.getElementById('current-question');
    const progressBar = document.querySelector('.progress');
    const quizQuestions = document.querySelector('.quiz-questions');
    
    if (!quizBtn || !quizModal) return;
    
    // Quiz questions data
    const quizData = [
        {
            question: "What's your preferred saree occasion?",
            options: [
                { text: "Wedding/Formal Event", value: "formal" },
                { text: "Festival/Celebration", value: "festival" },
                { text: "Casual/Everyday Wear", value: "casual" },
                { text: "Party/Evening Out", value: "party" }
            ]
        },
        {
            question: "Which fabric do you feel most comfortable in?",
            options: [
                { text: "Silk", value: "silk" },
                { text: "Cotton", value: "cotton" },
                { text: "Georgette/Chiffon", value: "light" },
                { text: "Velvet", value: "velvet" }
            ]
        },
        {
            question: "What's your preferred color palette?",
            options: [
                { text: "Bright & Vibrant", value: "bright" },
                { text: "Pastel & Soft", value: "pastel" },
                { text: "Rich & Deep", value: "rich" },
                { text: "Neutral & Earthy", value: "neutral" }
            ]
        },
        {
            question: "How do you like your sarees to be adorned?",
            options: [
                { text: "Heavy Embroidery & Zari", value: "heavy" },
                { text: "Minimal Embellishment", value: "minimal" },
                { text: "Printed Patterns", value: "printed" },
                { text: "Traditional Motifs", value: "traditional" }
            ]
        },
        {
            question: "What's your preferred saree length?",
            options: [
                { text: "Standard (5.5-6 meters)", value: "standard" },
                { text: "Pre-stitched/Petticoat Attached", value: "prestitched" },
                { text: "Lehenga Style", value: "lehenga" },
                { text: "No Preference", value: "any" }
            ]
        }
    ];
    
    let currentQuestion = 0;
    let userAnswers = [];
    
    // Open quiz modal
    quizBtn.addEventListener('click', function() {
        quizModal.style.display = 'block';
        currentQuestion = 0;
        userAnswers = [];
        renderQuestion(currentQuestion);
    });
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            quizModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === quizModal) {
            quizModal.style.display = 'none';
        }
    });
    
    // Next question
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentQuestion < quizData.length - 1) {
                currentQuestion++;
                renderQuestion(currentQuestion);
            } else {
                // Quiz completed
                showQuizResults();
            }
        });
    }
    
    // Previous question
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentQuestion > 0) {
                currentQuestion--;
                renderQuestion(currentQuestion);
            }
        });
    }
    
    // Render question function
    function renderQuestion(index) {
        const questionData = quizData[index];
        
        // Update progress
        if (currentQuestionEl) currentQuestionEl.textContent = index + 1;
        if (progressBar) {
            const progressPercentage = ((index + 1) / quizData.length) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
        
        // Update button text for last question
        if (nextBtn) {
            if (index === quizData.length - 1) {
                nextBtn.textContent = 'See Results';
            } else {
                nextBtn.textContent = 'Next';
            }
        }
        
        // Enable/disable previous button
        if (prevBtn) {
            prevBtn.disabled = index === 0;
        }
        
        // Generate question HTML
        let questionHTML = `
            <div class="quiz-question ${index === 0 ? 'active' : ''}">
                <h3>${questionData.question}</h3>
                <div class="quiz-options">
        `;
        
        questionData.options.forEach((option, i) => {
            const isSelected = userAnswers[index] === option.value;
            questionHTML += `
                <div class="quiz-option ${isSelected ? 'selected' : ''}" data-value="${option.value}">
                    ${option.text}
                </div>
            `;
        });
        
        questionHTML += `
                </div>
            </div>
        `;
        
        if (quizQuestions) {
            quizQuestions.innerHTML = questionHTML;
        }
        
        // Add event listeners to options
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options
                options.forEach(opt => opt.classList.remove('selected'));
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Store user answer
                userAnswers[index] = this.getAttribute('data-value');
                
                // Enable next button
                if (nextBtn) nextBtn.disabled = false;
            });
        });
        
        // Enable next button if user has already selected an option
        if (nextBtn) nextBtn.disabled = !userAnswers[index];
    }
    
    // Show quiz results
    function showQuizResults() {
        // Simple result calculation based on answers
        const result = calculateQuizResult(userAnswers);
        
        // Display results
        if (quizQuestions) {
            quizQuestions.innerHTML = `
                <div class="quiz-results">
                    <h3>Your Perfect Saree Style</h3>
                    <div class="result-image">
                        <img src="${result.image}" alt="${result.style}">
                    </div>
                    <h4>${result.style}</h4>
                    <p>${result.description}</p>
                    <div class="result-actions">
                        <a href="shop.html" class="btn">Shop Similar Sarees</a>
                    </div>
                </div>
            `;
        }
        
        // Hide navigation buttons
        const quizNav = document.querySelector('.quiz-nav');
        if (quizNav) quizNav.style.display = 'none';
    }
    
    // Calculate quiz result (simplified)
    function calculateQuizResult(answers) {
        const results = [
            {
                style: "Royal Banarasi",
                description: "You prefer rich, traditional sarees with intricate work. Perfect for weddings and formal events.",
                image: "https://medias.utsavfashion.com/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/p/u/pure-banarasi-georgette-silk-handloom-saree-in-royal-blue-v1-swz1216.jpg"
            },
            {
                style: "Elegant Kanjivaram",
                description: "You appreciate classic beauty with a touch of grandeur. Ideal for festive occasions.",
                image: "https://medias.utsavfashion.com/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/p/u/pure-kanjivaram-silk-saree-in-red-v1-swz1216.jpg"
            },
            {
                style: "Contemporary Chic",
                description: "You love modern designs that blend tradition with contemporary aesthetics.",
                image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
            },
            {
                style: "Light & Airy",
                description: "You prefer comfortable, flowy sarees perfect for casual wear and parties.",
                image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
            }
        ];
        
        // Simple algorithm to determine result based on answers
        let score = 0;
        answers.forEach(answer => {
            if (answer === "formal" || answer === "silk" || answer === "rich" || answer === "heavy") {
                score += 2; // Traditional preference
            } else if (answer === "festival" || answer === "light" || answer === "bright" || answer === "traditional") {
                score += 1; // Balanced preference
            } else {
                score += 0; // Modern preference
            }
        });
        
        // Determine result based on score
        if (score >= 8) {
            return results[0]; // Royal Banarasi
        } else if (score >= 5) {
            return results[1]; // Elegant Kanjivaram
        } else if (score >= 3) {
            return results[2]; // Contemporary Chic
        } else {
            return results[3]; // Light & Airy
        }
    }
}

// Shop page functionality
function initializeShop() {
    initializeProductGrid();
    initializeFilters();
    initializePagination(); 
}

// Initialize product grid on shop page
function initializeProductGrid() {
    const productGrid = document.getElementById('product-grid');
    
    if (!productGrid) return;
    
    // Sample product data for shop page
    const products = [
        { id: 1, name: 'Banarasi Silk Saree', price: '₹8,999', category: 'silk', image: 'https://thedeeva.com/cdn/shop/files/bwvsk-5119_53562655251_o.jpg?v=1711008838' },
        { id: 2, name: 'Kanjivaram Silk', price: '₹12,499', category: 'silk', image: 'https://www.fabfunda.com/product-img/elegant-semi-kanjivaram-silk-s-1719318501.jpeg' },
        { id: 3, name: 'Chanderi Cotton Saree', price: '₹4,999', category: 'cotton', image: 'https://thenmozhidesigns.com/cdn/shop/files/KRAN0886.jpg?v=1713591688&width=1000' },
        { id: 4, name: 'Designer Georgette', price: '₹6,499', category: 'designer', image: 'https://cdn.exoticindia.com/images/products/original/textiles-01-2025/gak610-classicrose.jpg' },
        { id: 5, name: 'Bridal Silk Saree', price: '₹15,999', category: 'bridal', image: 'https://images.indianweddingsaree.com/product-image/1973230/1.jpg' },
        { id: 6, name: 'Printed Cotton Saree', price: '₹3,499', category: 'cotton', image: 'https://jaipurtex.com/cdn/shop/files/001A0041.webp?v=1717072432&width=1946' },
        { id: 7, name: 'Embroidered Silk', price: '₹9,999', category: 'silk', image: 'https://media.urbanwomania.com/wp-content/uploads/2023/12/Off-White-Embroidered-Silk-Saree-4.jpg' },
        { id: 8, name: 'Party Wear Saree', price: '₹7,499', category: 'designer', image: 'https://cdn.sapnaaz.com/uploads/2024/10/15172505/1307-1-1.webp' },
        { id: 9, name: 'Traditional Silk', price: '₹11,999', category: 'silk', image: 'https://www.vastranand.in/cdn/shop/files/4_fd6f214c-5ad2-483b-bc8f-e16ddd298bd2.jpg?v=1743078291' },
        { id: 10, name: 'Casual Cotton Saree', price: '₹2,999', category: 'cotton', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYDnjgIsK8zxU83pxjNwZ7OLw-16l4O-PTRA&s' },
        { id: 11, name: 'Festive Silk Saree', price: '₹13,499', category: 'bridal', image: 'https://images.cbazaar.com/images/floral-print-firoji-zari-silk-saree-sasrf27558-u.jpg' },
        { id: 12, name: 'Lightweight Georgette', price: '₹5,499', category: 'designer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1TY12R3eNbjaiNFajVO3kjEW076mE67hciw&s' }
    ];
    
    // Render products
    renderProducts(products);
    
    // Function to render products
    function renderProducts(productsToRender) {
        productGrid.innerHTML = '';
        
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <button class="wishlist-btn" data-id="${product.id}">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">${product.price}</div>
                    <div class="product-actions">
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                        <button class="wishlist" data-id="${product.id}">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            `;
            
            productGrid.appendChild(productCard);
        });
        
        // Add event listeners for wishlist buttons in product image
        const wishlistBtns = document.querySelectorAll('.wishlist-btn');
        wishlistBtns.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                if (window.sareeWishlist) {
                    // Find the corresponding wishlist button in product actions
                    const actionWishlistBtn = this.closest('.product-card').querySelector('.product-actions .wishlist');
                    window.sareeWishlist.toggleWishlist(productId, actionWishlistBtn);
                }
            });
        });
    }
}

// Initialize filters on shop page
function initializeFilters() {
    const categoryFilter = document.getElementById('category');
    const priceFilter = document.getElementById('price');
    const sortFilter = document.getElementById('sort');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', sortProducts);
    }
    
    function filterProducts() {
        console.log('Filters applied');
    }
    
    function sortProducts() {
        console.log('Products sorted');
    }
}

// Initialize pagination on shop page
function initializePagination() {
    const pageButtons = document.querySelectorAll('.page-btn');
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            pageButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            console.log('Page changed');
        });
    });
}

// Gallery page functionality
function initializeGallery() {
    initializeGalleryFilters();
    initializeTestimonialSlider();
    initializeImageModal();
}

// Initialize gallery filters
function initializeGalleryFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show/hide gallery items based on filter
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Initialize testimonial slider on gallery page
function initializeTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    
    if (!testimonials.length) return;
    
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        currentTestimonial = index;
    }
    
    function nextTestimonial() {
        let nextIndex = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }
    
    function prevTestimonial() {
        let prevIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(prevIndex);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevTestimonial);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextTestimonial);
    }
    
    // Auto slide testimonials
    setInterval(nextTestimonial, 7000);
}

// Initialize image modal for gallery
function initializeImageModal() {
    const modal = document.getElementById('image-modal');
    const closeModal = modal ? modal.querySelector('.close') : null;
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const viewButtons = document.querySelectorAll('.btn-view');
    
    if (!modal) return;
    
    // Open modal when view button is clicked
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const galleryItem = this.closest('.gallery-item');
            if (galleryItem) {
                const imageSrc = galleryItem.querySelector('img').src;
                const title = galleryItem.querySelector('h3').textContent;
                const description = galleryItem.querySelector('p').textContent;
                
                if (modalImg) modalImg.src = imageSrc;
                if (modalTitle) modalTitle.textContent = title;
                if (modalDesc) modalDesc.textContent = description;
                
                modal.style.display = 'block';
            }
        });
    });
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Contact page functionality
function initializeContact() {
    initializeContactForm();
}

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // In a real application, you would send the form data to a server
        // For this demo, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Shopping Cart Functionality
class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('sareeCart')) || [];
        this.initCart();
    }

    // Initialize cart functionality
    initCart() {
        this.updateCartCounter();
        this.setupCartEventListeners();
    }

    // Setup event listeners for cart interactions
    setupCartEventListeners() {
        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart') || 
                e.target.closest('.add-to-cart')) {
                const button = e.target.classList.contains('add-to-cart') ? 
                    e.target : e.target.closest('.add-to-cart');
                const productId = button.getAttribute('data-id');
                this.addToCart(productId);
            }
        });

        // Cart icon click
        const cartIcon = document.querySelector('.nav-icon .fa-shopping-cart');
        if (cartIcon) {
            cartIcon.addEventListener('click', (e) => {
                e.preventDefault();
                this.showCartModal();
            });
        }
    }

    // Add product to cart
    addToCart(productId) {
        // Get product details (in real app, this would come from a database)
        const product = this.getProductDetails(productId);
        
        if (!product) {
            console.error('Product not found');
            return;
        }

        // Check if product already in cart
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartCounter();
        this.showAddToCartAnimation();
        
        // Show confirmation message
        this.showCartNotification(`${product.name} added to cart!`);
    }

    // Get product details (mock data - replace with actual product data)
    getProductDetails(productId) {
        const products = {
            '1': { id: '1', name: 'Banarasi Silk Saree', price: 8999, image: 'https://images.unsplash.com/photo-1585487000113-679b4c1d2d28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            '2': { id: '2', name: 'Kanjivaram Silk', price: 12499, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            '3': { id: '3', name: 'Chanderi Cotton Saree', price: 4999, image: 'https://images.unsplash.com/photo-1631148557880-e003a16bf70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            '4': { id: '4', name: 'Designer Georgette', price: 6499, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            '5': { id: '5', name: 'Bridal Silk Saree', price: 15999, image: 'https://images.unsplash.com/photo-1585487000113-679b4c1d2d28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            '6': { id: '6', name: 'Printed Cotton Saree', price: 3499, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            '7': { id: '7', name: 'Embroidered Silk', price: 9999, image: 'https://images.unsplash.com/photo-1631148557880-e003a16bf70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            '8': { id: '8', name: 'Party Wear Saree', price: 7499, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            '9': { id: '9', name: 'Traditional Silk', price: 11999, image: 'https://images.unsplash.com/photo-1585487000113-679b4c1d2d28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' }
        };
        
        return products[productId];
    }

    // Remove item from cart
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCounter();
        this.renderCartItems();
    }

    // Update item quantity
    updateQuantity(productId, newQuantity) {
        if (newQuantity < 1) {
            this.removeFromCart(productId);
            return;
        }

        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.renderCartItems();
        }
    }

    // Calculate total price
    calculateTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get total items count
    getTotalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('sareeCart', JSON.stringify(this.cart));
    }

    // Update cart counter in navigation
    updateCartCounter() {
        const cartIcons = document.querySelectorAll('.nav-icon .fa-shopping-cart');
        const totalItems = this.getTotalItems();
        
        cartIcons.forEach(icon => {
            // Remove existing counter
            let counter = icon.parentElement.querySelector('.cart-counter');
            if (counter) {
                counter.remove();
            }
            
            // Add counter if items exist
            if (totalItems > 0) {
                counter = document.createElement('span');
                counter.className = 'cart-counter';
                counter.textContent = totalItems;
                icon.parentElement.appendChild(counter);
            }
        });
    }

    // Show add to cart animation
    showAddToCartAnimation() {
        const cartIcon = document.querySelector('.nav-icon .fa-shopping-cart');
        if (cartIcon) {
            cartIcon.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 300);
        }
    }

    // Show cart notification
    showCartNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary);
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: var(--shadow);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.parentElement.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Show cart modal
    showCartModal() {
        // Create modal if it doesn't exist
        let cartModal = document.getElementById('cart-modal');
        if (!cartModal) {
            cartModal = this.createCartModal();
        }
        
        this.renderCartItems();
        cartModal.style.display = 'block';
    }

    // Create cart modal
    createCartModal() {
        const modal = document.createElement('div');
        modal.id = 'cart-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content cart-modal-content">
                <span class="close">&times;</span>
                <h2>Your Shopping Cart</h2>
                <div class="cart-items" id="cart-items">
                    <!-- Cart items will be rendered here -->
                </div>
                <div class="cart-summary">
                    <div class="cart-total">
                        <strong>Total: ₹<span id="cart-total-price">0</span></strong>
                    </div>
                    <div class="cart-actions">
                        <button class="btn btn-outline" id="continue-shopping">Continue Shopping</button>
                        <button class="btn" id="checkout-btn">Proceed to Checkout</button>
                    </div>
                </div>
                <div class="empty-cart-message" id="empty-cart-message" style="display: none;">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Add some beautiful sarees to your cart!</p>
                    <button class="btn" id="shop-now-btn">Shop Now</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners for modal
        this.setupCartModalEvents(modal);
        
        return modal;
    }

    // Setup cart modal event listeners
    setupCartModalEvents(modal) {
        // Close modal
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Continue shopping
        const continueBtn = modal.querySelector('#continue-shopping');
        continueBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Checkout button
        const checkoutBtn = modal.querySelector('#checkout-btn');
        checkoutBtn.addEventListener('click', () => {
            this.handleCheckout();
        });

        // Shop now button (empty cart)
        const shopNowBtn = modal.querySelector('#shop-now-btn');
        shopNowBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            window.location.href = 'shop.html';
        });

        // Close when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Render cart items in modal
    renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        const emptyCartMessage = document.getElementById('empty-cart-message');
        const cartSummary = document.querySelector('.cart-summary');
        
        if (!cartItemsContainer) return;
        
        if (this.cart.length === 0) {
            cartItemsContainer.style.display = 'none';
            if (cartSummary) cartSummary.style.display = 'none';
            if (emptyCartMessage) emptyCartMessage.style.display = 'block';
            return;
        }
        
        cartItemsContainer.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'block';
        if (emptyCartMessage) emptyCartMessage.style.display = 'none';
        
        cartItemsContainer.innerHTML = '';
        
        this.cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">₹${item.price.toLocaleString()}</p>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Update total price
        const totalPriceElement = document.getElementById('cart-total-price');
        if (totalPriceElement) {
            totalPriceElement.textContent = this.calculateTotal().toLocaleString();
        }
        
        // Add event listeners for quantity controls and remove buttons
        this.setupCartItemEvents();
    }

    // Setup cart item event listeners
    setupCartItemEvents() {
        // Quantity minus buttons
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-id');
                const item = this.cart.find(item => item.id === productId);
                if (item) {
                    this.updateQuantity(productId, item.quantity - 1);
                }
            });
        });
        
        // Quantity plus buttons
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-id');
                const item = this.cart.find(item => item.id === productId);
                if (item) {
                    this.updateQuantity(productId, item.quantity + 1);
                }
            });
        });
        
        // Remove buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.closest('.remove-btn').getAttribute('data-id');
                this.removeFromCart(productId);
            });
        });
    }

    // Handle checkout process
    handleCheckout() {
        if (this.cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // In a real application, this would redirect to a checkout page
        // For this demo, we'll show a confirmation message
        alert(`Thank you for your order! Total: ₹${this.calculateTotal().toLocaleString()}\n\nThis is a demo. In a real application, you would be redirected to a secure checkout page.`);
        
        // Clear cart after successful "checkout"
        this.cart = [];
        this.saveCart();
        this.updateCartCounter();
        
        // Close modal
        const cartModal = document.getElementById('cart-modal');
        if (cartModal) {
            cartModal.style.display = 'none';
        }
    }

    // Clear entire cart
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartCounter();
        this.renderCartItems();
    }
}

// Wishlist Functionality (Cart-style)
class Wishlist {
    constructor() {
        this.wishlist = JSON.parse(localStorage.getItem('sareeWishlist')) || [];
        this.initWishlist();
    }

    // Initialize wishlist functionality
    initWishlist() {
        this.updateWishlistCounter();
        this.setupWishlistEventListeners();
        this.markWishlistedProducts();
    }

    // Setup event listeners for wishlist interactions
    setupWishlistEventListeners() {
        // Wishlist buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('wishlist') || 
                e.target.closest('.wishlist')) {
                const button = e.target.classList.contains('wishlist') ? 
                    e.target : e.target.closest('.wishlist');
                const productId = button.getAttribute('data-id');
                this.toggleWishlist(productId, button);
            }
        });

        // Wishlist icon click in navigation
        const wishlistIcon = document.querySelector('.nav-icon .fa-heart');
        if (wishlistIcon) {
            wishlistIcon.addEventListener('click', (e) => {
                e.preventDefault();
                this.showWishlistModal();
            });
        }
    }

    // Toggle product in wishlist
    toggleWishlist(productId, button) {
        const product = this.getProductDetails(productId);
        
        if (!product) {
            console.error('Product not found');
            return;
        }

        const isInWishlist = this.wishlist.find(item => item.id === productId);
        const icon = button.querySelector('i');

        if (isInWishlist) {
            // Remove from wishlist
            this.wishlist = this.wishlist.filter(item => item.id !== productId);
            if (icon) {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
            button.style.color = '';
            this.showWishlistNotification(`${product.name} removed from wishlist!`, 'remove');
        } else {
            // Add to wishlist
            this.wishlist.push({
                ...product,
                quantity: 1 // For consistency with cart structure
            });
            if (icon) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
            button.style.color = '#e74c3c';
            this.showWishlistNotification(`${product.name} added to wishlist!`, 'add');
        }

        this.saveWishlist();
        this.updateWishlistCounter();
        this.showWishlistAnimation(button);
    }

    // Get product details
    getProductDetails(productId) {
        const products = {
            '1': { id: '1', name: 'Banarasi Silk Saree', price: 8999, image: 'https://images.unsplash.com/photo-1585487000113-679b4c1d2d28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            '2': { id: '2', name: 'Kanjivaram Silk', price: 12499, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            '3': { id: '3', name: 'Chanderi Cotton Saree', price: 4999, image: 'https://images.unsplash.com/photo-1631148557880-e003a16bf70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            '4': { id: '4', name: 'Designer Georgette', price: 6499, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            '5': { id: '5', name: 'Bridal Silk Saree', price: 15999, image: 'https://images.unsplash.com/photo-1585487000113-679b4c1d2d28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            '6': { id: '6', name: 'Printed Cotton Saree', price: 3499, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            '7': { id: '7', name: 'Embroidered Silk', price: 9999, image: 'https://images.unsplash.com/photo-1631148557880-e003a16bf70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            '8': { id: '8', name: 'Party Wear Saree', price: 7499, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            '9': { id: '9', name: 'Traditional Silk', price: 11999, image: 'https://images.unsplash.com/photo-1585487000113-679b4c1d2d28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' }
        };
        
        return products[productId];
    }

    // Mark wishlisted products on page load
    markWishlistedProducts() {
        const wishlistButtons = document.querySelectorAll('.wishlist');
        wishlistButtons.forEach(button => {
            const productId = button.getAttribute('data-id');
            const isInWishlist = this.wishlist.find(item => item.id === productId);
            const icon = button.querySelector('i');
            
            if (isInWishlist && icon) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                button.style.color = '#e74c3c';
            }
        });
    }

    // Remove item from wishlist
    removeFromWishlist(productId) {
        this.wishlist = this.wishlist.filter(item => item.id !== productId);
        this.saveWishlist();
        this.updateWishlistCounter();
        this.renderWishlistItems();
        this.markWishlistedProducts();
    }

    // Move item from wishlist to cart
    moveToCart(productId) {
        if (window.sareeCart) {
            window.sareeCart.addToCart(productId);
            this.removeFromWishlist(productId);
            this.showWishlistNotification('Item moved to cart!', 'add');
        }
    }

    // Move all items to cart
    moveAllToCart() {
        if (this.wishlist.length === 0) return;
        
        this.wishlist.forEach(item => {
            if (window.sareeCart) {
                window.sareeCart.addToCart(item.id);
            }
        });
        
        this.wishlist = [];
        this.saveWishlist();
        this.updateWishlistCounter();
        this.renderWishlistItems();
        this.markWishlistedProducts();
        this.showWishlistNotification('All items moved to cart!', 'add');
    }

    // Save wishlist to localStorage
    saveWishlist() {
        localStorage.setItem('sareeWishlist', JSON.stringify(this.wishlist));
    }

    // Update wishlist counter in navigation
    updateWishlistCounter() {
        const wishlistIcons = document.querySelectorAll('.nav-icon .fa-heart');
        const totalItems = this.wishlist.length;
        
        wishlistIcons.forEach(icon => {
            // Remove existing counter
            let counter = icon.parentElement.querySelector('.wishlist-counter');
            if (counter) {
                counter.remove();
            }
            
            // Add counter if items exist
            if (totalItems > 0) {
                counter = document.createElement('span');
                counter.className = 'wishlist-counter';
                counter.textContent = totalItems;
                icon.parentElement.appendChild(counter);
            }
        });
    }

    // Show wishlist animation
    showWishlistAnimation(button) {
        button.style.transform = 'scale(1.3)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 300);
    }

    // Show wishlist notification
    showWishlistNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'wishlist-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'add' ? 'fa-heart' : 'fa-times-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 150px;
            right: 20px;
            background: ${type === 'add' ? 'var(--primary)' : '#e74c3c'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: var(--shadow);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.parentElement.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Show wishlist modal (EXACTLY LIKE CART)
    showWishlistModal() {
        // Create modal if it doesn't exist
        let wishlistModal = document.getElementById('wishlist-modal');
        if (!wishlistModal) {
            wishlistModal = this.createWishlistModal();
        }
        
        this.renderWishlistItems();
        wishlistModal.style.display = 'block';
    }

    // Create wishlist modal (EXACTLY LIKE CART)
    createWishlistModal() {
        const modal = document.createElement('div');
        modal.id = 'wishlist-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content wishlist-modal-content">
                <span class="close">&times;</span>
                <h2><i class="fas fa-heart"></i> Your Wishlist</h2>
                <div class="wishlist-items" id="wishlist-items">
                    <!-- Wishlist items will be rendered here -->
                </div>
                <div class="wishlist-summary">
                    <div class="wishlist-total">
                        <strong>Total Items: <span id="wishlist-total-items">0</span></strong>
                    </div>
                    <div class="wishlist-actions">
                        <button class="btn btn-outline" id="continue-shopping-wishlist">Continue Shopping</button>
                        <button class="btn" id="move-all-to-cart">Move All to Cart</button>
                        <button class="btn btn-danger" id="clear-wishlist">Clear Wishlist</button>
                    </div>
                </div>
                <div class="empty-wishlist-message" id="empty-wishlist-message" style="display: none;">
                    <i class="far fa-heart"></i>
                    <h3>Your wishlist is empty</h3>
                    <p>Save your favorite sarees for later!</p>
                    <button class="btn" id="browse-products-btn">Browse Products</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners for modal
        this.setupWishlistModalEvents(modal);
        
        return modal;
    }

    // Setup wishlist modal event listeners
    setupWishlistModalEvents(modal) {
        // Close modal
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Continue shopping
        const continueBtn = modal.querySelector('#continue-shopping-wishlist');
        continueBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Move all to cart button
        const moveAllBtn = modal.querySelector('#move-all-to-cart');
        moveAllBtn.addEventListener('click', () => {
            this.moveAllToCart();
        });

        // Clear wishlist button
        const clearBtn = modal.querySelector('#clear-wishlist');
        clearBtn.addEventListener('click', () => {
            if (this.wishlist.length === 0) return;
            
            if (confirm('Are you sure you want to clear your entire wishlist?')) {
                this.wishlist = [];
                this.saveWishlist();
                this.updateWishlistCounter();
                this.renderWishlistItems();
                this.markWishlistedProducts();
                this.showWishlistNotification('Wishlist cleared!', 'remove');
            }
        });

        // Browse products button (empty wishlist)
        const browseBtn = modal.querySelector('#browse-products-btn');
        browseBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            window.location.href = 'shop.html';
        });

        // Close when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Render wishlist items in modal (EXACTLY LIKE CART)
    renderWishlistItems() {
        const wishlistItemsContainer = document.getElementById('wishlist-items');
        const emptyWishlistMessage = document.getElementById('empty-wishlist-message');
        const wishlistSummary = document.querySelector('.wishlist-summary');
        
        if (!wishlistItemsContainer) return;
        
        if (this.wishlist.length === 0) {
            wishlistItemsContainer.style.display = 'none';
            if (wishlistSummary) wishlistSummary.style.display = 'none';
            if (emptyWishlistMessage) emptyWishlistMessage.style.display = 'block';
            return;
        }
        
        wishlistItemsContainer.style.display = 'block';
        if (wishlistSummary) wishlistSummary.style.display = 'block';
        if (emptyWishlistMessage) emptyWishlistMessage.style.display = 'none';
        
        wishlistItemsContainer.innerHTML = '';
        
        this.wishlist.forEach(item => {
            const wishlistItem = document.createElement('div');
            wishlistItem.className = 'wishlist-item';
            wishlistItem.innerHTML = `
                <div class="wishlist-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="wishlist-item-details">
                    <h4>${item.name}</h4>
                    <p class="wishlist-item-price">₹${item.price.toLocaleString()}</p>
                </div>
                <div class="wishlist-item-controls">
                    <button class="btn move-to-cart" data-id="${item.id}">
                        <i class="fas fa-shopping-cart"></i> Move to Cart
                    </button>
                    <button class="remove-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            wishlistItemsContainer.appendChild(wishlistItem);
        });
        
        // Update total items count
        const totalItemsElement = document.getElementById('wishlist-total-items');
        if (totalItemsElement) {
            totalItemsElement.textContent = this.wishlist.length;
        }
        
        // Add event listeners for wishlist item controls
        this.setupWishlistItemEvents();
    }

    // Setup wishlist item event listeners
    setupWishlistItemEvents() {
        // Move to cart buttons
        document.querySelectorAll('.move-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.closest('.move-to-cart').getAttribute('data-id');
                this.moveToCart(productId);
            });
        });
        
        // Remove buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.closest('.remove-btn').getAttribute('data-id');
                this.removeFromWishlist(productId);
            });
        });
    }
}

// Search Functionality
class Search {
    constructor() {
        this.searchToggle = document.getElementById('search-toggle');
        this.searchPopup = document.getElementById('search-popup');
        this.searchClose = document.getElementById('search-close');
        this.searchInput = document.getElementById('search-input');
        this.searchResults = document.getElementById('search-results');
        this.suggestionTags = document.querySelectorAll('.suggestion-tag');
        
        this.initSearch();
    }

    initSearch() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Toggle search popup
        if (this.searchToggle) {
            this.searchToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleSearch();
            });
        }

        // Close search popup
        if (this.searchClose) {
            this.searchClose.addEventListener('click', () => {
                this.closeSearch();
            });
        }

        // Close when clicking outside
        if (this.searchPopup) {
            this.searchPopup.addEventListener('click', (e) => {
                if (e.target === this.searchPopup) {
                    this.closeSearch();
                }
            });
        }

        // Search input event
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });

            // Enter key to search
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(e.target.value);
                }
            });
        }

        // Suggestion tags
        this.suggestionTags.forEach(tag => {
            tag.addEventListener('click', () => {
                const searchTerm = tag.getAttribute('data-search');
                this.searchInput.value = searchTerm;
                this.performSearch(searchTerm);
            });
        });

        // Search submit button
        const searchSubmit = document.querySelector('.search-submit');
        if (searchSubmit) {
            searchSubmit.addEventListener('click', () => {
                this.performSearch(this.searchInput.value);
            });
        }

        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.searchPopup && this.searchPopup.classList.contains('active')) {
                this.closeSearch();
            }
        });
    }

    toggleSearch() {
        if (this.searchPopup && this.searchToggle) {
            this.searchPopup.classList.toggle('active');
            this.searchToggle.classList.toggle('active');
            
            if (this.searchPopup.classList.contains('active')) {
                if (this.searchInput) this.searchInput.focus();
                // Clear previous results
                if (this.searchResults) this.searchResults.innerHTML = '';
            }
        }
    }

    closeSearch() {
        if (this.searchPopup && this.searchToggle) {
            this.searchPopup.classList.remove('active');
            this.searchToggle.classList.remove('active');
            if (this.searchInput) this.searchInput.value = '';
            if (this.searchResults) this.searchResults.innerHTML = '';
        }
    }

    handleSearch(query) {
        if (!this.searchResults) return;
        
        if (query.length < 2) {
            this.searchResults.innerHTML = '';
            return;
        }

        const results = this.searchProducts(query);
        this.displayResults(results);
    }

    performSearch(query) {
        if (!this.searchResults) return;
        
        if (query.trim() === '') return;

        const results = this.searchProducts(query);
        this.displayResults(results);
        
        // In a real application, you might want to redirect to search results page
        // For demo, we'll just show results in the popup
        if (results.length > 0) {
            // Scroll to results
            this.searchResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    searchProducts(query) {
        const products = [
            { id: 1, name: 'Banarasi Silk Saree', price: '₹8,999', category: 'silk', image: 'https://images.unsplash.com/photo-1585487000113-679b4c1d2d28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            { id: 2, name: 'Kanjivaram Silk Saree', price: '₹12,499', category: 'silk', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            { id: 3, name: 'Chanderi Cotton Saree', price: '₹4,999', category: 'cotton', image: 'https://images.unsplash.com/photo-1631148557880-e003a16bf70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            { id: 4, name: 'Designer Georgette Saree', price: '₹6,499', category: 'designer', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            { id: 5, name: 'Bridal Silk Saree', price: '₹15,999', category: 'bridal', image: 'https://images.unsplash.com/photo-1585487000113-679b4c1d2d28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            { id: 6, name: 'Printed Cotton Saree', price: '₹3,499', category: 'cotton', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            { id: 7, name: 'Embroidered Silk Saree', price: '₹9,999', category: 'silk', image: 'https://images.unsplash.com/photo-1631148557880-e003a16bf70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
            { id: 8, name: 'Party Wear Saree', price: '₹7,499', category: 'designer', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' }
        ];

        const searchTerm = query.toLowerCase().trim();
        return products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    displayResults(results) {
        if (!this.searchResults) return;
        
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No products found for your search</p>
                    <p class="search-tip">Try different keywords or browse categories</p>
                </div>
            `;
            return;
        }

        let resultsHTML = '';
        results.forEach(product => {
            resultsHTML += `
                <div class="search-result-item" data-id="${product.id}">
                    <div class="search-result-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="search-result-info">
                        <div class="search-result-name">${product.name}</div>
                        <div class="search-result-price">${product.price}</div>
                    </div>
                </div>
            `;
        });

        this.searchResults.innerHTML = resultsHTML;

        // Add click event to result items
        const resultItems = this.searchResults.querySelectorAll('.search-result-item');
        resultItems.forEach(item => {
            item.addEventListener('click', () => {
                const productId = item.getAttribute('data-id');
                this.viewProduct(productId);
            });
        });
    }

    viewProduct(productId) {
        // Close search popup
        this.closeSearch();
        
        // In a real application, redirect to product page
        // For demo, we'll show an alert and redirect to shop page
        alert(`Redirecting to product ${productId}...`);
        window.location.href = `shop.html#product-${productId}`;
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});












// Initialize product grid on shop page
function initializeProductGrid() {
    const productGrid = document.getElementById('product-grid');
    
    if (!productGrid) return;
    
    // RELIABLE product data with working HTTPS images
    const products = [
        { 
            id: 1, 
            name: 'Banarasi Silk Saree', 
            price: '₹8,999', 
            category: 'silk', 
            image: 'https://images.unsplash.com/photo-1585487000113-679b4c1d2d28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' 
        },
        { 
            id: 2, 
            name: 'Kanjivaram Silk', 
            price: '₹12,499', 
            category: 'silk', 
            image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' 
        },
        { 
            id: 3, 
            name: 'Chanderi Cotton Saree', 
            price: '₹4,999', 
            category: 'cotton', 
            image: 'https://images.unsplash.com/photo-1631148557880-e003a16bf70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' 
        },
        { 
            id: 4, 
            name: 'Designer Georgette', 
            price: '₹6,499', 
            category: 'designer', 
            image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' 
        },
        { 
            id: 5, 
            name: 'Bridal Silk Saree', 
            price: '₹15,999', 
            category: 'bridal', 
            image: 'https://images.unsplash.com/photo-1585487000113-679b4c1d2d28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' 
        },
        { 
            id: 6, 
            name: 'Printed Cotton Saree', 
            price: '₹3,499', 
            category: 'cotton', 
            image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' 
        },
        { 
            id: 7, 
            name: 'Embroidered Silk', 
            price: '₹9,999', 
            category: 'silk', 
            image: 'https://images.unsplash.com/photo-1631148557880-e003a16bf70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' 
        },
        { 
            id: 8, 
            name: 'Party Wear Saree', 
            price: '₹7,499', 
            category: 'designer', 
            image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' 
        },
        { 
            id: 9, 
            name: 'Traditional Silk', 
            price: '₹11,999', 
            category: 'silk', 
            image: 'https://images.unsplash.com/photo-1585487000113-679b4c1d2d28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' 
        },
        { 
            id: 10, 
            name: 'Casual Cotton Saree', 
            price: '₹2,999', 
            category: 'cotton', 
            image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' 
        },
        { 
            id: 11, 
            name: 'Festive Silk Saree', 
            price: '₹13,499', 
            category: 'bridal', 
            image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' 
        },
        { 
            id: 12, 
            name: 'Lightweight Georgette', 
            price: '₹5,499', 
            category: 'designer', 
            image: 'https://images.unsplash.com/photo-1631148557880-e003a16bf70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' 
        }
    ];
    
    // Render products
    renderProducts(products);
    
    // Function to render products
    function renderProducts(productsToRender) {
        productGrid.innerHTML = '';
        
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <button class="wishlist-btn" data-id="${product.id}">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">${product.price}</div>
                    <div class="product-actions">
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                        <button class="wishlist" data-id="${product.id}">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            `;
            
            productGrid.appendChild(productCard);
        });
        
        // Add image error handling
        setupImageErrorHandling();
        
        // Add event listeners for wishlist buttons in product image
        const wishlistBtns = document.querySelectorAll('.wishlist-btn');
        wishlistBtns.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                if (window.sareeWishlist) {
                    // Find the corresponding wishlist button in product actions
                    const actionWishlistBtn = this.closest('.product-card').querySelector('.product-actions .wishlist');
                    window.sareeWishlist.toggleWishlist(productId, actionWishlistBtn);
                }
            });
        });
    }
    
    // Image error handling function
    function setupImageErrorHandling() {
        const images = document.querySelectorAll('.product-image img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                // Replace broken image with a placeholder
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik0yMDAgMjAwTDMwMCAzMDAiIHN0cm9rZT0iI0Q4RDhEOCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik0zMDAgMjAwTDIwMCAzMDAiIHN0cm9rZT0iI0Q4RDhEOCIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjx0ZXh0IHg9IjI1MCIgeT0iMzcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
                this.alt = 'Image not available';
            });
            
            // Add loading animation
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        });
    }
}

