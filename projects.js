document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('projects.json');
        const data = await response.json();
        
        const projectsContainer = document.querySelector('.row.g-4');
        projectsContainer.innerHTML = '';
        
        data.projects.forEach((project, index) => {
            const projectHTML = `
                <div class="col-md-4">
                    <div class="card"> 
                        <div class="card-body">
                            <h5 class="card-title">${project.title}</h5>
                        </div>
                        <div id="carousel-${project.id}" class="carousel carousel-fade slide" data-ride="false" data-interval="false">
                            <div class="carousel-inner">
                                ${project.imagePairs.map((pair, pairIndex) => `
                                    <div class="carousel-item ${pairIndex === 0 ? 'active' : ''}">
                                        <img src="${pair.before}" class="d-block w-100 carousel-image" alt="Before" style="border-radius: 10px;">
                                        <div class="badge before">Before</div>
                                    </div>
                                    <div class="carousel-item">
                                        <img src="${pair.after}" class="d-block w-100 carousel-image" alt="After" style="border-radius: 10px;">
                                        <div class="badge after">After</div>
                                    </div>
                                `).join('')}
                            </div>
                            <p class="card-text">${project.description}</p>
                            <a class="carousel-control-prev" href="#carousel-${project.id}" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            </a>
                            <a class="carousel-control-next" href="#carousel-${project.id}" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            projectsContainer.insertAdjacentHTML('beforeend', projectHTML); 
        });

        // Updated modal handler to ensure proper image sizing
        initializeFullScreenHandlers();
        
    } catch (error) {
        console.error('Error loading projects:', error);
    }
});

function initializeFullScreenHandlers() {
    const carouselImages = document.querySelectorAll('.carousel-image');
    const fullScreenCarouselInner = document.querySelector('#fullScreenCarousel .carousel-inner');

    carouselImages.forEach((img) => {
        img.addEventListener('click', () => {
            if (window.innerWidth > 767) {
                fullScreenCarouselInner.innerHTML = '';
                const allImages = img.closest('.carousel').querySelectorAll('.carousel-item');

                allImages.forEach((item) => {
                    const badgeText = item.querySelector('.badge').textContent;
                    const modalItem = document.createElement('div');
                    modalItem.classList.add('carousel-item');
                    modalItem.innerHTML = `
                        <img src="${item.querySelector('img').src}" 
                             class="d-block w-100" 
                             alt="Modal Image"
                             style="max-width: 90vw; max-height: 90vh; margin: auto; object-fit: contain; top: 50%; left: 50%;">
                        <div class="badge">${badgeText}</div>
                    `;
                    fullScreenCarouselInner.appendChild(modalItem);
                });

                fullScreenCarouselInner.firstChild.classList.add('active');
                $('#imageModal').modal('show');
            }
        });
    });
}