

let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13];  
let primos = [];  
 
for (let i = 0; i < numeros.length; i++) {  
    let num = numeros[i];  
    let sum = 0;  
 
    for (let j = 1; j <= num; j++) {  
        if (num % j === 0) {  
            sum++;  
        }  
    }  
 
    if (sum === 2) {  
        primos.push(num);  
    }  
}  
 
console.log(primos); 
 