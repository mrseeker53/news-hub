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
        console.log(category)
        const categoryLi = document.createElement('li');
        categoryLi.classList.add('nav-item')
        categoryLi.innerHTML = `
        <a class="nav-link text-secondary" href="#${category.category_name}">${category.category_name}</a>
        `;
        categoryContainer.appendChild(categoryLi);
    })

}

loadCategory();