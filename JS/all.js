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


document.getElementById("submitBtn").addEventListener("click", function () {
    var nameInput = document.getElementById("contact-Name");
    var emailInput = document.getElementById("contact-Email");
    var phoneInput = document.getElementById("phone-Number");
    var languageInput = document.getElementById("preffered-Language");
    var inquiryInput = document.getElementById("inquiry");

    nameInput.style.backgroundColor = "lightgreen";
    emailInput.style.backgroundColor = "lightgreen";
    phoneInput.style.backgroundColor = "lightgreen";
    languageInput.style.backgroundColor = "lightgreen";
    inquiryInput.style.backgroundColor = "lightgreen";

    submitBtn.textContent = "Message sent!";

    setTimeout(function () {
        submitBtn.textContent = "Submit";
        nameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
        inquiryInput.value = "";
        nameInput.style.backgroundColor = "white";
        emailInput.style.backgroundColor = "white";
        phoneInput.style.backgroundColor = "white";
        languageInput.style.backgroundColor = "white";
        inquiryInput.style.backgroundColor = "white";
    }, 2000);
});
