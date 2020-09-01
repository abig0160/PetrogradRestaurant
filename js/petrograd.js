// fetch data
fetch("https://kea-alt-del.dk/t5/api/productlist")
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

//executed once for each product
function showProduct(myProduct) {
  console.log(myProduct.discount);
  //finding the template
  const temp = document.querySelector("#productTemplate").content;
  //clone the template
  const myCopy = temp.cloneNode(true);
  //show discounted prices
    if (!myProduct.discount){
        myCopy.querySelector(".data-discount").classList.add("hidden");
    }


//show vegetarian dishes
    if(myProduct.vegetarian){
        myCopy.querySelector(".vegetarian").classList.remove("hidden");
    }
//show sold out products
 if (myProduct.soldout == true) {
        myCopy.querySelector(".soldout").textContent = "Sold out";
    } else {
        myCopy.querySelector(".soldout").classList.add("hidden");
    }
  //fill out the template
  myCopy.querySelector(".data_name").textContent = myProduct.name;
      myCopy.querySelector(".data_price").textContent = myProduct.price;
  //append
  const parentElem = document.querySelector("section#starter");
  parentElem.appendChild(myCopy)
}



const veggiefilter=document.querySelector("#veggiefilter");
veggiefilter.addEventListener("click", veggieFilterClicked);

function veggieFilterClicked (){
    //b select all non veggie
    const articles=document.querySelectorAll("article:not(.vegetarian)");
    //console.log(articles);
    articles.forEach(elem=>{
        elem.classList.toggle("hidden")
    })
}

//categories
function  init(){
    fetch("https://kea-alt-del.dk/t5/api/categories").then(r=>r.json()).then(
    function (data){
        categoriesReceived(data)
    }
    )
}
init();

function categoriesReceived(cats) {
    createNavigation(cats);
    createSections(cats);

}
function createSections(categories){
    categories.forEach(category=>{
        const section=document.createElement("section");
        section.setAttribute("id", category);
        const  h2 = document.createElement("h2");
        h2.textContent=category;
        section.appendChild(h2);
        document.querySelector(".productlist").appendChild(section);
    })
}

function createNavigation(categories){
    categories.forEach(cat=>{
        const  a = document.createElement("a");
        a.textContent=cat;
        a.setAttribute("href",'#{cat}')
        document.querySelector("nav").appendChild(a);
    })

}

/*
const name1 = "Jonas";

function hi() {
  const name2 = "Lasse";
  console.log(name1, name2)
}

console.log(name1, name2)
*/
