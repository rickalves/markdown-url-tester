# url-status-tester
Application to test broke urls on mardown files.

## Install
#
```
npm install markdown-url-tester
```

## Usage
#

```
npm run cli <path>
```
The markdown URL tester will show all urls in the markdown files found on the passed path.

## Output
#


`Links:`

`File:texto.md`

`URL: https://developer.mozilla.org/pt-BR/docs/Web/API/FileList Status: 200-OK`

`URL: https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input Status: 200-OK`

`URL: https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer Status: 200-OK`

`URL: https://httpstat.us/404 Status: 404-Not Found`

`URL: http://gatinhosalsicha.com.br/ Status: url-error`

