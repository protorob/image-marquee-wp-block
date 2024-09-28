document.addEventListener('DOMContentLoaded', function () {
    const marquees = document.querySelectorAll('.imgb-marquee-inner');

    marquees.forEach(marqueeInner => {
        const marqueeContainer = marqueeInner.closest('.imgb-marquee');
        const speed = parseFloat(marqueeContainer.getAttribute('data-speed')) || 1; // Get speed from data attribute

        const images = Array.from(marqueeInner.children);
        let totalImageWidth = marqueeInner.scrollWidth;

        // Ensure enough images are duplicated for scrolling in both directions
        while (totalImageWidth < marqueeContainer.offsetWidth * 2) {
            images.forEach((img) => {
                const clone = img.cloneNode(true);
                marqueeInner.appendChild(clone); // Always append images to cover the width for both directions
            });
            totalImageWidth = marqueeInner.scrollWidth; // Recalculate total image width after duplication
        }

        let scrollAmount = 0;

        // If reverse scrolling, start from the end of the marquee
        if (speed < 0) {
            scrollAmount = -totalImageWidth / 2; // Start from the end for reverse scroll
        }

        function scrollMarquee() {
            scrollAmount -= speed; // Move forward or reverse depending on speed

            // For forward scroll (positive speed), reset when we've scrolled through half the total width
            if (speed > 0 && Math.abs(scrollAmount) >= totalImageWidth / 2) {
                scrollAmount = 0; // Reset for forward scrolling
            }

            // For reverse scroll (negative speed), reset when we hit half the total width in reverse
            if (speed < 0 && scrollAmount >= 0) {
                scrollAmount = -totalImageWidth / 2; // Reset for reverse scrolling to start from the end
            }

            // Apply the scrolling
            marqueeInner.style.transform = `translateX(${scrollAmount}px)`;

            requestAnimationFrame(scrollMarquee); // Keep the animation going
        }

        scrollMarquee(); // Start scrolling
    });
});
