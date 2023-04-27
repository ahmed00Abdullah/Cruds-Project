
// button scroll

let but = document.getElementById('but1');

window.onscroll = ()=>{
    if(scrollY >= 200)
    {
        but.style.display= 'block';
    }
    else  
    {
        but.style.display= 'none';
    }
}
but.onclick = ()=>{
    scroll({
        left:0,
        top:0,
        behavior:"smooth"
    })
}

// let but2 = document.getElementById('but2');

// window.onscroll = ()=>{
//     if(scrollY <= 200)
//     {
//         but2.style.display= 'block';
//     }
//     else  
//     {
//         but2.style.display= 'none';
//     }
// }
// but2.onclick = ()=>{
//     scroll({
//         right:0,
//         bottom :0,
//         behavior:"smooth"
//     })
// }


// get total

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;

function getTotal(){
    if(price.value != ''){
        let result =  (+price.value + +taxes.value + +ads.value ) -  +discount.value
        total.style.background = 'green';
        total.innerHTML = result;
    }
    else{
        total.innerHTML = '';
        total.style.background = 'rgb(219, 57, 65) '
    }
}


// create product

let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];

}

submit.onclick = function(){
        let newPro = {
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value.toLowerCase(),
        }  
        
        // count

if(title.value != ''
&& price.value != ''
&& category.value != '' 
&& newPro.count < 100 )
{
    
        if(mood === 'create')
        {
            
        if(newPro.count > 1){
            for(let i = 0; i < newPro.count;i++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
        clearData()
        }else{

            dataPro[ tmp ] = newPro;
            mood = 'create';
            count.style.display = 'block';
            submit.innerHTML = 'create';
            
        }
    }else{
    clearData();
}

  // save localstorage
        localStorage.setItem('product' , JSON.stringify (dataPro))
        
        showData()
}

// clear inputs


function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';

}




// read


function showData(){
    getTotal();
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table +=
        `
                <tr>
                    <td>${i}</td>  
                    <td>${dataPro[i].title}</td>  
                    <td>${dataPro[i].price}</td>  
                    <td>${dataPro[i].taxes}</td>  
                    <td>${dataPro[i].ads}</td>  
                    <td>${dataPro[i].discount}</td>  
                    <td>${dataPro[i].total}</td>  
                    <td>${dataPro[i].category}</td>  
                    <td><button onclick="updateData(${i})" id="update">update</button></td>  
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>  
                </tr>
        `;
    }



    document.getElementById('tbody').innerHTML = table;

    let butDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        butDelete.innerHTML = 
        `
        <button onclick="deleteAll()" >delete All (${dataPro.length})</button>
        `
    }else{
        butDelete.innerHTML = ''; 
    }
}showData()


// delete and delete All



function deleteData(i)
{
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

// upDate
function updateData(i){

    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i ;

    scroll({
        top:0,
        behavior:"smooth",
    }
    )

}

// search

let searchMood = 'title';

function getSearchMood(id)
{
    let search = document.getElementById('search');
    if(id == 'searchTitle')
    {
        searchMood = 'title';
    }
    else
    {
        searchMood = 'category';
    }
    search.placeholder = 'Search By ' +searchMood;
    search.focus()
    search.value = '';
    showData( )
}


function searchDate(value){
    let table = '';
    for(let i = 0; i < dataPro.length; i++ ){

        
    if(searchMood == 'title')
    {
            if(dataPro[i].title.includes(value.toLowerCase()) ){
            

                table +=
        `
                <tr>
                    <td>${i}</td>  
                    <td>${dataPro[i].title}</td>  
                    <td>${dataPro[i].price}</td>  
                    <td>${dataPro[i].taxes}</td>  
                    <td>${dataPro[i].ads}</td>  
                    <td>${dataPro[i].discount}</td>  
                    <td>${dataPro[i].total}</td>  
                    <td>${dataPro[i].category}</td>  
                    <td><button onclick="updateData(${i})" id="update">update</button></td>  
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>  
                </tr>
        `;

            }
            
    }
    
else{
        //     if(dataPro[i].category.includes(value.toLowerCase()) ){
            

        //         table +=
        // `
        //         <tr>
        //             <td>${i}</td>  
        //             <td>${dataPro[i].title}</td>  
        //             <td>${dataPro[i].price}</td>  
        //             <td>${dataPro[i].taxes}</td>  
        //             <td>${dataPro[i].ads}</td>  
        //             <td>${dataPro[i].discount}</td>  
        //             <td>${dataPro[i].total}</td>  
        //             <td>${dataPro[i].category}</td>  
        //             <td><button onclick="updateData(${i})" id="update">update</button></td>  
        //             <td><button onclick="deleteData(${i})" id="delete">delete</button></td>  
        //         </tr>
        // `;

        //     }
            

    }
}
    document.getElementById('tbody').innerHTML = table;

}
