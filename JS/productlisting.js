const divItems = document.querySelector(".list-products");
const canShowEditProduct = divItems?.hasAttribute("data-editable") || false;

console.log(`Esta página me invocou, tem o divItems? ${divItems !== null}\nPosso mostrar items pra editar? ${canShowEditProduct}`);

async function listarProdutos() {
    try {
        const resposta = await fetch("./mockdata/products.json");
        if (resposta.ok) {
            const dados = await resposta.json();
            return dados.products;
        } else {
            return null;
        }
    } catch (erro) {
        console.error("Erro ao buscar produtos:", erro);
        return null;
    }
}

async function usarProdutos() {
    const products = await listarProdutos(); 
    if (products) {
        products.forEach(product => {
            divItems.appendChild(renderItem(product));
        });
    } else {
        console.log("Nenhum produto encontrado.");
    }
}

usarProdutos();

function renderItem(productItem){
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