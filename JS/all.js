document.addEventListener('DOMContentLoaded', function () {
    const articles = document.querySelectorAll('.article');
    let index = 0;

    function showArticle(index) {
        articles.forEach((article, i) => {
            if (i === index) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none'; 
            }
        });
    }
    document.getElementById('nextnew').addEventListener('click', function () {
        index = (index + 1) % articles.length; 
        showArticle(index);
    });
});