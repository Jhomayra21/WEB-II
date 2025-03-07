
const numeros = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13);
console.log(numeros);
let sum=0;
let sum1=0;

//Seleccionar pares e impares

for (let i=1; i<=numeros.length;i++){
    if (i%2==0){
        sum++
    }
    else{
        sum1++
    }
}
console.log(" pares:"+ sum);
console.log("total numeros impares:" +sum1);