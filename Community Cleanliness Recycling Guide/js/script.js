
// Mobile navigation menu
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });
}

// Show a preview of the selected report image
const imageInput = document.querySelector("#issueImage");
const imagePreview = document.querySelector("#imagePreview");

if (imageInput && imagePreview) {
  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
      imagePreview.src = URL.createObjectURL(file);
      imagePreview.hidden = false;
    }
  });
}

// Demo report form: saves reports only in this browser using LocalStorage
const reportForm = document.querySelector("#reportForm");
const reportNotice = document.querySelector("#reportNotice");

if (reportForm) {
  reportForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!reportForm.checkValidity()) {
      reportForm.reportValidity();
      return;
    }

    const report = {
      category: document.querySelector("#category").value,
      location: document.querySelector("#location").value.trim(),
      description: document.querySelector("#description").value.trim(),
      date: new Date().toLocaleDateString()
    };

    const savedReports = JSON.parse(localStorage.getItem("ecoWatchReports") || "[]");
    savedReports.push(report);
    localStorage.setItem("ecoWatchReports", JSON.stringify(savedReports));

    reportNotice.textContent = "Thank you! Your sample report was saved in this browser.";
    reportNotice.style.display = "block";
    reportForm.reset();
    if (imagePreview) imagePreview.hidden = true;
  });
}

// Search and filter the cleanliness guide cards
const guideSearch = document.querySelector("#guideSearch");
const guideFilter = document.querySelector("#guideFilter");
const guideCards = document.querySelectorAll(".guide-card");

function filterGuides() {
  const searchText = guideSearch ? guideSearch.value.toLowerCase() : "";
  const selectedCategory = guideFilter ? guideFilter.value : "all";

  guideCards.forEach((card) => {
    const textMatches = card.textContent.toLowerCase().includes(searchText);
    const categoryMatches = selectedCategory === "all" || card.dataset.category === selectedCategory;
    card.hidden = !(textMatches && categoryMatches);
  });
}

if (guideSearch) guideSearch.addEventListener("input", filterGuides);
if (guideFilter) guideFilter.addEventListener("change", filterGuides);

// Update the footer year automatically
const yearElement = document.querySelector("#currentYear");
if (yearElement) yearElement.textContent = new Date().getFullYear();
