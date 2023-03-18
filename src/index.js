import fs from 'fs';
import chalk from 'chalk';
const log = console.log;

const error = chalk.bold.red;
const warning = chalk.yellow;
const success = chalk.green;

function trataErro(err){
    throw new Error(error(`Problema ao carregar arquivo...${err}`));
}

export function extraiLinks(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const result = [...texto.matchAll(regex)];
    const urls = result.map((url) => ({[url[1]]:url[2]}));
    return urls.length !== 0? urls : success('Não há links!');
}

// Promise com o then()
// function pegarArquivo(caminho){
//     fs.promises
//       .readFile(caminho, 'utf-8')
//       .then((texto) => log(success(texto)))
//       .catch(trataErro);
// }


// Async / Await
export async function pegarArquivo(caminho){
    try{
        const texto = await fs.promises.readFile(caminho, 'utf-8');
        return texto;
    }catch(erro){
        trataErro(erro);
    }
}




