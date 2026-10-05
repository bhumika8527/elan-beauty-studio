document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. SMOOTH SCROLLING
    // ==========================================

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {
        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // ==========================================
    // 2. GALLERY FILTERS
    // ==========================================

    const filterButtons = document.querySelectorAll(".gallery-filter");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Remove active class from all buttons
            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            // Add active class to clicked button
            this.classList.add("active");

            const selectedCategory = this.getAttribute("data-filter");

            galleryItems.forEach(function (item) {

                const itemCategory = item.getAttribute("data-category");

                if (
                    selectedCategory === "all" ||
                    selectedCategory === itemCategory
                ) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }

            });
        });
    });


    // ==========================================
    // 3. ACTIVE NAVBAR LINK ON SCROLL
    // ==========================================

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar .nav-link");

    window.addEventListener("scroll", function () {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }

        });
    });


    // ==========================================
    // 4. PREVENT PAST APPOINTMENT DATES
    // ==========================================

    const dateInput = document.getElementById("date");

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        const todayFormatted = `${year}-${month}-${day}`;

        dateInput.setAttribute("min", todayFormatted);
    }


    // ==========================================
    // 5. APPOINTMENT FORM
    // ==========================================

    const appointmentForm = document.querySelector(".appointment-form");

    if (appointmentForm) {

        appointmentForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const service = document.getElementById("service").value;
            const date = document.getElementById("date").value;

            if (!name || !phone || !service || !date) {
                alert("Please fill in all required fields.");
                return;
            }

            alert(
                `Thank you, ${name}!\n\n` +
                `Your appointment request for ${service} has been received.\n` +
                `Preferred date: ${date}\n\n` +
                `The ÉLAN team will contact you to confirm your appointment.`
            );

            appointmentForm.reset();
        });
    }


    // ==========================================
    // 6. CLOSE MOBILE NAVBAR AFTER CLICK
    // ==========================================

    const navbarLinks = document.querySelectorAll(
        ".navbar-collapse .nav-link, .navbar-collapse .elan-nav-btn"
    );

    const navbarCollapse = document.getElementById("elanNavbar");

    navbarLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (
                window.innerWidth < 992 &&
                navbarCollapse &&
                navbarCollapse.classList.contains("show")
            ) {

                const collapseInstance =
                    bootstrap.Collapse.getInstance(navbarCollapse);

                if (collapseInstance) {
                    collapseInstance.hide();
                }
            }

        });

    });

});