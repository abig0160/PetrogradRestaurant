// fetch data
/*fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (data) {

        dataReceived(data);
    })

function dataReceived(products) {
    //loop through products
    products.forEach(showProduct)
}
*/
//executed once for each product

//categories
function init() {
  fetch("https://kea-alt-del.dk/t5/api/categories").then(r => r.json()).then(
    function (data) {
      categoriesReceived(data)
    }
  )
}
init();

function categoriesReceived(cats) {
  createNavigation(cats);
  createSections(cats);
  fetchProducts();
}

function createSections(categories) {
  categories.forEach(category => {
    const section = document.createElement("section");
    section.setAttribute("id", category);
    const h2 = document.createElement("h2");
    h2.textContent = category;
    section.appendChild(h2);
    document.querySelector(".productlist").appendChild(section);
  })
}

function createNavigation(categories) {
  categories.forEach(cat => {
    const a = document.createElement("a");
    a.textContent = cat;
    a.setAttribute("href", `#${cat}`)
    document.querySelector("nav").appendChild(a);
  })

}

function fetchProducts() {
  // fetch data
  fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
      console.log(response)
      return response.json();
    })
    .then(function (data) {
      dataReceived(data);
    })
}

function dataReceived(products) {
  //loop through products
  products.forEach(showProduct)
}

//executed once for each product
function showProduct(myProduct) {
  //console.log(myProduct)
  console.log(myProduct)
  //finding the template
  const temp = document.querySelector("#productTemplate").content;
  //clone the template
  const myCopy = temp.cloneNode(true);
  //show images
  const img = myCopy.querySelector("img");
  img.setAttribute("src", `https://kea-alt-del.dk/t5/site/imgs/medium/${myProduct.image}-md.jpg`);
  //show discounted prices
  if (!myProduct.discount) {
    myCopy.querySelector(".data-discount").classList.add("hidden")
    //@@ -90,13 +92,28 @@ function showProduct(myProduct){
  } else {
    myCopy.querySelector(".data-discount").textContent = "-" + myProduct.discount + "%";
  }

  let article = myCopy.querySelector('article');
  //show vegetarian dishes
  if (myProduct.vegetarian) {
    article.classList.add("vegetarian", "show");
    myCopy.querySelector("img.vegetarian").classList.remove("hidden");
  }
  //show non-alcoholic products
  console.log("hello" + myProduct.alcohol);
  if (myProduct.alcohol) {
    article.classList.add("contains-alco");
    myCopy.querySelector("img.alcohol").classList.remove("hidden");
  } else {


  }

  //show laktose  products
  if (myProduct.allergens == true) {
    myCopy.querySelector(".laktose").classList.remove("hidden");
  }
  //show sold out products
  if (myProduct.soldout == true) {
    myCopy.querySelector(".soldout").textContent = "Sold out";
  } else {
    myCopy.querySelector(".soldout").classList.add("hidden");
  }

  //fill out the template
  myCopy.querySelector(".data_name").textContent = myProduct.name;
  myCopy.querySelector(".data_price").textContent = myProduct.price + ";-";
  myCopy.querySelector("span").textContent = myProduct.shortdescription;

  myCopy.querySelector("button").addEventListener("click", () => {
    fetch(`https://kea-alt-del.dk/t5/api/product?id=` + myProduct.id)
      .then(res => res.json())
      .then(showDetails);
  });
  //append
  const parentElem = document.querySelector("section#" + myProduct.category);
  parentElem.appendChild(myCopy);
}

const modal = document.querySelector(".modal-background");
//once we have our data, ....
function showDetails(data) {
  console.log(data)
  modal.querySelector(".modal-name").textContent = data.name;
  modal.querySelector(".modal-price").textContent = data.price;
  modal.querySelector(".modal-description").textContent = data.longdescription;
  //  //...
  modal.classList.remove("hide");

}

const filters = document.querySelectorAll('.filters');

filters.forEach(filter => {
  filter.addEventListener('click', filterIt);
})

function filterIt(e) {
  console.log(e.target);
  e.target.classList.toggle("active");
  const products = document.querySelectorAll('.product');
  products.forEach(product => {
    product.classList.remove("hidden");
    //console.log(filters[0].classList);
    if (filters[0].classList.contains('active') && !product.classList.contains('vegetarian')) {
      product.classList.add('hidden');
      //console.log("hey");
    }

    if (filters[1].classList.contains('active') && product.classList.contains('contains-alco')) {
      product.classList.add('hidden');
    }
  });


}
//
//const veggiefilter = document.querySelector("#veggiefilter");
////veggiefilter.addEventListener("click", veggieFilterClicked);
//
//function veggieFilterClicked() {
//  veggiefilter.classList.toggle("active")
//  //b select all non veggie
//  const articles = document.querySelectorAll("article:not(.vegetarian)");
//  //console.log(articles)
//  articles.forEach(elem => {
//    elem.classList.toggle("hidden")
//  })
//}
//const alcoholfilter = document.querySelector("#nonAlcholic");
////alcoholfilter.addEventListener("click", alcoholFilterClicked);
//
//function alcoholFilterClicked() {
//  alcoholfilter.classList.toggle("active")
//  //b select all non veggie
//  const articles = document.querySelectorAll("article.alcohol");
//  //console.log(articles)
//  articles.forEach(elem => {
//    elem.classList.toggle("hidden");
//  })
//}
//const modal = document.querySelector(".modal-background");
//close the modal when clicked

modal.addEventListener("click", () => {
  modal.classList.add("hide");
});
/*
const name1 = "Jonas";

function hi() {
  const name2 = "Lasse";
  console.log(name1, name2)
}

console.log(name1, name2)
*/
