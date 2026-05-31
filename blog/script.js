const articles = [
    {
        id: 1,
        title: "Septimus Heap Book One: Magyk",
        date: "July 5, 2022",
        description:
            "If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.",
        imgSrc:
            "https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg",
        imgAlt: "Cover of Septimus Heap Book One: Magyk",
        ages: "10-14",
        genre: "Fantasy",
        stars: "⭐⭐⭐⭐"
    },

    {
        id: 2,
        title: "Magnus Chase Book One: Sword of Summer",
        date: "December 12, 2021",
        description:
            "The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman mythology (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides his hand with Norse Mythology, and the end result is good.",
        imgSrc:
            "https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300",
        imgAlt: "Cover of Magnus Chase Book One",
        ages: "12-16",
        genre: "Fantasy",
        stars: "⭐⭐⭐⭐"
    },

    {
        id: 3,
        title: "Belgariad Book One: Pawn of Prophecy",
        date: "Feb 12, 2022",
        description:
            "A fierce dispute among the Gods and the theft of a powerful Orb leaves the world divided into five kingdoms. Young Garion, with his 'Aunt Pool' and an elderly man calling himselg Wolf -- a father and daughter granted near-inmortality by one of the Gods -- set out on a complex mission.",
        imgSrc:
            "https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg",
        imgAlt: "Cover of Pawn of Prophecy",
        ages: "12-16",
        genre: "Fantasy",
        stars: "⭐⭐⭐⭐⭐"
    },

];

const container = document.querySelector("#articles-container");

function createArticle(article) {
    return `
        <section class="article">

            <div class="book-details">
                <p class="date">${article.date}</p>
                <p>${article.ages}</p>
                <p>${article.genre}</p>
                <p class="stars">${article.stars}</p>
            </div>

            <article class="book-content">

                <h2>${article.title}</h2>

                <img
                    src="${article.imgSrc}"
                    alt="${article.imgAlt}"
                    loading="lazy"
                >

                <p>${article.description}</p>

            </article>

        </section>
    `;
}

function displayArticles() {

    const html = articles
        .map(createArticle)
        .join("");

    container.innerHTML = html;
}

displayArticles();            