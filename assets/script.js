// Ensure gallery is populated on initial load
document.addEventListener('DOMContentLoaded', function() {
    setupDynamicGallery();
});
// Basic navigation function to fix ReferenceError and enable buttons
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
    // Show the requested section
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
        // If showing home/gallery, update gallery
        if (sectionId === 'home' || sectionId === 'dynamic-gallery') {
            setupDynamicGallery();
        }
    }
}
// JavaScript for Rowdy Place
const HOSTEL_NAME = "Rowdy Place";
const ADDRESS = "Rr. \"KATËR DESHMORËT\", Nd.130, H.4, Ap.5, Tirana 1017, Albania";
const PHONE = "+355694826798";
const WHATSAPP = "https://wa.me/355694826798";
const EMAIL = "therowdyson@gmail.com";
const BASE_PRICE = 10; // in EUR
const CHECKOUT_TIME = "10-11 AM";
let selectedDate = null;
let selectedRoom = null;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
// --- Dynamic Gallery Logic ---
const galleryImages = [
    "1000030498.jpg", "1000030499.jpg", "1000030500.jpg", "1000030501.jpg", "1000030502.jpg",
    "1000030504.jpg", "1000030505.jpg", "1000030506.jpg", "1000030507 (1).jpg", "1000030508.jpg",
    "1000030509.jpg", "1000030510.jpg", "1000030511.jpg", "IMG_20200426_140356.jpg", "IMG_20200426_140406.jpg",
    "IMG_20200430_103210.jpg", "IMG_20200619_122011.jpg", "IMG_20200619_122108 (1).jpg",
    "IMG_20200619_122728.jpg", "IMG_20200619_122823.jpg", "IMG_20200619_124012.jpg", "IMG_20200619_124437.jpg",
    "IMG_20200619_124953.jpg", "IMG_20200619_125018.jpg", "Rowdy-room.jpg"
];

function setupDynamicGallery() {
    function getRandomImages(arr, count) {
        const shuffled = arr.slice().sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    function imageExists(src) {
        const req = new XMLHttpRequest();
        req.open('HEAD', src, false);
        try {
            req.send();
            return req.status !== 404;
        } catch (e) {
            return false;
        }
    }
    function updatePanels() {
        console.log('updatePanels called');
        const panels = document.querySelectorAll('.gallery-panel');
        console.log('Gallery panels found:', panels.length, panels);
        let usedImages = [];
        panels.forEach((panel, idx) => {
            panel.innerHTML = "";
            let imgs = getRandomImages(galleryImages.filter(img => !usedImages.includes(img)), 4);
            // Filter out missing images
            imgs = imgs.filter(img => imageExists(`images/${img}`));
            console.log('Images for panel:', idx, imgs);
            usedImages = usedImages.concat(imgs);
            if (imgs.length === 0) {
                // Add placeholder if no images
                const placeholder = document.createElement('div');
                placeholder.textContent = "No images found";
                placeholder.style.background = "#ff0";
                placeholder.style.width = "100%";
                placeholder.style.height = "100%";
                placeholder.style.display = "flex";
                placeholder.style.alignItems = "center";
                placeholder.style.justifyContent = "center";
                panel.appendChild(placeholder);
                console.log('Placeholder added to panel', idx);
            } else {
                imgs.forEach(img => {
                    const el = document.createElement('img');
                    el.src = `images/${img}`;
                    el.alt = "Rowdy Place Room";
                    el.className = "w-1/2 h-1/2 object-cover rounded-lg p-1";
                    el.style.border = "2px solid red";
                    el.onerror = function() {
                        el.style.display = 'none';
                        console.log('Broken image removed:', el.src);
                    };
                    panel.appendChild(el);
                    console.log('Image element added to panel', idx, el.src);
                });
            }
        });
    }
    updatePanels();
    setInterval(updatePanels, 10000);
// removed stray closing brace

// --- Dynamic Testimonials Logic ---
// removed duplicate allReviews declaration

function setupDynamicTestimonials() {
    const section = document.getElementById('testimonial-section');
    let expanded = false;
    function renderTestimonials() {
        section.innerHTML = "";
        const toShow = expanded ? allReviews.length : 6;
        for (let i = 0; i < toShow; i++) {
            const review = allReviews[i];
            section.innerHTML += `<p class='italic mb-2'>"${review.text}"</p><p class='text-sm text-gray-600'>— ${review.author}</p><hr class='my-3'>`;
        }
        section.innerHTML += `<button id='toggle-reviews' class='btn-accent py-2 px-4 rounded-lg font-semibold mt-2'>${expanded ? 'View Less' : 'View More'}</button>`;
        document.getElementById('toggle-reviews').onclick = function() {
            expanded = !expanded;
            renderTestimonials();
        };
    }
    renderTestimonials();
// removed stray closing brace

document.addEventListener('DOMContentLoaded', function() {
    renderCalendar(currentMonth, currentYear);
    updateCalendarMessage();
    setupDynamicGallery();
    setupDynamicTestimonials();
});
        return shuffled.slice(0, count);
    }
    function updatePanels() {
        const panels = document.querySelectorAll('.gallery-panel');
        let usedImages = [];
        panels.forEach(panel => {
            panel.innerHTML = "";
            let imgs = getRandomImages(galleryImages.filter(img => !usedImages.includes(img)), 4);
            usedImages = usedImages.concat(imgs);
            imgs.forEach(img => {
                const el = document.createElement('img');
                el.src = `images/${img}`;
                el.alt = "Rowdy Place Room";
                el.className = "w-1/2 h-1/2 object-cover rounded-lg p-1";
                panel.appendChild(el);
            });
        });
    }
    updatePanels();
    setInterval(updatePanels, 10000);


// --- Dynamic Testimonials Logic ---
const allReviews = [
    {text: "Great location, clean rooms, and friendly environment. Perfect for backpackers!", author: "Marco, Italy"},
    {text: "Felt like staying with a friend. Super chill and central.", author: "Ana, Spain"},
    {text: "Loved the kitchen setup and the privacy of the rooms.", author: "Tom, UK"},
    {text: "Perfect for solo travelers who want something simple and real.", author: "Elif, Turkey"},
    {text: "Ten euros and I got more comfort than in a 50€ hotel. Madness.", author: "Jonas, Germany"},
    {text: "Host is like that cool cousin you crash with. No stress, just good vibes.", author: "Sofia, Portugal"},
    {text: "Stayed three nights, ended up extending to a week. Central, cheap, honest.", author: "Luka, Croatia"},
    {text: "Showers hot, WiFi strong, beds clean. That’s all I need in life.", author: "James, USA"},
    {text: "Kitchen parties and morning coffee in the corridor windows. Loved the vibe.", author: "Aylin, Turkey"},
    {text: "Walking distance to everything. Didn’t spend a cent on taxis. Backpacker heaven.", author: "Mei, China"},
    {text: "Felt like a shared flat more than a hostel, which made it 100x better.", author: "Daniel, Brazil"},
    {text: "No fake luxury, just real comfort. Exactly what travelers need.", author: "Nina, Poland"},
    {text: "Checked in for two nights, checked out with ten new friends and a mild hangover.", author: "Oliver, Ireland"},
    {text: "Rowdy Place? More like Cozy Place. Slept like a rock after walking Tirana all day.", author: "Yuki, Japan"},
    {text: "The host actually cares, not like those plastic hotels. Respect.", author: "Andrei, Romania"},
    {text: "Kitchen = international food lab. Smelled like garlic, tasted like home.", author: "Priya, India"},
    {text: "If you’re broke and happy, this is paradise.", author: "Emma, Canada"},
    {text: "Bathrooms cleaner than my own flat. No complaints.", author: "Mateo, Argentina"},
    {text: "Central, cheap, chill. I mean… what else do you want?", author: "Zofia, Poland"},
    {text: "Every corridor conversation turned into a city guide. Guests = best tour guides.", author: "Ahmed, Egypt"},
    {text: "Beds solid, WiFi fast, host cool. Stop scrolling, just book.", author: "Luca, Italy"},
    {text: "Rowdy Place has that ‘real life’ vibe. Felt like living, not just traveling.", author: "Sarah, Australia"},
    {text: "Came for a cheap bed. Left with a hangover, three new tattoos, and a questionable life story.", author: "Jack, UK"},
    {text: "Shower pressure strong enough to erase my sins. 10/10 would repent again.", author: "Mila, Serbia"},
    {text: "Kitchen smells like garlic and freedom. Backpacker gourmet.", author: "Chen, Taiwan"},
    {text: "Beds so comfy I almost missed my bus. Twice. Sorry, Skopje.", author: "Pablo, Chile"},
    {text: "This ain’t a hostel, it’s therapy disguised as cheap accommodation.", author: "Zoe, France"},
    {text: "Felt like a commune where everyone pretends to cook pasta but just drinks beer.", author: "Layla, Morocco"},
    {text: "Cheap, central, and slightly chaotic — exactly how I like my life.", author: "Oskar, Norway"},
    {text: "Shared kitchen = United Nations of noodles.", author: "Arjun, India"},
    {text: "Don’t expect luxury. Expect stories. The kind you’ll tell ten years later.", author: "Katya, Ukraine"},
    {text: "Rowdy Place felt like staying at a friend’s big apartment — clean beds, shared kitchens, and good vibes without the fake hotel energy.", author: "Anja, Slovenia"},
    {text: "The room had plenty of space and natural light, bathroom inside, and it was easy to walk everywhere from here. Ideal for budget travelers.", author: "Markus, Germany"},
    {text: "It’s not a hotel, more like a relaxed guest house where you share a room with other travelers. I loved the chill atmosphere.", author: "Elif, Turkey"},
    {text: "For 10 euros a bed, it’s unbeatable. Clean sheets, private bathroom in the room, and a short walk to the city center.", author: "David, UK"},
    {text: "I stayed three nights and it felt easygoing and safe. More like a shared home than a business.", author: "Valeria, Italy"},
    {text: "The kitchens were handy to cook something simple, and the rooms had good airflow and light. Everything straightforward and comfortable.", author: "Jin, South Korea"},
    {text: "If you want a casual place to sleep and meet a few travelers without paying hotel prices, Rowdy Place is spot on.", author: "Peter, Hungary"},
    {text: "I liked that every room had its own bathroom — makes sharing much easier. Location couldn’t be better, everything in walking distance.", author: "Sofia, Portugal"},
    {text: "It’s exactly what it says: beds for travelers at a fair price, nothing fake or overcomplicated. Just right.", author: "Lucas, Brazil"},
    {text: "Quiet at night, friendly people, and the owner is helpful with tips around the city. Felt more personal than any hotel.", author: "Maria, Greece"}
];
function setupDynamicTestimonials() {
    const section = document.getElementById('testimonial-section');
    let expanded = false;
    function renderTestimonials() {
        section.innerHTML = "";
        const toShow = expanded ? allReviews.length : 6;
        for (let i = 0; i < toShow; i++) {
            const review = allReviews[i];
            section.innerHTML += `<p class='italic mb-2'>"${review.text}"</p><p class='text-sm text-gray-600'>— ${review.author}</p><hr class='my-3'>`;
        }
        section.innerHTML += `<button id='toggle-reviews' class='btn-accent py-2 px-4 rounded-lg font-semibold mt-2'>${expanded ? 'View Less' : 'View More'}</button>`;
        document.getElementById('toggle-reviews').onclick = function() {
            expanded = !expanded;
            renderTestimonials();
        };
    }
    renderTestimonials();
}
}
function gotoNextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
}
function selectDay(day) {
    selectedDate = new Date(currentYear, currentMonth, day);
    renderCalendar(currentMonth, currentYear);
    updateCalendarMessage();
}
function submitBooking() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email) {
        alert('Please provide your name and email');
        return;
    }
    if (!selectedDate) {
        document.getElementById('calendar-message').textContent = 'Please select a date before sending your request.';
        return;
    }
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = selectedDate.toLocaleDateString('en-US', options);
    let bookingMessage = `Hello! I am interested in staying at Rowdy Place on ${dateStr}. This is a request for availability, not a booking. My name is ${name} (${email}). `;
    if (message) bookingMessage += `Additional info: ${message}`;
    bookingMessage += ' Please let me know if the date is available. I understand this is a personal home stay, occasional rentals only, and no online payments.';
    const encodedMessage = encodeURIComponent(bookingMessage);
    window.open(`${WHATSAPP}?text=${encodedMessage}`, '_blank');
    setTimeout(() => {
        if (!document.hidden) {
            const subject = `Availability request for ${dateStr}`;
            const body = `Hello,\n\nI am interested in staying at Rowdy Place on ${dateStr}. This is a request for availability, not a booking.\n\nName: ${name}\nEmail: ${email}\n${message ? `Message: ${message}\n\n` : ''}Please let me know if the date is available. I understand this is a personal home stay, occasional rentals only, and no online payments.\n\nThanks,\n${name}`;
            window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
    }, 500);
}
function updateCalendarMessage() {
    const msgEl = document.getElementById('calendar-message');
    if (!selectedDate) {
        msgEl.textContent = 'No date selected.';
    } else {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        msgEl.textContent = 'Selected date: ' + selectedDate.toLocaleDateString('en-US', options);
    }
}
