// change article by clicking on anchors
const anchors = document.querySelectorAll('ul li a');
const articles = document.querySelectorAll('article');
for (const anchor of anchors) {
    anchor.addEventListener("click", (e) =>{
        e.preventDefault();
        const href = anchor.getAttribute('href'); // anchors must be the same as article id
        for (const article of articles) {
            article.id == href ? article.style.display = 'flex' : article.style.display = 'none'
        }
    });
}




// validate and create post request
let createPostCnt = document.getElementById("crt-post-cont").children;
const btnCreate = document.getElementById("createFurniture");

// create objectForPost
function createPostObject(){
    let bodyForm = new FormData();
    bodyForm.append('furnitureName', createPostCnt[0].value)
    bodyForm.append('quantity', createPostCnt[1].value)
    bodyForm.append('dimensions', createPostCnt[2].value)
    bodyForm.append('description', createPostCnt[3].value)
    bodyForm.append('basePrice', createPostCnt[4].value)
    bodyForm.append('salePrice', createPostCnt[5].value)
    bodyForm.append('category', createPostCnt[6].value)
    bodyForm.append('furnitureImage', createPostCnt[7].files[0])
    bodyForm.append('weight', createPostCnt[8].value)
    return bodyForm;
}


// post request
async function postCreateFurniture(body){
    let response;

    const url = 'http://127.0.0.1:3000/createFurniture';
    const param = {
        method: 'POST',
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

async function createFurniture(e){
    e.preventDefault()
    if(checkIfInputEmpty(createPostCnt)){
        alert("Hay valores faltantes.");
        return false;
    }
    const response = await postCreateFurniture(createPostObject());
    alert(response);
}

btnCreate.addEventListener("click", (e) =>{createFurniture(e)});














// check input if empty

function checkIfInputEmpty(inputs){
    let wrongField = false;
    for (const input of inputs) {
        if(input.value == null || input.value.length == 0) {
            input.style.border = "5px solid red"
            wrongField = true;
        }else{
            input.style.border = "0"
        }
    }
    if(wrongField) return true;
}