
const services = [
    {id:"hair1", name:"Signature Haircut", category:"Hair Cuts & Styling", price:799, duration:45, products:"Nourishing shampoo and heat-protect serum", image:"https://images.unsplash.com/photo-1562322140-8baeececf3df?w=700"},
    {id:"hair2", name:"Blowout & Styling", category:"Hair Cuts & Styling", price:999, duration:60, products:"Volumising mousse and shine spray", image:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700"},
    {id:"face1", name:"Radiance Facial", category:"Facials & Skincare", price:1499, duration:60, products:"Cleanser, vitamin C serum and moisturiser", image:"https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700"},
    {id:"face2", name:"Hydra Glow Treatment", category:"Facials & Skincare", price:2199, duration:75, products:"Hyaluronic serum and hydration mask", image:"https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=700"},
    {id:"nail1", name:"Classic Manicure", category:"Manicure/Pedicure", price:599, duration:40, products:"Cuticle oil, hand cream and nail colour", image:"https://images.unsplash.com/photo-1604654894610-df63bc536371?w=700"},
    {id:"nail2", name:"Relaxing Pedicure", category:"Manicure/Pedicure", price:899, duration:50, products:"Foot soak, exfoliating scrub and foot butter", image:"https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=700"},
    {id:"bridal1", name:"Bridal Radiance Package", category:"Bridal Packages", price:8999, duration:240, products:"Premium facial kit, hair prep and makeup", image:"https://images.unsplash.com/photo-1529636798458-92182e662485?w=700"},
    {id:"bridal2", name:"Engagement & Party Glam", category:"Bridal Packages", price:3999, duration:120, products:"Primer, professional makeup and setting spray", image:"https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=700"}
];

const stylists = [
    {id:"s1", name:"Meera Kapoor", role:"Senior Hair Artist", rating:"4.9", reviews:128, review:"Understood exactly the look I wanted.", image:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600"},
    {id:"s2", name:"Sana Verma", role:"Skin & Facial Expert", rating:"4.8", reviews:96, review:"My skin felt amazing after the facial.", image:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600"},
    {id:"s3", name:"Riya Malhotra", role:"Nail Technician", rating:"4.9", reviews:84, review:"Beautiful details and a relaxing visit.", image:"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600"},
    {id:"s4", name:"Ananya Singh", role:"Bridal Makeup Artist", rating:"5.0", reviews:142, review:"Made my special day feel even more special.", image:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600"}
];

const timeSlots = {
    morning:["09:00 AM", "09:45 AM", "10:30 AM", "11:15 AM"],
    afternoon:["12:00 PM", "12:45 PM", "01:30 PM", "02:15 PM", "03:00 PM"],
    evening:["04:00 PM", "04:45 PM", "05:30 PM", "06:15 PM", "07:00 PM"]
};

function get(id) { return document.getElementById(id); }


function showServices(category = "all") {
    const grid = get("serviceGrid");
    if (!grid) return;

    const selectedServices = services.filter(service =>
        category === "all" || service.category === category
    );

    grid.innerHTML = selectedServices.map(service => `
        <div class="col-md-6 col-lg-4">
            <div class="card service-card">
                <img src="${service.image}" class="card-img-top" alt="${service.name}">
                <div class="card-body">
                    <h5>${service.name}</h5>
                    <p>${service.category}</p>
                    <p class="service-meta">₹${service.price} · ${service.duration} minutes</p>
                    <p class="product-note"><strong>Includes:</strong> ${service.products}</p>
                    <a href="booking.html?service=${service.id}" class="btn btn-outline-dark">Book This Service</a>
                </div>
            </div>
        </div>
    `).join("");
}

const categoryTabs = get("categoryTabs");
if (categoryTabs) {
    categoryTabs.addEventListener("click", function(event) {
        const button = event.target.closest("[data-category]");
        if (!button) return;

        document.querySelectorAll("#categoryTabs button").forEach(item => {
            item.classList.toggle("active", item === button);
        });
        showServices(button.dataset.category);
    });

    const categoryFromUrl = new URLSearchParams(window.location.search).get("category");
    const categoryButton = [...categoryTabs.querySelectorAll("[data-category]")]
        .find(button => button.dataset.category === categoryFromUrl);

    if (categoryButton) categoryButton.click();
    else showServices();
}


function showStylists() {
    const grid = get("stylistGrid");
    if (!grid) return;

    grid.innerHTML = stylists.map(stylist => `
        <div class="col-md-6 col-lg-3">
            <div class="card stylist-card">
                <img src="${stylist.image}" class="card-img-top" alt="${stylist.name}">
                <div class="card-body text-center">
                    <h5>${stylist.name}</h5>
                    <p>${stylist.role}</p>
                    <p>★ ${stylist.rating} (${stylist.reviews} reviews)</p>
                    <p class="product-note">"${stylist.review}"</p>
                    <a href="booking.html?stylist=${stylist.id}" class="btn btn-outline-dark">Choose Stylist</a>
                </div>
            </div>
        </div>
    `).join("");
}
showStylists();


function setupBookingPage() {
    const form = get("bookingForm");
    if (!form) return;

    get("serviceSelect").innerHTML += services.map(service =>
        `<option value="${service.id}">${service.name} — ₹${service.price}</option>`
    ).join("");

    get("stylistSelect").innerHTML += stylists.map(stylist =>
        `<option value="${stylist.id}">${stylist.name}</option>`
    ).join("");

    // Preselect an item when the visitor comes from another page.
    const params = new URLSearchParams(window.location.search);
    get("serviceSelect").value = params.get("service") || "";
    get("stylistSelect").value = params.get("stylist") || "";

    // Prevent selecting a date in the past.
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    get("appointmentDate").min = today.toISOString().slice(0, 10);

    let selectedTime = "";

    function updateSummary() {
        const service = services.find(item => item.id === get("serviceSelect").value);
        const stylist = stylists.find(item => item.id === get("stylistSelect").value);

        get("bookingSummary").textContent =
            `Service: ${service ? service.name : "Not selected"} | ` +
            `Stylist: ${stylist ? stylist.name : "Not selected"} | ` +
            `Date: ${get("appointmentDate").value || "Not selected"} | ` +
            `Time: ${selectedTime || "Not selected"} | ` +
            `Price: ${service ? "₹" + service.price : "Not available"}`;
    }

    function showTimeSlots() {
        selectedTime = "";
        get("slotError").textContent = "";
        const dateSelected = get("appointmentDate").value !== "";

        for (const period in timeSlots) {
            get(period + "Slots").innerHTML = timeSlots[period].map(time => `
                <button type="button" class="btn btn-outline-dark time-slot"
                    data-time="${time}" ${dateSelected ? "" : "disabled"}>${time}</button>
            `).join("");
        }
        updateSummary();
    }

    get("timeGroups").addEventListener("click", function(event) {
        const button = event.target.closest(".time-slot");
        if (!button || button.disabled) return;

        document.querySelectorAll(".time-slot").forEach(slot => slot.classList.remove("selected"));
        button.classList.add("selected");
        selectedTime = button.dataset.time;
        get("slotError").textContent = "";
        updateSummary();
    });

    form.addEventListener("change", function(event) {
        if (event.target.id === "appointmentDate") showTimeSlots();
        else updateSummary();
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        if (!selectedTime) {
            get("slotError").textContent = "Please select an appointment time.";
            return;
        }
        if (!form.reportValidity()) return;

        const service = services.find(item => item.id === get("serviceSelect").value);
        const stylist = stylists.find(item => item.id === get("stylistSelect").value);
        const booking = {
            id: "GG" + Date.now(),
            name: get("customerName").value.trim(),
            phone: get("customerPhone").value.trim(),
            email: get("customerEmail").value.trim(),
            service: service.name,
            price: service.price,
            duration: service.duration,
            stylist: stylist.name,
            date: get("appointmentDate").value,
            time: selectedTime
        };

        // Save appointment details in this browser.
        const bookings = JSON.parse(localStorage.getItem("glowGraceBookings") || "[]");
        bookings.push(booking);
        localStorage.setItem("glowGraceBookings", JSON.stringify(bookings));

        get("successMessage").textContent =
            `Thank you, ${booking.name}. Your appointment has been saved.`;
        get("receipt").textContent =
            `Booking ID: ${booking.id}\n` +
            `Service: ${booking.service}\n` +
            `Stylist: ${booking.stylist}\n` +
            `Date: ${booking.date}\n` +
            `Time: ${booking.time}\n` +
            `Price: ₹${booking.price}\n` +
            `Duration: ${booking.duration} minutes`;

        bootstrap.Modal.getOrCreateInstance(get("successModal")).show();
        form.reset();
        selectedTime = "";
        showTimeSlots();
        updateSummary();
    });

    showTimeSlots();
    updateSummary();
}
setupBookingPage();

const themeBtn = get("themeBtn");

function setTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeBtn) {
        themeBtn.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
    }
}


setTheme(localStorage.getItem("theme") || "light");


if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        const current = document.documentElement.getAttribute("data-bs-theme");
        setTheme(current === "dark" ? "light" : "dark");
    });
}