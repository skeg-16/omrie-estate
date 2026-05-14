document.addEventListener('DOMContentLoaded', () => {

    const cursor = document.getElementById('cursor');
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const hoverElements = document.querySelectorAll('a, button, select, input, .service-card, .magnetic, .tool-btn');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    } else {
        cursor.style.display = 'none';
    }

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-progress').style.width = scrolled + '%';
    });

    const themeBtn = document.getElementById('theme-btn');
    const themeText = document.getElementById('theme-text');
    const themeIcon = themeBtn.querySelector('i');
    
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('theme-dusk');
        if(document.body.classList.contains('theme-dusk')) {
            themeText.innerText = 'Dawn Mode';
            themeIcon.className = 'bx bx-sun';
        } else {
            themeText.innerText = 'Dusk Mode';
            themeIcon.className = 'bx bx-moon';
        }
    });

    document.getElementById('btn-to-collection').addEventListener('click', () => {
        document.getElementById('collection').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('btn-to-manifesto').addEventListener('click', () => {
        document.getElementById('manifesto').scrollIntoView({ behavior: 'smooth' });
    });

const baseUnsplashImages = [
    'https://images.pexels.com/photos/323772/pexels-photo-323772.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/290518/pexels-photo-290518.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/259600/pexels-photo-259600.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2587009/pexels-photo-2587009.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/258159/pexels-photo-258159.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3316922/pexels-photo-3316922.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=800', // REPLACED THE CAT
    'https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/827518/pexels-photo-827518.jpeg?auto=compress&cs=tinysrgb&w=800'
];

    const exchangeRates = {
        'USD': { rate: 1, symbol: '$' },
        'EUR': { rate: 0.92, symbol: '€' },
        'GBP': { rate: 0.79, symbol: '£' },
        'PHP': { rate: 56.5, symbol: '₱' }
    };

    let currentCurrency = 'USD';
    window.lookbookData = [];
    const types = ['villa', 'penthouse', 'estate'];
    
    for(let i=0; i<20; i++) {
        let type = types[i % 3];
        let priceNum = Math.floor(Math.random() * 8000) + 1500;
        let lat = 14.5 + (Math.random() - 0.5) * 2;
        let lng = 121.0 + (Math.random() - 0.5) * 2;
        let area = Math.floor(Math.random() * 4000) + 1500;
        
        window.lookbookData.push({
            id: i + 1,
            type: type,
            name: 'Aesthetic ' + type.charAt(0).toUpperCase() + type.slice(1) + ' ' + (i+1),
            basePrice: priceNum * 1000,
            beds: Math.floor(Math.random() * 4) + 2,
            baths: Math.floor(Math.random() * 4) + 2,
            sqftNum: area,
            sqft: area + ' sqft',
            year: 2020 + Math.floor(Math.random() * 6),
            img: baseUnsplashImages[i],
            coords: [lat, lng],
            desc: 'A masterclass in modern refinement. Featuring seamless indoor-outdoor transitions, a meticulously crafted soft-toned interior, and unrivaled architectural elegance.',
            amenities: ['Private Courtyard', 'Chef Kitchen', 'Smart Home', 'Wine Cellar', 'Spa Bathroom', 'Security System']
        });
    }

    const container = document.getElementById('lookbook-container');
    const filters = document.querySelectorAll('.filter-btn');
    const currencySelect = document.getElementById('currency-select');
    const sortSelect = document.getElementById('sort-select');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    const propModal = document.getElementById('property-modal');
    const closePropBtn = document.querySelector('.close-prop-modal');
    const propTabBtns = document.querySelectorAll('#property-modal .tab-btn');
    const propTabContents = document.querySelectorAll('#property-modal .tab-content');

    const inqModal = document.getElementById('inquiry-modal');
    const closeInqBtn = document.querySelector('.close-inq-modal');

    const tourModal = document.getElementById('tour-modal');
    const closeTourBtn = document.querySelector('.close-tour-modal');
    const triggerTourBtns = document.querySelectorAll('.trigger-tour');

    const chatToggle = document.getElementById('chat-toggle');
    const chatBox = document.getElementById('chat-box');
    const closeChat = document.getElementById('close-chat');

    let currentPropPrice = 0;
    let visibleCount = 6;
    let currentFilterType = 'all';

    function formatPrice(price) {
        const rate = exchangeRates[currentCurrency].rate;
        const symbol = exchangeRates[currentCurrency].symbol;
        const converted = price * rate;
        return symbol + converted.toLocaleString('en-US', {maximumFractionDigits: 0});
    }

    function setElText(id, text) {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    }

    function setElHtml(id, html) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
    }

    function calculateMortgage() {
        const dpPercent = document.getElementById('dp-slider')?.value || 20;
        const years = document.getElementById('term-slider')?.value || 15;
        
        setElText('dp-value', dpPercent + '%');
        setElText('term-value', years + ' Years');

        const principal = currentPropPrice - (currentPropPrice * (dpPercent / 100));
        const monthlyRate = 0.07 / 12;
        const totalPayments = years * 12;

        const monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
        
        setElText('monthly-amort', formatPrice(monthly));
    }

    const dpSlider = document.getElementById('dp-slider');
    const termSlider = document.getElementById('term-slider');
    if (dpSlider) dpSlider.addEventListener('input', calculateMortgage);
    if (termSlider) termSlider.addEventListener('input', calculateMortgage);

    window.openPropertyModal = function(id) {
        const item = window.lookbookData.find(p => p.id === parseInt(id));
        if(!item) return;

        currentPropPrice = item.basePrice;
        
        const modalImg = document.getElementById('modal-img');
        if (modalImg) modalImg.style.backgroundImage = 'url(' + item.img + ')';
        
        setElText('modal-cat', item.type);
        setElText('modal-name', item.name);
        setElText('modal-cost', formatPrice(item.basePrice));
        setElText('modal-beds', item.beds + ' Beds');
        setElText('modal-baths', item.baths + ' Baths');
        setElText('modal-sqft', item.sqft);
        
        setElHtml('modal-desc', item.desc);
        
        const amList = document.getElementById('modal-amenities');
        if (amList) {
            amList.innerHTML = '';
            item.amenities.forEach(am => {
                amList.innerHTML += '<li>' + am + '</li>';
            });
        }

        setElText('spec-year', item.year);
        setElText('spec-tax', formatPrice(item.basePrice * 0.012) + '/yr');
        setElText('spec-hoa', formatPrice(500) + '/mo');

        propTabBtns.forEach(b => b.classList.remove('active'));
        propTabContents.forEach(c => c.classList.remove('active'));
        if (propTabBtns.length > 0) propTabBtns[0].classList.add('active');
        if (propTabContents.length > 0) propTabContents[0].classList.add('active');

        const btnFav = document.getElementById('btn-fav');
        if(btnFav) btnFav.classList.remove('active');

        calculateMortgage();

        if (propModal) {
            propModal.style.display = 'flex';
            setTimeout(() => propModal.classList.add('visible'), 10);
        }
    };

    container.addEventListener('click', (e) => {
        const card = e.target.closest('.lookbook-card');
        if(card) {
            const propId = card.getAttribute('data-id');
            window.openPropertyModal(propId);
        }
    });

    function renderLookbook(filterType, append = false) {
        if(!append) {
            container.innerHTML = '';
            visibleCount = 6;
            currentFilterType = filterType;
        }

        let filtered = currentFilterType === 'all' ? [...window.lookbookData] : window.lookbookData.filter(item => item.type === currentFilterType);
        
        const sortVal = sortSelect ? sortSelect.value : 'default';
        if(sortVal === 'price-low') {
            filtered.sort((a, b) => a.basePrice - b.basePrice);
        } else if(sortVal === 'price-high') {
            filtered.sort((a, b) => b.basePrice - a.basePrice);
        } else if(sortVal === 'size') {
            filtered.sort((a, b) => b.sqftNum - a.sqftNum);
        }

        const propsToRender = filtered.slice(append ? visibleCount - 6 : 0, visibleCount);
        
        propsToRender.forEach(item => {
            const card = document.createElement('div');
            card.className = 'lookbook-card';
            card.setAttribute('data-id', item.id);
            card.style.backgroundImage = 'url(' + item.img + ')';
            
            const displayPrice = formatPrice(item.basePrice);

            card.innerHTML = '<div class=\'card-overlay\'><span class=\'c-tag\'>' + item.type + '</span><h4 class=\'c-title\'>' + item.name + '</h4><span class=\'c-price\'>' + displayPrice + '</span><div class=\'c-specs\'>' + item.beds + ' Beds | ' + item.baths + ' Baths | ' + item.sqft + '</div><button class=\'c-btn\'>View Details</button></div><div class=\'card-click-area\'></div>';

            if (window.matchMedia('(pointer: fine)').matches) {
                card.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
                card.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
            }

            container.appendChild(card);
        });

        if(loadMoreBtn) {
            if(visibleCount >= filtered.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-block';
            }
        }
    }

    renderLookbook('all');

    filters.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filters.forEach(f => f.classList.remove('active'));
            e.target.classList.add('active');
            renderLookbook(e.target.getAttribute('data-type'));
        });
    });

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            renderLookbook(currentFilterType, false);
        });
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleCount += 6;
            renderLookbook(currentFilterType, true);
        });
    }

    if (currencySelect) {
        currencySelect.addEventListener('change', (e) => {
            currentCurrency = e.target.value;
            renderLookbook(currentFilterType, false);
            
            if (propModal && propModal.classList.contains('visible')) {
                setElText('modal-cost', formatPrice(currentPropPrice));
                setElText('spec-tax', formatPrice(currentPropPrice * 0.012) + '/yr');
                setElText('spec-hoa', formatPrice(500) + '/mo');
                calculateMortgage();
            }
        });
    }

    propTabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target.getAttribute('data-tab');
            propTabBtns.forEach(b => b.classList.remove('active'));
            propTabContents.forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            const targetContent = document.getElementById('tab-' + target);
            if (targetContent) targetContent.classList.add('active');
        });
    });

    if (closePropBtn) {
        closePropBtn.addEventListener('click', () => {
            if (propModal) {
                propModal.classList.remove('visible');
                setTimeout(() => propModal.style.display = 'none', 300);
            }
        });
    }

    const btnFav = document.getElementById('btn-fav');
    if (btnFav) {
        btnFav.addEventListener('click', () => {
            btnFav.classList.toggle('active');
        });
    }

    const btnShare = document.getElementById('btn-share');
    if (btnShare) {
        btnShare.addEventListener('click', () => {
            alert('Listing link copied to clipboard!');
        });
    }

    const btnPrint = document.getElementById('btn-print');
    if (btnPrint) {
        btnPrint.addEventListener('click', () => {
            window.print();
        });
    }

    triggerTourBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if(propModal && propModal.classList.contains('visible')) {
                propModal.classList.remove('visible');
                setTimeout(() => propModal.style.display = 'none', 300);
            }
            if (tourModal) {
                tourModal.style.display = 'flex';
                setTimeout(() => tourModal.classList.add('visible'), 10);
            }
        });
    });

    if (closeTourBtn) {
        closeTourBtn.addEventListener('click', () => {
            if (tourModal) {
                tourModal.classList.remove('visible');
                setTimeout(() => tourModal.style.display = 'none', 300);
            }
        });
    }

    document.querySelectorAll('.trigger-inquiry').forEach(btn => {
        btn.addEventListener('click', () => {
            if(propModal && propModal.classList.contains('visible')) {
                propModal.classList.remove('visible');
                setTimeout(() => propModal.style.display = 'none', 300);
            }
            if (inqModal) {
                inqModal.style.display = 'flex';
                setTimeout(() => inqModal.classList.add('visible'), 10);
            }
        });
    });

    if (closeInqBtn) {
        closeInqBtn.addEventListener('click', () => {
            if (inqModal) {
                inqModal.classList.remove('visible');
                setTimeout(() => inqModal.style.display = 'none', 300);
            }
        });
    }

    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Your inquiry has been received. An Omrie Concierge will contact you shortly.');
            contactForm.reset();
            if (inqModal) {
                inqModal.classList.remove('visible');
                setTimeout(() => inqModal.style.display = 'none', 300);
            }
        });
    }

    if (chatToggle && chatBox && closeChat) {
        chatToggle.addEventListener('click', () => {
            chatBox.classList.add('visible');
            chatToggle.style.transform = 'scale(0)';
        });

        closeChat.addEventListener('click', () => {
            chatBox.classList.remove('visible');
            chatToggle.style.transform = 'scale(1)';
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    setTimeout(() => {
        const mapContainer = document.getElementById('global-map');
        if(mapContainer) {
            const map = L.map('global-map', {
                scrollWheelZoom: false,
                dragging: !L.Browser.mobile
            }).setView([14.5, 121.0], 5);
            
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
            }).addTo(map);

            const customIcon = L.divIcon({
                className: 'custom-pin',
                html: '<div style=\'background-color: #B76E79; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3); cursor: pointer;\'></div>',
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            });

            window.lookbookData.forEach(item => {
                const marker = L.marker(item.coords, {icon: customIcon}).addTo(map);
                marker.bindPopup('<strong style=\'font-family: Montserrat; color: #D4AF37;\'>' + item.name + '</strong><br>' + formatPrice(item.basePrice));
                
                marker.on('click', function() {
                    window.openPropertyModal(item.id);
                });
            });
        }
    }, 1000);

});