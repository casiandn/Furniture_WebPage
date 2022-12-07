const getProductByName = document.getElementById("getProductByName");
const getProductBtn = document.getElementById("getProductBtn");
const resultTableCont = document.getElementById("getResultTable");
const searchByNameField = document.getElementById("getProductByName");
async function fetchProducts(url){
    try {
        let rawResponse = await fetch(url);
        let response = await rawResponse.json();
        if(rawResponse.status != 200){
            alert(response)
            return false;
        } 
        return response;
    } catch (error) {
        console.log(error)
        return false;
    }
}

function deleteChildNodesFromTable(){
    const resultTableCont = document.getElementById("getResultTable");
    while (resultTableCont.firstChild) {
        resultTableCont.removeChild(resultTableCont.firstChild);
    }

}

function createTableFromDataProducts(dbdData){
    // crear una tabla desde response from fetch
    deleteChildNodesFromTable();
    for (const data of dbdData) {
        let fecha = data.fechaPuestaVenta;
        let newFecha = ""; // yy-mm-dd
        for(let i = 0; i<10; i++) newFecha += fecha[i];
        let html = 
        `<tr class="row">
            <td>${data.nombre}</td>
            <td>${data.categoria}</td>
            <td>${data.cantidadEnStock}</td>
            <td>${data.precioBase}</td>
            <td>${data.precioVenta}</td>
            <td>${newFecha}</td>
            <td>${data.codigoProducto}</td>
            <td>${data.descripcion}</td>
            <td>${data.dimensiones}</td>
            <td>${data.peso}</td>
            <td>${data.imagen}</td>
        </tr>`
        resultTableCont.insertAdjacentHTML('beforeend', html);
    }
    return true;
}

async function getProducts(){
    let url = 'http://127.0.0.1:3000/getProducts';
    let name = searchByNameField.value;
    if(name.length >= 1) url = `http://127.0.0.1:3000/getProducts/${name}`;
    
    let products = await fetchProducts(url);

    if(!products) return "error";

    createTableFromDataProducts(products);
}

getProductBtn.addEventListener("click", getProducts);