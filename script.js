 document.addEventListener('DOMContentLoaded', () => {
            AOS.init({
                duration: 1000,
                once: false,
                mirror: true
            });

            const cursor = document.querySelector('.cursor');
            const trail1 = document.querySelector('.trail1');
            const trail2 = document.querySelector('.trail2');


            let mouseX = 0;
            let mouseY = 0;

            let x1 = 0, y1 = 0;
            let x2 = 0, y2 = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;

                cursor.style.left = mouseX + 'px';
                cursor.style.top = mouseY + 'px';
            });

            function animate() {

                // 가장 가까운 원
                x1 += (mouseX - x1) * 0.12;
                y1 += (mouseY - y1) * 0.12;

                // 두 번째 원
                x2 += (x1 - x2) * 0.08;
                y2 += (y1 - y2) * 0.08;


                trail1.style.left = x1 + 'px';
                trail1.style.top = y1 + 'px';

                trail2.style.left = x2 + 'px';
                trail2.style.top = y2 + 'px';


                requestAnimationFrame(animate);
            }

            animate();

            const counters = document.querySelectorAll('.counter');

            function startCounter(counter) {
                counter.innerText = counter.dataset.suffix ? '0' + counter.dataset.suffix : '0';

                const target = Number(counter.dataset.target);
                const suffix = counter.dataset.suffix || '';
                const duration = 2000;
                const increment = target / (duration / 16);

                const updateCounter = () => {
                const value = Number(counter.innerText.replace(/\D/g, ''));

                if (value < target) {
                    counter.innerText = Math.ceil(value + increment) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + suffix;
                }
                };

                updateCounter();
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startCounter(entry.target);
                }
                });
            }, {
                threshold: 0.5
            });

            counters.forEach(counter => {
                observer.observe(counter);
            });

        const menuItems = document.querySelectorAll(".menu a , .contact_btn, .contact_button");
        menuItems.forEach(item => {

        item.addEventListener("mouseenter", () => {
            cursor.classList.add("active");
        });

        item.addEventListener("mouseleave", () => {
            cursor.classList.remove("active");
        });
    });
});