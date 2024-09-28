document.addEventListener('DOMContentLoaded', function () {
    const marquees = document.querySelectorAll('.imgb-marquee-inner');

    marquees.forEach(marqueeInner => {
        const marqueeContainer = marqueeInner.closest('.imgb-marquee');
        const speed = parseFloat(marqueeContainer.getAttribute('data-speed')) || 1; // Get speed from data attribute

        const images = Array.from(marqueeInner.children);
        let totalImageWidth = images.reduce((acc, img) => acc + img.offsetWidth, 0);

        // Step 1: Duplicate images until they fill the container at least once
        while (totalImageWidth < marqueeContainer.offsetWidth) {
            images.forEach(img => {
                const clone = img.cloneNode(true);
                marqueeInner.appendChild(clone);
            });
            totalImageWidth = Array.from(marqueeInner.children).reduce((acc, img) => acc + img.offsetWidth, 0);
        }

        let scrollAmount = 0;

        function scrollMarquee() {
            scrollAmount -= speed; // Move based on speed (positive or negative)

            const firstImage = marqueeInner.children[0];
            const lastImage = marqueeInner.children[marqueeInner.children.length - 1];

            const firstImageWidth = firstImage.offsetWidth;
            const lastImageWidth = lastImage.offsetWidth;

            // Forward scrolling: if the first image has moved out of view, move it to the end
            if (speed > 0 && scrollAmount <= -firstImageWidth) {
                marqueeInner.appendChild(firstImage); // Move first image to the end
                scrollAmount += firstImageWidth; // Adjust scrollAmount to account for the shifted image
            }

            // Reverse scrolling: if the last image has moved out of view, move it to the front
            if (speed < 0 && scrollAmount >= 0) {
                marqueeInner.insertBefore(lastImage, firstImage); // Move last image to the front
                scrollAmount -= lastImageWidth; // Adjust scrollAmount to account for the shifted image
            }

            // Apply the scroll transformation
            marqueeInner.style.transform = `translateX(${scrollAmount}px)`;

            requestAnimationFrame(scrollMarquee); // Keep the scrolling loop running
        }

        scrollMarquee(); // Start scrolling
    });
});
