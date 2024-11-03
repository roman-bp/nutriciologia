// Отримуємо ID статті з URL
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

// Функція для завантаження статті
fetch('blogData.json')
    .then(response => response.json())
    .then(data => {
        const article = data.articles.find(article => article.id == articleId);
        if (article) {
            displayArticle(article);
        } else {
            document.getElementById('article-content').innerHTML = '<p>Стаття не знайдена.</p>';
        }
    })
    .catch(error => console.error('Помилка завантаження статті:', error));

    function displayArticle(article) {
        const articleContent = document.getElementById('article-content');
        articleContent.innerHTML = `
            <div class="article-header">
                <img src="${article.image}" alt="Лого статті">
                <h2>${article.title}</h2>
            </div>
            <div class="article-body">
                <div class="article-text">
                    <p>${article.description}</p>
                    <div>${article.content}</div>
                </div>
                <div class="article-images">
                    ${article.additionalImages.map(img => `<img src="${img}" alt="Додаткове зображення">`).join('')}
                </div>
            </div>
        `;
    }
    
