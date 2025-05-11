import database from './mock_database.js';

const divItems = document.querySelector(".list-products");
const canShowEditProduct = divItems?.hasAttribute("data-editable") || false;
const db = new database();

console.log(`Esta página me invocou, tem o divItems? ${divItems !== null}\nPosso mostrar items pra editar? ${canShowEditProduct}`);

async function listarProdutos() {
    return db.getAll();
}

async function usarProdutos() {
    const products = await listarProdutos(); 
    
    divItems.innerHTML = ` `;
    
    if (products.length == 0){
        console.log("Não há produtos");
        divItems.appendChild(renderItem({
            id: -1, //This is a special id to indicate that there is no product, because the database can't store negative numbers
            name: "Não há produtos",
            description: "Por favor, crie um produto",
            price: 0.00,
            qtd: 0,
        }));
        return;
    }
    if (products) {
        products.forEach(product => {
            divItems.appendChild(renderItem(product));
        });
    } else {
        console.log("Nenhum produto encontrado.");
    }
}

usarProdutos();
setInterval(() => {
    usarProdutos();
}, 1000);



function renderItem(productItem){
    if (canShowEditProduct && productItem.id == -1) return;
    const divInner = document.createElement("div");
    const productTitle = document.createElement("h1");
    const productDescription = document.createElement("p");
    const productItemDetails = document.createElement("span");
    const productEdit = canShowEditProduct ? document.createElement("button") : null;
    divInner.classList.add("product-item");

    productTitle.innerText = productItem.name;
    productDescription.innerText = productItem.description  ;
    productItemDetails.innerText = `Quantidade: ${productItem.qtd} - Preço Un. ${productItem.price}`;

    if (productEdit !== null){
        productEdit.innerText = "Editar este produto";
        productEdit.addEventListener("click", () => {
            document.location = `/editproduct.html?product=${productItem.id}`
        });
    }

    divInner.appendChild(productTitle);
    divInner.appendChild(productDescription);
    divInner.appendChild(productItemDetails);
    if (productEdit !== null) divInner.appendChild(productEdit);

    return divInner;
}