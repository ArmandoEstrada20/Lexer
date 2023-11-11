/*Realizar un programa que analice un achivo, el cual contendrá sentencias SQL.
El programa leerá las sentencias y las mostrará en pantalla, al mismo tiempo que leerá el archivo sqlkeywords
y segun las sentencias que esten contenidas en el archivo sql se le asignará un token a cada palabra de dicho archivo.
*/
const fs = require('fs');

const archivoSQL = 'sql.txt';
const archivoKeywords = 'sqlkeywords.txt';
const archivoErrores = 'logErrores.txt';

// Crear un mapa para almacenar las palabras clave y sus números asociados
const keywordsMap = new Map();
let errores = '';

// Leer el archivo de palabras clave y cargarlo en el mapa
fs.readFile(archivoKeywords, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.split('\n');
    lines.forEach((line) => {
        const [num, keyword] = line.split(' ');
        keywordsMap.set(keyword, num);
    });

    // Leer el archivo SQL y tokenizar las sentencias
    fs.readFile(archivoSQL, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const sentencias = data.split('\n');
        
        // Tokenizar y asignar números
        sentencias.forEach((sentencia, index) => {
            const tokens = sentencia.split(/\s+/); // Dividir por espacios en blanco
            const numerosTokens = tokens.map((token) => {
                let numero;
                if(!isNaN(token)){
                    numero = 995;
                } else {
                    numero = keywordsMap.get(token.toUpperCase());
                    if(numero === undefined){
                        numero = 999;
                    }
                }
                return numero;
                
            });

            console.log(`Sentencia ${index + 1}:`);
            console.log(sentencia);
            console.log('Token:');
            console.log(numerosTokens.join('|'));
            console.log('-------------------------');

             // Verificar la sintaxis de las sentencias
             if (numerosTokens[0] !== 655 || !(numerosTokens[1] === 7 || numerosTokens[1] === 999) || numerosTokens[2] !== 309 || 
             numerosTokens[numerosTokens.length - 1] !== 999) {
                errores += `Error en la sentencia ${index + 1}: ${sentencia}. Verifica tu setencia...\n`;
            }
        });

        // Escribir los errores en el archivo de errores
        fs.writeFile(archivoErrores, errores, (err) => {
            if (err) {
                console.error(err);
            }
            //validarSelect(numerosTokens);
        });
    });
});

