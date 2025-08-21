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
document.addEventListener('DOMContentLoaded', function() {
    renderCalendar(currentMonth, currentYear);
    updateCalendarMessage();
});
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    const navButtons = document.querySelectorAll('.nav-item');
    const index = ['home', 'rooms', 'book', 'location'].indexOf(sectionId);
    if (index >= 0 && navButtons[index]) {
        navButtons[index].classList.add('active');
    }
    if (sectionId === 'book') {
        setTimeout(() => {
            document.getElementById('calendar').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
}
function selectRoom(roomType) {
    selectedRoom = roomType;
}
function renderCalendar(month, year) {
    const calendarEl = document.getElementById('calendar');
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDay = firstDay.getDay();
    const today = new Date();
    const isCurrentMonth = month === today.getMonth() && year === today.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let calendarHTML = `
        <div class="flex justify-between items-center mb-4">
            <button onclick="gotoPrevMonth()" class="p-2 rounded-full hover:bg-gray-100">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            <h3 class="text-lg font-bold">${monthNames[month]} ${year}</h3>
            <button onclick="gotoNextMonth()" class="p-2 rounded-full hover:bg-gray-100">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
        <div class="grid grid-cols-7 gap-1 mb-2">
            <div class="text-center text-sm font-medium">Sun</div>
            <div class="text-center text-sm font-medium">Mon</div>
            <div class="text-center text-sm font-medium">Tue</div>
            <div class="text-center text-sm font-medium">Wed</div>
            <div class="text-center text-sm font-medium">Thu</div>
            <div class="text-center text-sm font-medium">Fri</div>
            <div class="text-center text-sm font-medium">Sat</div>
        </div>
        <div class="grid grid-cols-7 gap-1">
    `;
    for (let i = 0; i < startingDay; i++) {
        calendarHTML += `<div class="h-10"></div>`;
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isToday = isCurrentMonth && day === today.getDate();
        const isPast = date < today && !isToday;
        const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
        let dayClass = "calendar-day h-10 flex items-center justify-center rounded-full cursor-pointer";
        if (isSelected) dayClass += " selected";
        if (isToday) dayClass += " today";
        if (isPast) dayClass += " disabled";
        calendarHTML += `
            <div onclick="${isPast ? '' : `selectDay(${day})`}" class="${dayClass}">
                ${day}
            </div>
        `;
    }
    calendarHTML += `</div>`;
    calendarEl.innerHTML = calendarHTML;
}
function gotoPrevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
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
