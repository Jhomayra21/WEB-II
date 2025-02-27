const ciudadesDisponibles =new Array("Santiago","Bogota","Lima","MonteVideo");

const paisesDisponibles = ["Colombia","Chile","Peru","Panama"];

const cantidadCiudades= ciudadesDisponibles.length;

console.log(`En la lista existen ${cantidadCiudades} elementos `);
console.log(`En la lista existen ${paisesDisponibles.length} elementos `);

//quitar el primer elemento de un array
ciudadesDisponibles.shift();
console.log(`En la lista existen ${ciudadesDisponibles.length} elementos `);
console.log(ciudadesDisponibles);

//quitar el primer elemento de un array
ciudadesDisponibles.pop();
console.log(`En la lista existen ${ciudadesDisponibles.length} elementos `);
console.log(ciudadesDisponibles);

//ordenar lista
console.log(ciudadesDisponibles.sort()); 

//posicion de un elemento 
console.log(`En la lista existen ${paisesDisponibles.indexOf("Peru")}`);

//concatenar 2 listas
const listasPaisesCiudades=paisesDisponibles.concat(ciudadesDisponibles);
console.log(listasPaisesCiudades);
