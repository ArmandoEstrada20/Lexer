/*Realizar un programa que analice un achivo, el cual contendrá sentencias SQL.
El programa leerá las sentencias y las mostrará separadas y en posición vertical,
respetando la sintaxis de SQL, incluyendo palabras reservadas, operadores, comillas, etc.
*/

const fs = require('fs');
const archivo = 'sql.txt';

//Primero verificaremos que el archivo se encuentre creado
if(!fs.existsSync(archivo)){
    //Si no existe, se creeará el archivo con el nombre indicado.
    fs.writeFileSync(archivo,'','utf8');
    console.log(`El archivo ${filename} ha sido creado.`)
}

fs.readFile('sql.txt', 'utf8', (err, data) => {
    if(err){
        console.error(err);
        return;
    }

    var divString = data.split('\n');
    const cadena = divString[0].split('\n');
    //Ciclo Principal
    for(let p = 0; p < divString.length; p++){
        var query = divString[p].split(" ");
        console.log("-------------------------" + '\n');
        console.log("Renglon " + p + " : ");
        for(let r = 0; r < query.length; r++){
            console.log(query[r] + '\n');
        }
    }
});