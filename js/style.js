let container = document.querySelector(".container"),
    text = document.querySelector(".text"),
    productName = document.getElementById("name"),
    productPrice = document.getElementById("price"),
    productCategory = document.getElementById("category"),
    productDesc = document.getElementById("desc"),
    form = document.getElementById("form"),
    add = document.querySelector(".add"),
    table = document.getElementById("row"),
    head = document.getElementById("head"),
    delet = document.querySelector(".delete"),
    deleteOne = document.querySelector(".deleteOne"),
    edit = document.querySelector(".edit"),
    counter = document.getElementById("counter"),
    extra = document.getElementById("extra");

    //initialize array of products
    let list = JSON.parse(localStorage.getItem("product")) || [];

    let newProduct = true, // flag to know this product is new or edited old product
        deleted = false, // boolean to know if the old product which edited is deleted or no
        item = 0; // variable to get index from my array
    let total =0;

    // function to add input values to my array and to localHost storage
    let addValues = () => {

        // creat object to add product information
        let pro = {
            name : productName.value,
            price : productPrice.value,
            category : productCategory.value,
            desc : productDesc.value
        };

        if(newProduct || deleted){

            if(pro.name != "" && pro.price != "" && pro.category != "" && pro.desc != "" ){

                // put product information object to array
                for(let i = 0; i < extra.value; i++){

                    list.push(pro);

                    total += Number(list[i].price)
                } 

                text.innerHTML = ``; // clear warning message

            }else   // make warning message to complete form
                text.innerHTML = `<div class="warning"> you didn't complete form </div>`;

        }else{

            if(pro.name != "" && pro.price != "" && pro.category != "" && pro.desc != "" ){

                // set new data to my array
                list[item].name = productName.value; 
                list[item].price = productPrice.value;
                list[item].category = productCategory.value;
                list[item].desc = productDesc.value;

                text.innerHTML = ``; // clear warning message

            }else
                
                // make warning message to complete form
                text.innerHTML = `<div class="warning"> you didn't complete form </div>`;
        }

        // put array data to local storage
        localStorage.setItem("product", JSON.stringify(list));

        list = JSON.parse(localStorage.getItem("product"));

        newProduct = true; // reset boolean

        deleted = false; // reset boolean

        form.reset(); // reset my form

        calcTotal();

        putOnTable(); // put data into table function
    }

    // function to put array information into table
    let putOnTable = () => {

        let details = ""; // reset my container

        for(let i = 0; i < list.length; i++ )

            // put array information into details variable
            details += `<tr>
                        <th scope="col">${i + 1}</th>
                        <th scope="col">${list[i].name}</th>
                        <th scope="col">${list[i].price}</th>
                        <th scope="col">${list[i].category}</th>
                        <th scope="col">${list[i].desc}</th>
                        <th scope="col"><button onclick = "editElement(${i})" 
                            class="edit btn btn-danger">Edit</button></th>
                        <th scope="col"><button onclick = "deleteOneElement(${i})" 
                            class="deleteOne btn btn-primary">Delete</button></th>
                        </tr>`;

    // creat table head if found any product
    if(list.length != 0){

        head.innerHTML = 
        `
            <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Desc</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
            </tr>
        `;

        // creat products counter
        if( list.length == 1)
            details += `<tr> 
                        <th class="pb-3"  colspan="4"> ${list.length} => item </th> 
                        <th class="pb-3"  colspan="3"> total = ${total} </th> 
                        </tr>`;

        else details += `<tr> 
                        <th class="pb-3"  colspan="4"> ${list.length} => items </th> 
                        <th class="pb-3"  colspan="3"> total = ${total}</th> 
                        </tr>`;

    }else head.innerHTML = ''; // deleted table head if not found any product
    
    table.innerHTML = details;
    }

    // function to deleted all products
    let deleteAll = () => {

        total = 0;

        list.splice(0);

        localStorage.clear();

        putOnTable();

    }

    // function to delete one element from array
    let deleteOneElement = i => {

        deleted = true;

        list.splice(i, 1);

        localStorage.setItem("product", JSON.stringify(list));

        calcTotal();

        putOnTable();
    }

    // function to edit one element from array
    let editElement = (i) => {

        deleted = false;

        newProduct = false;

        productName.value = list[i].name; 
        productPrice.value = list[i].price;
        productCategory.value = list[i].category;
        productDesc.value = list[i].desc;

        item = i;

        calcTotal();
    }

    // calc total price
    let calcTotal = () => {

        total = 0;

        for(let i = 0; i < list.length; i++) total += Number(list[i].price) 

        putOnTable();
    }

    document.addEventListener('DOMContentLoaded', () => {
    
            add.addEventListener('click', addValues);

            delet.addEventListener('click', deleteAll);
        }
    )

    document.addEventListener('DOMContentLoaded',putOnTable);

    document.addEventListener('DOMContentLoaded',calcTotal);
