const getProductByName = document.getElementById("getProductByName");
const getProductBtn = document.getElementById("getProductBtn");
const resultTableCont = document.getElementById("getResultTable")
let url = 'http://127.0.0.1:3000/getProducts';
async function fetchProducts(url){
    let rawResponse = await fetch(url);
    console.log(rawResponse)
    let response = await rawResponse.json();
    if(rawResponse.status != 200) return false;
    return response;
}

function createTableFromDataProducts(dbdData){
    // crear una tabla desde response from fetch
    console.log(dbdData)

    let html = 
    `
    <tr id="title-row">
        <th>cantidadEnStock</th>
        <th>categoria</th>
        <th>codigoProducto</th>
        <th>descripcion</th>
        <th>dimensiones</th>
        <th>fechaPuestaVenta</th>
        <th>imagen</th>
        <th>nombre</th>
        <th>peso</th>
        <th>precioBase</th>
        <th>precioVenta</th>
    <tr>
    `
    resultTableCont.insertAdjacentHTML('beforeend', html);
    for (const data of dbdData) {
        let html = 
        `
        <tr class="row">
            <td>${data.cantidadEnStock}</td>
            <td>${data.categoria}</td>
            <td>${data.codigoProducto}</td>
            <td>${data.descripcion}</td>
            <td>${data.dimensiones}</td>
            <td>${data.fechaPuestaVenta}</td>
            <td>${data.imagen}</td>
            <td>${data.nombre}</td>
            <td>${data.peso}</td>
            <td>${data.precioBase}</td>
            <td>${data.precioVenta}</td>
        <tr>
        `
        resultTableCont.insertAdjacentHTML('beforeend', html);
    }
    return true;
}

async function getProducts(){
    let products = await fetchProducts(url);
    if(!fetchProducts) return alert("Ha habido un error");

    createTableFromDataProducts(products);
}

getProductBtn.addEventListener("click", getProducts);