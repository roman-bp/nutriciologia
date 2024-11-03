let articlesData = [];

// Завантажуємо дані з JSON
fetch('blogData.json')
    .then(response => response.json())
    .then(data => {
        articlesData = data.articles;
        displayCategories();
    })
    .catch(error => {
        console.error('Помилка завантаження JSON:', error);
    });

// Функція для відображення категорій
function displayCategories() {
    const categoriesContainer = document.getElementById('category-list');
    const blogPostsSection = document.getElementById('blog-posts');
    const categoriesSection = document.getElementById('categories');

    categoriesContainer.innerHTML = ''; // Очищаємо список категорій
    categoriesSection.style.display = 'block';
    blogPostsSection.style.display = 'none';

    // Знаходимо унікальні категорії
    const categories = [...new Set(articlesData.map(article => article.category))];

    // Додаємо кнопки для кожної категорії
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.onclick = () => displayArticlesByCategory(category);
        categoriesContainer.appendChild(button);
    });
}

// Функція для відображення статей у вибраній категорії
function displayArticlesByCategory(category) {
    const postsList = document.getElementById('posts-list');
    const blogPostsSection = document.getElementById('blog-posts');
    const categoriesSection = document.getElementById('categories');
    const categoryTitle = document.getElementById('category-title');

    postsList.innerHTML = ''; // Очищаємо список статей
    categoryTitle.textContent = category;
    categoriesSection.style.display = 'none';
    blogPostsSection.style.display = 'block';

    // Фільтруємо статті за категорією і відображаємо їх
    articlesData
        .filter(article => article.category === category)
        .forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.classList.add('post');

            const img = document.createElement('img');
            img.src = article.image;
            img.alt = `Зображення статті ${article.title}`;
            articleElement.appendChild(img);

            const title = document.createElement('h2');
            title.textContent = article.title;
            articleElement.appendChild(title);

            const description = document.createElement('p');
            description.textContent = article.description;
            articleElement.appendChild(description);

            const readMore = document.createElement('button');
            readMore.classList.add('read-more');
            readMore.textContent = 'Читати далі';
            readMore.onclick = () => openArticle(article.id);
            articleElement.appendChild(readMore);

            postsList.appendChild(articleElement);
        });
}

// Функція для переходу до повної статті
function openArticle(id) {
    window.location.href = `article.html?id=${id}`;
}

// Функція для повернення до категорій
function showCategories() {
    displayCategories();
}
