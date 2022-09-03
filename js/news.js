// call api and return a promise for news category
const loadCategory = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
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

const displayNews = async (categoryId) => {
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

    // display news details
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = ``;
    newsId.forEach(news => {
        console.log(news)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.classList.add('p-3');
        newsDiv.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${news.thumbnail_url}" class="img-fluid rounded" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.slice(0, 500)}...</p>
                </div>
            </div>
        </div>
        `;
        newsDetails.appendChild(newsDiv);
    })
}


loadCategory();