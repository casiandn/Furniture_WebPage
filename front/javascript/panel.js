// change article by clicking on anchors

const anchors = document.querySelectorAll('ul li a');
const articles = document.querySelectorAll('article');
for (const anchor of anchors) {
    anchor.addEventListener("click", (e) =>{
        e.preventDefault();
        const href = anchor.getAttribute('href'); // anchors must be the same as article id
        for (const article of articles) {
            article.id == href ? article.style.display = 'block' : article.style.display = 'none'
        }
    });
}