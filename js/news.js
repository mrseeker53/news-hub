// call api and return a promise for news category
const loadCategory = async () => {
    // error handler
    try {
        const url = 'https://openapi.programming-hero.com/api/news/categories'
        const res = await fetch(url);
        const data = await res.json();
        displayCategory(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}

// display categories
const displayCategory = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const categoryLi = document.createElement('li');
        categoryLi.classList.add('nav-item')
        categoryLi.innerHTML = `
        <a onclick="displayNews('${category.category_id}')" class="nav-link text-secondary" href="#${category.category_name}">${category.category_name}</a>
        `;
        categoryContainer.appendChild(categoryLi);
    })
}

// call api for news
const displayNews = async (categoryId) => {
    // start spinner
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDatails(data.data)
}

const displayNewsDatails = async (newsId) => {
    // display total news
    const totalNews = document.getElementById('total-news');
    totalNews.innerHTML = `
    <h5>${newsId.length ? newsId.length :
            'No'} News Found</h5>
    `;

    // most viewed news display first
    newsId.sort((a, b) => b.total_view - a.total_view);

    // display news details
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = ``;
    newsId.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.classList.add('p-3');
        newsDiv.innerHTML = `
        <div class="container row g-0">
            <div class="col-md-4">
                <img src="${news.thumbnail_url}" class="img-fluid rounded" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.slice(0, 500)}...</p>
                </div>
                <div class="col-4 d-flex align-items-center px-3 pt-3">
                    <img class="img-fluid rounded w-25 me-3" src="${news.author.img}"
                    <h5 class="pe-5 me-5">${news.author.name}</h5>
                    <span class="px-5 mx-5">${news.total_view}</span>
                    <button onclick="loadNewsInfo('${news._id}')" class="btn btn-primary px-5" data-bs-toggle="modal" data-bs-target="#newsInfoModal">Info</button>
                </div>
            </div>
        </div>
        `;
        newsDetails.appendChild(newsDiv);
    })

    // stop spinner
    toggleSpinner(false);
}

const loadNewsInfo = async (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    const res = await fetch(url);
    const data = await res.json();
    displayNewsInfo(data.data[0])
}

// view info using modal
const displayNewsInfo = (info) => {
    const modalTitle = document.getElementById('newsInfoModalLabel');
    modalTitle.innerText = info.title;
    const phoneDetails = document.getElementById('news-info');
    phoneDetails.innerHTML = `
    <p>Author Name: ${info.author.name ? info.author.name : 'Data Not Available'}</p>
    <p>Published Date: ${info.author.published_date ? info.author.published_date : 'Data Not Available'}</p>
    <p>Total View: ${info.total_view ? info.total_view : 'Data Not Available'}</p>
    `
}

// spinner
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

loadCategory();