let frase='No quiero cheques a mí dame dinero contante y sonante';

//Encotrar la palabra mas larga

let palabras = frase.split(' '); 
let l = "";  
 
for (let i = 0; i < palabras.length; i++) {  
    if (palabras[i].length > l.length) {  
        l = palabras[i];  
    }  
}  
 
console.log(l); 

