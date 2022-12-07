let deleteBtn = document.getElementById("deleteProductsBtn");
let productID = document.getElementById("deleteByCodeProduct");

async function deleteByProductId(e){
    e.preventDefault();
    if(productID.value.length < 1) return alert("Necesitas el codigo del producto que vayas a borrar");
    let response = await deleteRequest(productID.value);
    if(!response) return "Error";
    alert(response)
}

async function deleteRequest(productID){
    const url = `http://127.0.0.1:3000/getProducts/${productID}`;
    const param = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({productID: productID})
    };
    
    try {
        let rawResponse = await fetch(url, param);
        let response = await rawResponse.json();
        if(rawResponse.status != 200){
            alert(response)
            return false;
        } 
        return response;
    } catch (error) {
        return false;
    }
}

deleteBtn.addEventListener("click", (e) =>{deleteByProductId(e)});
