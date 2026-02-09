/* ============================================
   RECYCLED CARBON FIBER BLOG - JAVASCRIPT
   Sidebar Navigation & Interactive Features
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".blog-sidebar-link");

  // Highlight active section in sidebar based on scroll position
  function highlightActiveSection() {
    let scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Throttle scroll events for better performance
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(function () {
      highlightActiveSection();
    });
  });

  // Initial highlight on page load
  highlightActiveSection();

  // Smooth scrolling for sidebar links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerOffset = 40;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Update active state immediately
        navLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");

        // Close mobile sidebar if open
        const sidebar = document.querySelector(".blog-sidebar");
        if (sidebar && sidebar.classList.contains("active")) {
          sidebar.classList.remove("active");
        }
      }
    });
  });

  // Add subtle animation to cards on scroll into view
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Animate cards
  const animatedElements = document.querySelectorAll(
    ".stat-card, .conclusion-card, .learn-more-card, .feature-item, .spec-card",
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  // Add hover effect enhancement to images
  const images = document.querySelectorAll(
    ".full-width-image, .split-image img",
  );
  images.forEach((img) => {
    img.addEventListener("mouseenter", function () {
      this.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      this.style.transform = "scale(1.01)";
      this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)";
    });
    img.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
    });
  });

  // Table row hover highlight
  const tableRows = document.querySelectorAll(".data-table tbody tr");
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f1f5f9";
    });
    row.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });
  });

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  const createBackToTop = () => {
    const button = document.createElement("button");
    button.innerHTML = "\u2191";
    button.className = "back-to-top";
    button.setAttribute("aria-label", "Scroll to top");
    button.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #bf3425 0%, #9d2a1e 100%);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 20px;
      font-weight: bold;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(191, 52, 37, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
      this.style.boxShadow = "0 8px 25px rgba(191, 52, 37, 0.4)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 4px 15px rgba(191, 52, 37, 0.3)";
    });

    button.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    document.body.appendChild(button);

    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 500) {
        button.style.opacity = "1";
        button.style.visibility = "visible";
      } else {
        button.style.opacity = "0";
        button.style.visibility = "hidden";
      }
    });
  };

  createBackToTop();

  // ============================================
  // READING PROGRESS INDICATOR
  // ============================================
  const createProgressBar = () => {
    const progressBar = document.createElement("div");
    progressBar.className = "reading-progress";
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #bf3425, #47577c);
      z-index: 9999;
      transition: width 0.1s linear;
      width: 0%;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", function () {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      progressBar.style.width = progress + "%";
    });
  };

  createProgressBar();

  // ============================================
  // MOBILE NAVIGATION TOGGLE
  // ============================================
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const sidebar = document.querySelector(".blog-sidebar");

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", function () {
      sidebar.classList.toggle("active");

      // Toggle icon between hamburger and close
      if (sidebar.classList.contains("active")) {
        this.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        `;
      } else {
        this.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `;
      }
    });
  }

  console.log("Recycled Carbon Fiber Blog - Scripts loaded successfully");
});
//   <!-- INFOGRAPHIC PLACEHOLDER 2 -->
//    <!-- INFOGRAPHIC PLACEHOLDER 3 -->
//    <!-- INFOGRAPHIC PLACEHOLDER 4 -->
//   <!-- INFOGRAPHIC PLACEHOLDER 5 -->
//  <!-- INFOGRAPHIC PLACEHOLDER 6 -->
//   <!-- INFOGRAPHIC PLACEHOLDER 7 -->
//   <!-- INFOGRAPHIC PLACEHOLDER 8 -->
//    <!-- INFOGRAPHIC PLACEHOLDER 9 -->
(function () {
  var details = {
    roof: '<strong style="color:#bf3425;">Roof Panel</strong> — Body panel requiring stiffness and low areal weight. <strong>Aligned rCF</strong> provides sufficient modulus for Class A surfaces with 40–60% cost savings vs. virgin CF. Typical V<sub>f</sub> ≈ 45–55%.',
    apillar:
      '<strong style="color:#47577c;">A-Pillar Reinforcement</strong> — Structural member critical for occupant protection in frontal and rollover impacts. <strong>High-alignment rCF</strong> (TuFF/HiPerDiF) needed to meet crash performance targets with &gt;75% strength retention.',
    bpillar:
      '<strong style="color:#47577c;">B-Pillar Reinforcement</strong> — Key side-impact crash structure. Requires <strong>high-alignment rCF</strong> for energy absorption and intrusion resistance. Progressive crushing behavior critical for passenger safety.',
    battery:
      '<strong style="color:#9d9d9c;">Battery Enclosure</strong> — EV battery housing providing EMI shielding and thermal management. <strong>Carded rCF</strong> is acceptable — conductive fiber network provides shielding effectiveness &gt;40 dB while reducing weight 30% vs. aluminum.',
    crashbox:
      '<strong style="color:#bf3425;">Crash Box</strong> — Front/rear energy absorbers designed for progressive crushing. <strong>Aligned rCF</strong> achieves SEA of 30–33 kJ/kg (~90% of virgin CF), with fiber pull-out and fragmentation as primary energy absorption mechanisms.',
  };

  window.showDetail = function (key) {
    var panel = document.getElementById("autoDetailPanel");
    var defaultEl = document.getElementById("autoDetailDefault");
    var contentEl = document.getElementById("autoDetailContent");
    if (details[key]) {
      defaultEl.style.display = "none";
      contentEl.style.display = "block";
      contentEl.innerHTML = details[key];
      panel.style.borderColor =
        key === "battery"
          ? "#9d9d9c"
          : key === "apillar" || key === "bpillar"
            ? "#47577c"
            : "#bf3425";
    }
  };

  window.hideDetail = function () {
    var defaultEl = document.getElementById("autoDetailDefault");
    var contentEl = document.getElementById("autoDetailContent");
    defaultEl.style.display = "";
    contentEl.style.display = "none";
    document.getElementById("autoDetailPanel").style.borderColor = "#e2e8f0";
  };
})();
