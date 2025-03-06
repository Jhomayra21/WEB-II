function invertirNumero(numero) {
    
    let invertido = Math.abs(numero).toString().split('').reverse().join('');

    return numero < 0 ? -parseInt(invertido) : parseInt(invertido);
}
 

console.log(invertirNumero(1234)); 
