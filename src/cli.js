#!/usr/bin/env node
import { extraiLinks, pegarArquivo } from './index.js'
import fs from 'fs';
import chalk from 'chalk';
import urlsValidadas from './http-validacao.js';

const log = console.log;
const caminho = process.argv;


async function processaTexto(args) {
    const caminho = args[2];
    // const valida = args[3] === '--valida';

    try {
        fs.lstatSync(caminho);
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            log(chalk.red('Arquivo ou diretório não existe...'));
            return;
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const texto = await pegarArquivo(caminho);
        const urls = extraiLinks(texto);
        await imprimeLinks(caminho, urls);
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        log(chalk.black.bgYellow('Links:'));
        arquivos.forEach(async (arquivo) => {
            const texto = await pegarArquivo(`${caminho}/${arquivo}`);
            const urls = extraiLinks(texto);;
            await imprimeLinks(arquivo, urls);
        });
    }

}

async function imprimeLinks(arquivo, lista) {

    const urls = await urlsValidadas(lista);
    log(chalk.black.bgYellow(`\nFile:${arquivo}`));
    urls.forEach((url) => {
        const urlStatus = (url[1]).split('-');
        if (urlStatus[0] >= 200 && urlStatus[0] <= 299) {
            log(
                chalk.bold.yellow('URL:'),
                chalk.yellow(url[0]),
                chalk.black.bgGreen(chalk.bold.black('Status:'), url[1])
            );
        } else {
            log(
                chalk.bold.yellow('URL:'),
                chalk.yellow(url[0]),
                chalk.black.bgRed(chalk.bold.black('Status:'), url[1])
            );
        }

    });
}


await processaTexto(caminho);



