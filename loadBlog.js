// Завантаження статей із JSON-файлу
fetch('blogData.json')
    .then(response => response.json())
    .then(data => {
        const blogContainer = document.getElementById('blog-posts');
        data.articles.forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.classList.add('post');

            // Додаємо зображення
            const img = document.createElement('img');
            img.src = article.image;
            img.alt = `Зображення статті ${article.title}`;
            articleElement.appendChild(img);

            // Додаємо заголовок
            const title = document.createElement('h2');
            title.textContent = article.title;
            articleElement.appendChild(title);

            // Додаємо опис
            const description = document.createElement('p');
            description.textContent = article.description;
            articleElement.appendChild(description);

            // Додаємо кнопку для читання повного тексту
            const readMore = document.createElement('a');
            readMore.href = '#';
            readMore.classList.add('read-more');
            readMore.textContent = 'Читати далі';
            articleElement.appendChild(readMore);

            // Додаємо статтю в контейнер блогу
            blogContainer.appendChild(articleElement);
        });
    })
    .catch(error => {
        console.error('Помилка завантаження JSON:', error);
    });
