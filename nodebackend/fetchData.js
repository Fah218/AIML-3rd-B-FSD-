// function sum(a,b){
//     const sum=a+b;
//     return a+b;

// }


async function fetchData(){
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
}

module.exports = fetchData;