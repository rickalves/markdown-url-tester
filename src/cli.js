import { extraiLinks, pegarArquivo } from './index.js'
import fs from 'fs';
import chalk from 'chalk';

const log = console.log;
const caminho = process.argv;

async function processaTexto(args){
    const caminho = args[2];
    if(fs.lstatSync(caminho).isFile()){
        const texto = await pegarArquivo(caminho);
        const urls = extraiLinks(texto);
        imprimeLinks(urls);
    }else if(fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (arquivo) => {
            const texto = await pegarArquivo(`${caminho}/${arquivo}`);
            const urls = extraiLinks(texto);;
            imprimeLinks(urls);
        });
    }
   
}

function imprimeLinks(lista){
    log(chalk.yellow('Lista de links:'), lista);
}

await processaTexto(caminho);



