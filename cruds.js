let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let messege=document.getElementById('messege');
let mood ='cerate';
let tmp;
// function getmemory
function getnumbers(){
    if(price.value!=''){
        let reslute= (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML=reslute;
        total.style.backgroundColor='#040';
    }
    else{
        total.style.backgroundColor='#383232';
        total.innerHTML='';
    }
}
//function cerate
let datapro;
if(localStorage.produact != null){
    datapro= JSON.parse(localStorage.produact);
}
else{
    datapro=[];
}
submit.onclick=function(){
    let objectpro= {title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
    }
    if(mood =='cerate'){
    if(objectpro.count >= 1)
    {
        for(i=0;i<objectpro.count;i++){
            datapro.push(objectpro);
            messege.style.display='none';
        }
    }else{
        messege.style.display='block';
    }
}else{
    datapro[tmp] = objectpro;
    mood ='cerate';
    submit.innerHTML='Cerate';
    count.style.display='block';
    total.style.backgroundColor='#383232';
}
    localStorage.setItem('produact' , JSON.stringify(datapro) );
    cleardata();
    read();
}
//function clear
function cleardata()
{
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}
//function read
read();
function read(){
    let table ='';
    for(i=0;i<datapro.length;i++){
        table +=`
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].count}</td>
        <td>${datapro[i].category}</td>
        <td><button id='update' onclick="updatebtn(${i})">update</button></td>
        <td><button onclick="deleteone(${i})" id='delete'>delete</button></td>
        </tr>
        `
    }
        document.getElementById('tbody').innerHTML=table;
        let btndelete=document.getElementById('deletea');
        if(datapro.length>0){
            btndelete.innerHTML=`
            <button onclick="deleteall()" id='delete'>DeleteAll(${datapro.length})</button>
            `
        }
        else{
            btndelete.innerHTML='';
        }
}
//function deleteall
function deleteall(){
    localStorage.clear();
    datapro.splice(0);
    read();
}
//function deleteone
function deleteone(i){
    datapro.splice(i,1);
    localStorage.produact=JSON.stringify(datapro);
    read();
}
//function update
function updatebtn(i){
    title.value= datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    getnumbers();
    count.style.display='none';
    category.value=datapro[i].category;
    submit.innerHTML='Update';
    mood='update';
    tmp=i;
    scroll({
        top : 0,
        behavior : 'smooth',
    })
}
//function search
let search_input=document.getElementById('search');
let moods='';
function btnsearch(id){
    if(id =='Stitle'){
        moods='title';
        search_input.placeholder='Search By Title';
    }else{
        moods='category';
        search_input.placeholder='Search By Category';
    }
    search_input.focus();
    search_input.value='';
    read();
}
function searchon(value){
    let table='';
    if(moods=='title'){
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].title.includes(value.toLowerCase())){
                table +=`
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].count}</td>
                <td>${datapro[i].category}</td>
                <td><button id='update' onclick="updatebtn(${i})">update</button></td>
                <td><button onclick="deleteone(${i})" id='delete'>delete</button></td>
                </tr>
                `
            }
        }
    }else{
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].category.includes(value.toLowerCase())){
                table +=`
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].count}</td>
                <td>${datapro[i].category}</td>
                <td><button id='update' onclick="updatebtn(${i})">update</button></td>
                <td><button onclick="deleteone(${i})" id='delete'>delete</button></td>
                </tr>
                `
            }
    }
}
    document.getElementById('tbody').innerHTML=table;
}
