
const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
const newsDiv = document.querySelector("#news");
const catFilters = document.querySelector("#category-filter ul").children;

for (const catFilter of catFilters) {
    catFilter.children[0].onclick = (e) => {
        const cat = e.currentTarget.textContent;
        clearChildrenOf(newsDiv);
        const h2 = document.createElement("h2");
        h2.textContent = cat + " news";
        newsDiv.appendChild(h2);
        fetchNews(cat);
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
        const { author, description, title, url, urlToImage } = article;

        const card = document.createElement("div");
        const head = document.createElement("div");
        const body = document.createElement("div");
        const header = document.createElement("div");
        const main = document.createElement("div");

        card.className = "article-card";
        head.className = "card-head";
        body.className = "card-body";
        header.className = "card-body-header";
        main.className = "card-body-main";

        card.appendChild(head);
        card.appendChild(body);
        body.appendChild(header);
        body.appendChild(main);

        const thumb = document.createElement("img");
        const linkTitle = document.createElement("a");
        const hTitle = document.createElement("h3");
        const hAuthor = document.createElement("h4");
        const desc = document.createElement("p");

        thumb.src = urlToImage;
        linkTitle.href = url;
        hTitle.textContent = title;
        hAuthor.textContent = author;
        desc.textContent = description;

        head.appendChild(thumb);
        linkTitle.appendChild(hTitle);
        header.appendChild(linkTitle);
        header.appendChild(hAuthor);
        main.appendChild(desc);

        newsDiv.appendChild(card);

    });
}
