let articlesData = { articles: [] };

// Функція для додавання нової статті
function addArticle() {
    const category = document.getElementById("category").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const content = document.getElementById("content").value;

    // Обробка вибраного логотипу
    const logoFile = document.getElementById("logo").files[0];
    const logoPath = logoFile ? "images/" + logoFile.name : ""; // Додаємо префікс до шляху

    // Обробка вибраних файлів для статті
    const articleImages = [];
    const articleFiles = document.getElementById("articleImages").files;
    for (let i = 0; i < articleFiles.length; i++) {
        articleImages.push("images/" + articleFiles[i].name); // Додаємо префікс до шляху
    }

    // Створюємо новий об'єкт статті
    const newArticle = {
        id: Date.now(),
        category: category,
        title: title,
        description: description,
        image: logoPath,
        additionalImages: articleImages, // Додаємо масив зображень до статті
        content: content
    };

    // Додаємо нову статтю до списку статей
    articlesData.articles.unshift(newArticle);

    // Оновлюємо JSON у форматі для копіювання
    displayJSON();
}

// Функція для відображення JSON у форматі для копіювання
function displayJSON() {
    const jsonOutput = document.getElementById("jsonOutput");
    jsonOutput.textContent = JSON.stringify(articlesData, null, 2);
}

// Завантаження існуючого JSON (якщо доступний)
fetch('blogData.json')
    .then(response => response.json())
    .then(data => {
        articlesData = data;
        displayJSON();
    })
    .catch(error => console.error('Помилка завантаження JSON:', error));
