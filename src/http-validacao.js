function extrairUrls(listaUrls){
   return listaUrls.map((url) => Object.values(url).join());
}


async function testaUrls(listaUrls){
        const arrStatus = await Promise.all(
            listaUrls.map(async (url) => {
                try{
                    const response = await fetch(url);
                    return `${response.status}-${response.statusText}`;
                }catch(erro){
                    return 'url-error';
                }
                
            })
        )
        return arrStatus;
}

export default async function urlsValidadas(listaUrls){
    const urls = extrairUrls(listaUrls);
    const status = await testaUrls(urls);
    return urls.map((url, index) => [url, status[index]]);
}

