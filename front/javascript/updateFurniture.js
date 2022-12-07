const updateBtn = document.getElementById("UpdateFurnitureBtn");
let updatePostCnt = document.getElementById("update-cont").children;

async function updateFurniture(e){
    e.preventDefault()
    if(checkIfInputEmptyPut(updatePostCnt)){
        alert("Hay valores faltantes.");
        return false;
    }
    let response = await putUpdateFurniture(updateFurnitureObject());

    alert(response);
}

function updateFurnitureObject(){
    let bodyForm = new FormData();
    bodyForm.append('furnitureName', updatePostCnt[0].value)
    bodyForm.append('newFurnitureName', updatePostCnt[1].value)
    bodyForm.append('quantity', updatePostCnt[2].value)
    bodyForm.append('dimensions', updatePostCnt[3].value)
    bodyForm.append('description', updatePostCnt[4].value)
    bodyForm.append('basePrice', updatePostCnt[5].value)
    bodyForm.append('salePrice', updatePostCnt[6].value)
    bodyForm.append('category', updatePostCnt[7].value)
    bodyForm.append('weight', updatePostCnt[8].value)
    bodyForm.append('furnitureImage', updatePostCnt[9].files[0]);
    return bodyForm;
}

async function putUpdateFurniture(body){
    let name = body.get("furnitureName");
    const url = `http://127.0.0.1:3000/getProducts/${name}`;
    const param = {
        method: 'PUT',
/*         headers: { 'Content-Type': 'application/json' }, */
        body: body
    };
    
    try {
        let rawResponse = await fetch(url, param);
        let response = await rawResponse.json();
        if(rawResponse.status == 200) return response;
        else return "Response failed";
    } catch (error) {
        return response;
    }
}

updateBtn.addEventListener("click", (e) =>{updateFurniture(e)}, false);





















function checkIfInputEmptyPut(inputs){
    let nTimes = 0;
    for (const input of inputs) {
        if(input.value == null || input.value.length == 0) {
            wrongField = true;
        }else{
            nTimes++;
        }
    }
    if(nTimes < 2) return true;
}