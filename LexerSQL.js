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
            });

            

        // Escribir los errores en el archivo de errores
        fs.writeFile(archivoErrores, errores, (err) => {
            if (err) {
                console.error(err);
            }
        });
    });
});
