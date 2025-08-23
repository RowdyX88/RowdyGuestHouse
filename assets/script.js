// --- Minimalist Calendar Logic ---
// --- Minimalist Calendar Logic with Range Selection ---
let calendarSelectedStart = null;
let calendarSelectedEnd = null;

function updateBookingChips() {
    const chips = document.getElementById('booking-chips');
    chips.innerHTML = '';
    if (window.selectedRoom) {
        const roomChip = document.createElement('span');
        roomChip.className = 'px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold';
        roomChip.textContent = window.selectedRoom;
        chips.appendChild(roomChip);
    }
    if (calendarSelectedStart && calendarSelectedEnd) {
        const dateChip = document.createElement('span');
        dateChip.className = 'px-3 py-1 rounded-full bg-accent text-xs font-semibold';
        dateChip.textContent = `${calendarSelectedStart.getDate()}/${calendarSelectedStart.getMonth()+1}/${calendarSelectedStart.getFullYear()} - ${calendarSelectedEnd.getDate()}/${calendarSelectedEnd.getMonth()+1}/${calendarSelectedEnd.getFullYear()}`;
        chips.appendChild(dateChip);
    } else if (calendarSelectedStart) {
        const dateChip = document.createElement('span');
        dateChip.className = 'px-3 py-1 rounded-full bg-accent text-xs font-semibold';
        dateChip.textContent = `${calendarSelectedStart.getDate()}/${calendarSelectedStart.getMonth()+1}/${calendarSelectedStart.getFullYear()}`;
        chips.appendChild(dateChip);
    }
}

function renderMinimalistCalendar() {
    const calendarEl = document.getElementById('calendar-container');
    if (!calendarEl) return;
    const today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();

    function drawCalendar() {
        calendarEl.innerHTML = '';
        // Header
        const header = document.createElement('div');
        header.className = 'flex justify-between items-center w-full mb-2';
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '<';
        prevBtn.className = 'px-2 py-1 rounded hover:bg-gray-100';
        prevBtn.onclick = () => { month--; if (month < 0) { month = 11; year--; } drawCalendar(); };
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '>';
        nextBtn.className = 'px-2 py-1 rounded hover:bg-gray-100';
        nextBtn.onclick = () => { month++; if (month > 11) { month = 0; year++; } drawCalendar(); };
        const monthLabel = document.createElement('span');
        monthLabel.className = 'font-semibold text-lg';
        monthLabel.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
        header.appendChild(prevBtn);
        header.appendChild(monthLabel);
        header.appendChild(nextBtn);
        calendarEl.appendChild(header);

        // Days of week
        const daysRow = document.createElement('div');
        daysRow.className = 'grid grid-cols-7 gap-1 mb-1 w-full';
        ['S','M','T','W','T','F','S'].forEach(d => {
            const dayCell = document.createElement('div');
            dayCell.className = 'text-xs font-semibold text-gray-500 text-center';
            dayCell.textContent = d;
            daysRow.appendChild(dayCell);
        });
        calendarEl.appendChild(daysRow);

        // Dates grid
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-7 gap-1 w-full';
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        // Empty cells before first day
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day disabled';
            grid.appendChild(emptyCell);
        }
        // Days
        for (let day = 1; day <= daysInMonth; day++) {
            const cell = document.createElement('div');
            cell.className = 'calendar-day text-center py-2 rounded cursor-pointer hover:bg-accent';
            cell.textContent = day;
            const cellDate = new Date(year, month, day);
            // Highlight range
            if (calendarSelectedStart && calendarSelectedEnd) {
                if (cellDate >= calendarSelectedStart && cellDate <= calendarSelectedEnd) {
                    cell.className += ' bg-primary text-white';
                }
            } else if (calendarSelectedStart && cellDate.getTime() === calendarSelectedStart.getTime()) {
                cell.className += ' bg-primary text-white';
            }
            cell.onclick = () => {
                if (!calendarSelectedStart || (calendarSelectedStart && calendarSelectedEnd)) {
                    calendarSelectedStart = cellDate;
                    calendarSelectedEnd = null;
                } else if (!calendarSelectedEnd) {
                    // Always set start to earlier and end to later date
                    if (cellDate.getTime() === calendarSelectedStart.getTime()) {
                        // If same date, reset
                        calendarSelectedStart = cellDate;
                        calendarSelectedEnd = null;
                    } else {
                        if (cellDate < calendarSelectedStart) {
                            calendarSelectedEnd = calendarSelectedStart;
                            calendarSelectedStart = cellDate;
                        } else {
                            calendarSelectedEnd = cellDate;
                        }
                    }
                }
                drawCalendar();
                updateBookingChips();
            };
            grid.appendChild(cell);
        }
        calendarEl.appendChild(grid);
        // Selected date display
        const selectedMsg = document.createElement('div');
        selectedMsg.className = 'mt-2 text-sm text-gray-700';
        if (calendarSelectedStart && calendarSelectedEnd) {
            selectedMsg.textContent = `Selected: ${calendarSelectedStart.getDate()}/${calendarSelectedStart.getMonth()+1}/${calendarSelectedStart.getFullYear()} to ${calendarSelectedEnd.getDate()}/${calendarSelectedEnd.getMonth()+1}/${calendarSelectedEnd.getFullYear()}`;
        } else if (calendarSelectedStart) {
            selectedMsg.textContent = `Selected: ${calendarSelectedStart.getDate()}/${calendarSelectedStart.getMonth()+1}/${calendarSelectedStart.getFullYear()} (start)`;
        } else {
            selectedMsg.textContent = 'Select your stay dates';
        }
        calendarEl.appendChild(selectedMsg);
    }
    drawCalendar();
}

document.addEventListener('DOMContentLoaded', function() {
    // Prepend room and date info to message textarea, non-removable
    const messageBox = document.getElementById('message');
    function prependRoomDateToMessage() {
        let roomText = window.selectedRoom ? `Room: ${window.selectedRoom}` : '';
        let dateText = '';
        if (calendarSelectedStart && calendarSelectedEnd) {
            dateText = `Dates: ${calendarSelectedStart.getDate()}/${calendarSelectedStart.getMonth()+1}/${calendarSelectedStart.getFullYear()} - ${calendarSelectedEnd.getDate()}/${calendarSelectedEnd.getMonth()+1}/${calendarSelectedEnd.getFullYear()}`;
        } else if (calendarSelectedStart) {
            dateText = `Date: ${calendarSelectedStart.getDate()}/${calendarSelectedStart.getMonth()+1}/${calendarSelectedStart.getFullYear()}`;
        }
        let info = '';
        if (roomText) info += `**${roomText}**\n`;
        if (dateText) info += `**${dateText}**\n`;
        info += 'Extra questions? Write here:';
        // Remove any previous bolded Room/Date info and extra question prompt at the top
        if (messageBox) {
            let userText = messageBox.value.replace(/^(\*\*Room:.*\*\*\n)?(\*\*Date[s]?:.*\*\*\n)?(Extra questions\? Write here:)?/m, '');
            messageBox.value = info + (userText.trimStart() ? '\n' + userText.trimStart() : '');
        }
    }
    // Update on room/date selection
    window.prependRoomDateToMessage = prependRoomDateToMessage;
    // Hook into room/date selection
    const origSelectRoom = window.selectRoom;
    window.selectRoom = function(roomName) {
        origSelectRoom(roomName);
        prependRoomDateToMessage();
    };
    messageBox && messageBox.addEventListener('focus', prependRoomDateToMessage);
    // Calendar selection
    const origUpdateBookingChips = window.updateBookingChips || updateBookingChips;
    window.updateBookingChips = function() {
        origUpdateBookingChips();
        prependRoomDateToMessage();
    };
    renderMinimalistCalendar();
    updateBookingChips();
});

function selectRoom(roomName) {
    window.selectedRoom = roomName;
    showSection('book');
    updateBookingChips();
}

function submitBooking() {
    // Collect form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    let message = document.getElementById('message').value.trim();
    if (!name || !email) {
        alert('Please enter your name and email.');
        return;
    }
    let roomText = window.selectedRoom ? `Room: ${window.selectedRoom}` : '';
    let dateText = '';
    if (calendarSelectedStart && calendarSelectedEnd) {
        dateText = `Dates: ${calendarSelectedStart.getDate()}/${calendarSelectedStart.getMonth()+1}/${calendarSelectedStart.getFullYear()} - ${calendarSelectedEnd.getDate()}/${calendarSelectedEnd.getMonth()+1}/${calendarSelectedEnd.getFullYear()}`;
    } else if (calendarSelectedStart) {
        dateText = `Date: ${calendarSelectedStart.getDate()}/${calendarSelectedStart.getMonth()+1}/${calendarSelectedStart.getFullYear()}`;
    }
    // Automatically append room and date info to message
    let autoInfo = '';
    if (roomText) autoInfo += roomText + '\n';
    if (dateText) autoInfo += dateText + '\n';
    if (autoInfo && !message.includes(roomText) && !message.includes(dateText)) {
        message = autoInfo + message;
    }
    // Simulate sending booking request (replace with real logic as needed)
    alert('Request sent!\nName: ' + name + '\nEmail: ' + email + '\nMessage: ' + message);
}

// --- Section Navigation Logic ---
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    // Show the selected section
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
    }
    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    // Find the nav button for this section
    document.querySelectorAll('.nav-item').forEach(nav => {
        if (nav.getAttribute('aria-label') && nav.getAttribute('aria-label').toLowerCase() === sectionId) {
            nav.classList.add('active');
        }
    });
}
// --- Dynamic Testimonials Logic ---
// --- Reviews Data ---
const allReviews = [
    { text: "Great location, clean rooms, and friendly environment. Perfect for backpackers!", author: "Marco, Italy" },
    { text: "Felt like staying with a friend. Super chill and central.", author: "Ana, Spain" },
    { text: "Loved the kitchen setup and the privacy of the rooms.", author: "Tom, UK" },
    { text: "Perfect for solo travelers who want something simple and real.", author: "Elif, Turkey" },
    { text: "Ten euros and I got more comfort than in a 50€ hotel. Madness.", author: "Jonas, Germany" },
    { text: "Host is like that cool cousin you crash with. No stress, just good vibes.", author: "Sofia, Portugal" },
    { text: "Stayed three nights, ended up extending to a week. Central, cheap, honest.", author: "Luka, Croatia" },
    { text: "Showers hot, WiFi strong, beds clean. That’s all I need in life.", author: "James, USA" },
    { text: "Kitchen parties and morning coffee in the corridor windows. Loved the vibe.", author: "Aylin, Turkey" },
    { text: "Walking distance to everything. Didn’t spend a cent on taxis. Backpacker heaven.", author: "Mei, China" },
    { text: "Felt like a shared flat more than a hostel, which made it 100x better.", author: "Daniel, Brazil" },
    { text: "No fake luxury, just real comfort. Exactly what travelers need.", author: "Nina, Poland" },
    { text: "Checked in for two nights, checked out with ten new friends and a mild hangover.", author: "Oliver, Ireland" },
    { text: "Rowdy Place? More like Cozy Place. Slept like a rock after walking Tirana all day.", author: "Yuki, Japan" },
    { text: "The host actually cares, not like those plastic hotels. Respect.", author: "Andrei, Romania" },
    { text: "If you’re broke and happy, this is paradise.", author: "Emma, Canada" },
    { text: "Bathrooms cleaner than my own flat. No complaints.", author: "Mateo, Argentina" },
    { text: "Central, cheap, chill. I mean… what else do you want?", author: "Zofia, Poland" },
    { text: "Every corridor conversation turned into a city guide. Guests = best tour guides.", author: "Ahmed, Egypt" },
    { text: "Beds solid, WiFi fast, host cool. Stop scrolling, just book.", author: "Luca, Italy" },
    { text: "Rowdy Place has that ‘real life’ vibe. Felt like living, not just traveling.", author: "Sarah, Australia" },
    { text: "Came for a cheap bed. Left with a hangover, three new tattoos, and a questionable life story.", author: "Jack, UK" },
    { text: "Shower pressure strong enough to erase my sins. 10/10 would repent again.", author: "Mila, Serbia" },
    { text: "Beds so comfy I almost missed my bus. Twice. Sorry, Skopje.", author: "Pablo, Chile" },
    { text: "This ain’t a hostel, it’s therapy disguised as cheap accommodation.", author: "Zoe, France" },
    { text: "Felt like a commune where everyone pretends to cook pasta but just drinks beer.", author: "Layla, Morocco" },
    { text: "Cheap, central, and slightly chaotic — exactly how I like my life.", author: "Oskar, Norway" },
    { text: "Shared kitchen = United Nations of noodles.", author: "Arjun, India" },
    { text: "Don’t expect luxury. Expect stories. The kind you’ll tell ten years later.", author: "Katya, Ukraine" },
    { text: "Rowdy Place felt like staying at a friend’s big apartment — clean beds, shared kitchens, and good vibes without the fake hotel energy.", author: "Anja, Slovenia" },
    { text: "The room had plenty of space and natural light, bathroom inside, and it was easy to walk everywhere from here. Ideal for budget travelers.", author: "Markus, Germany" },
    { text: "It’s not a hotel, more like a relaxed guest house where you share a room with other travelers. I loved the chill atmosphere.", author: "Elif, Turkey" },
    { text: "For 10 euros a bed, it’s unbeatable. Clean sheets, private bathroom in the room, and a short walk to the city center.", author: "David, UK" },
    { text: "I stayed three nights and it felt easygoing and safe. More like a shared home than a business.", author: "Valeria, Italy" },
    { text: "The kitchens were handy to cook something simple, and the rooms had good airflow and light. Everything straightforward and comfortable.", author: "Jin, South Korea" },
    { text: "If you want a casual place to sleep and meet a few travelers without paying hotel prices, Rowdy Place is spot on.", author: "Peter, Hungary" },
    { text: "I liked that every room had its own bathroom — makes sharing much easier. Location couldn’t be better, everything in walking distance.", author: "Sofia, Portugal" },
    { text: "It’s exactly what it says: beds for travelers at a fair price, nothing fake or overcomplicated. Just right.", author: "Lucas, Brazil" },
    { text: "Quiet at night, friendly people, and the owner is helpful with tips around the city. Felt more personal than any hotel.", author: "Maria, Greece" }
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
// --- Gallery Logic ---
const galleryImages = [
    './images/IMG_20200426_140406.jpg',
    './images/IMG_20200619_124953.jpg',
    './images/1000030509.jpg',
    './images/IMG_20200619_122823.jpg',
    './images/IMG_20200619_122108 (1).jpg',
    './images/1000030504.jpg',
    './images/1000030506.jpg',
    './images/1000030500.jpg',
    './images/1000030505.jpg',
    './images/1000030510.jpg',
    './images/IMG_20200619_122728.jpg',
    './images/1000030499.jpg',
    './images/IMG_20200426_140356.jpg',
    './images/IMG_20200619_122011.jpg',
    './images/1000030502.jpg',
    './images/IMG_20200619_124012.jpg',
    './images/IMG_20200619_125018.jpg',
    './images/IMG_20200430_103210.jpg',
    './images/1000030501.jpg',
    './images/1000030511.jpg',
    'images/1000030498.jpg',
    'images/1000030507 (1).jpg',
    'images/Rowdy-room.jpg',
    'images/IMG_20200619_124437.jpg',
    'images/1000030508.jpg'
];

function getRandomImages(arr, count) {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}


document.addEventListener('DOMContentLoaded', function() {
    renderMinimalistCalendar();
    updateBookingChips();
    setupDynamicTestimonials();
    // Filmstrip gallery
    const track = document.querySelector('#dynamic-gallery .filmstrip-track');
    if (!track) return;
    // Add all images, then duplicate for seamless loop
    for (let i = 0; i < galleryImages.length; i++) {
        const img = document.createElement('img');
        img.src = galleryImages[i];
        img.className = 'gallery-image ' + (i % 2 === 0 ? 'frame-primary' : 'frame-accent');
        img.alt = 'Rowdy Place Gallery';
        track.appendChild(img);
    }
    for (let i = 0; i < galleryImages.length; i++) {
        const img = document.createElement('img');
        img.src = galleryImages[i];
        img.className = 'gallery-image ' + (i % 2 === 0 ? 'frame-primary' : 'frame-accent');
        img.alt = 'Rowdy Place Gallery';
        track.appendChild(img);
    }

    // Fill hidden room and dates fields in Formspree form
    function updateHiddenFields() {
        const roomField = document.getElementById('hidden-room');
        const datesField = document.getElementById('hidden-dates');
        roomField.value = window.selectedRoom ? window.selectedRoom : 'Not selected';
        if (calendarSelectedStart && calendarSelectedEnd) {
            datesField.value = `${calendarSelectedStart.getDate()}/${calendarSelectedStart.getMonth()+1}/${calendarSelectedStart.getFullYear()} - ${calendarSelectedEnd.getDate()}/${calendarSelectedEnd.getMonth()+1}/${calendarSelectedEnd.getFullYear()}`;
        } else if (calendarSelectedStart) {
            datesField.value = `${calendarSelectedStart.getDate()}/${calendarSelectedStart.getMonth()+1}/${calendarSelectedStart.getFullYear()}`;
        } else {
            datesField.value = 'Not selected';
        }
    }
    // Remove MutationObserver to prevent recursion
    // Remove window.updateBookingChips assignment to prevent recursion
    updateHiddenFields();
});
