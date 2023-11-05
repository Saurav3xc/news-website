let url = "https://newsapi.org/v2/everything?q=";
let apiKey = "9021073ace60451bb2e12f2be3a86db0";
window.addEventListener('load', () => {
  fetchNews("india");
});

let logo=document.getElementById('logos');
logo.addEventListener('click',reload);
function reload(){
  window.location.reload();
}
async function fetchNews(query) {
  let res = await fetch(`${url}${query}&apiKey=${apiKey}`);
  let data = await res.json();
  bindData(data.articles);
}

function bindData(articles) {
  let container = document.getElementById("container");
  let template = document.getElementById("templates");
  container.innerHTML="";
  articles.forEach((article) => {
    const templateClone = template.content.cloneNode(true);
    fillData(templateClone, article);
    container.appendChild(templateClone);
  });
}

function fillData(templateClone, article) {
  let image = templateClone.querySelector('#images');
  let h3 = templateClone.querySelector('#title');
  let h6 = templateClone.querySelector('#sources');
  let p=templateClone.querySelector('#para')
  if (image && article.urlToImage) {
    image.src = article.urlToImage;
  }

  if (h3) {
    h3.innerHTML = article.title;
  }

  if (h6) {
   let dates= new Date(article.publishedAt).toLocaleString('en-US',{
     timeZone:"Asia/Jakarta"
   });
   let source=`${article.source.name}+ ${dates}`
   h6.innerHTML=source;
  }
  if(p){
    p.innerHTML =article.description ;
  }
  templateClone.firstElementChild.addEventListener('click',()=>{
    window.open(article.url,"_blank");
  })
  
  
  
}


function onnav(id){
  fetchNews(id);
  
}

let searchbtn=document.querySelector ('#search-btn');
searchbtn.addEventListener('click',()=>{
  let search=document.querySelector('#search').value;
  if(!search){null}
  else{
  fetchNews(search);}
})




// let url = "";
// let apiKey = "9021073ace60451bb2e12f2be3a86db0";
// let query = document.getElementById('search');
// let btn = document.querySelector("button");

// btn.addEventListener('click', async () => {
//   let newq = `=${query.value}`;
//   url = `https://newsapi.org/v2/everything?q${newq}&apiKey=${apiKey}`;

//   try {
//     let res = await fetch(url);
//     let data = await res.json();

//     if (data.articles) {
//       let box = document.querySelector('.box');
//       data.articles.map((article) => {
//         let title = document.createElement('h2');
//         title.textContent = article.title;
//         box.appendChild(title);
//       });
//     } else {
//       console.log("No articles found.");
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// });
