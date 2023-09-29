
const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
const newsDiv = document.querySelector("#news");
const catFilterLinks = document.querySelectorAll("#category-filter ul a");

for (const catLink of catFilterLinks) {
    catLink.onclick = (e) => {
        const self = e.currentTarget;
        catFilterLinks.forEach(link => link.classList.remove("active", "disabled"));
        self.classList.add("active", "disabled");
        
        clearChildrenOf(newsDiv);

        const h2 = document.createElement("h2");
        h2.textContent = self.textContent + " news";
        h2.style.textTransform = "capitalize";

        newsDiv.appendChild(h2);
        fetchNews(self.textContent);
    }
}

function clearChildrenOf(node) {
    while (node.firstChild) {
        node.firstChild.remove();
    }
}

async function fetchNews(category) {
    const cat = (category) ? `&category=${category}` : "";
    try {
        const resp = await fetch(url + cat);
        const json = await resp.json();
        console.log(json);
        displayNews(json.articles);
    } catch (error) {
        console.error(error);
    }
}

function displayNews(articles) {
    articles.forEach(article => {
        const card = createCard(article);
        const col = document.createElement("div");
        col.className = "col mb-3";
        col.appendChild(card);

        newsDiv.appendChild(col);
    });
}

function createCard({ title = "", author = "", description = "", url = "", urlToImage = "", publishedAt = "" }) {
    title = title === null ? "" : title;
    author = author === null ? "" : author;
    description = description === null ? "" : description;

    const card = document.createElement('div');
    card.classList.add('card', "shadow-sm");
    card.innerHTML = (urlToImage) ? `<img src="${urlToImage}" class="card-img-top" alt="news article">` : "";

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.innerHTML = `
      <h5 class="card-title">
        <a href="${url}" class="card-link">${title}</a>
      </h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">${author}</h6>
      <p class="card-text">${description}</p>
    `;

    // card.innerHTML += (publishedAt) ? `<div class="card-footer text-body-secondary">${publishedAt}</div>` : "";

    card.appendChild(cardBody);
    return card;
}
