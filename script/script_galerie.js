// Filter and Mobile "Voir Plus" Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const loadMoreContainer = document.getElementById('loadMoreGallery');
const loadMoreBtn = loadMoreContainer ? loadMoreContainer.querySelector('button') : null;

let itemsToShow = 3;
const MOBILE_BREAKPOINT = 768; // Screen width to trigger mobile limit

function updateGallery(animate = true) {
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

    let matchCount = 0;
    let visibleCount = 0;

    galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        const matchesFilter = activeFilter === 'all' || itemCategory === activeFilter;

        if (matchesFilter) {
            matchCount++;
            const shouldShow = !isMobile || visibleCount < itemsToShow;

            if (animate) {
                item.classList.add('hide');
                setTimeout(() => {
                    if (shouldShow) {
                        item.classList.remove('hidden');
                        setTimeout(() => item.classList.remove('hide'), 50);
                    } else {
                        item.classList.add('hidden');
                    }
                }, 400); // Wait for fade out
            } else {
                if (shouldShow) {
                    item.classList.remove('hidden');
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hidden');
                    item.classList.add('hide');
                }
            }
            if (shouldShow) visibleCount++;
        } else {
            if (animate) {
                item.classList.add('hide');
                setTimeout(() => item.classList.add('hidden'), 400);
            } else {
                item.classList.add('hide');
                item.classList.add('hidden');
            }
        }
    });

    // Toggle "Voir Plus" button visibility
    setTimeout(() => {
        if (isMobile && matchCount > visibleCount) {
            loadMoreContainer.style.display = 'block';
        } else {
            if (loadMoreContainer) loadMoreContainer.style.display = 'none';
        }
    }, animate ? 400 : 0);
}

// Initialize mobile limit view on load
updateGallery(false);

// Adjust view perfectly when device is rotated or window is resized
window.addEventListener('resize', () => {
    updateGallery(false);
});

// Load More button click event
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        itemsToShow += 100; // Load everything
        updateGallery(true);
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        itemsToShow = 3; // Reset to 3 items when a new filter is clicked
        updateGallery(true);
    });

    // Extreme Wow Factor: Magnetic Sticky Filter Buttons
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = ''; // Let CSS reset it smoothly
    });
});

// Extreme Wow Factor: 3D Parallax Hover for Gallery Photos
galleryItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation based on cursor distance from center
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg vertical
        const rotateY = ((x - centerX) / centerX) * 10;  // Max 10 deg horizontal

        // Apply the magical 3D CSS
        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02) translateY(-10px)`;
        item.style.boxShadow = `${-rotateY}px ${rotateX + 10}px 40px rgba(201, 139, 155, 0.4)`;
    });

    item.addEventListener('mouseleave', () => {
        // Remove inline styles to let normal CSS transition take over and snap back
        item.style.transform = '';
        item.style.boxShadow = '';
    });
});

// Modal functionality
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        const title = item.querySelector('.gallery-title').textContent;
        const category = item.querySelector('.gallery-category').textContent;

        modalImage.src = imgSrc;
        modalCaption.textContent = `${category} - ${title}`;
        modal.classList.add('open');

        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});

// Certificates Modal Functionality
const certifItems = document.querySelectorAll('.certif-item');

certifItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        const altText = item.querySelector('img').alt;

        modalImage.src = imgSrc;
        modalCaption.textContent = altText;
        modal.classList.add('open');

        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    });
});

// Salon Modal Functionality
const salonItems = document.querySelectorAll('.salon-main-image, .salon-item');

salonItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        const altText = item.querySelector('img').alt;

        modalImage.src = imgSrc;
        modalCaption.textContent = altText;
        modal.classList.add('open');

        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    });
});
