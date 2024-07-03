const HTML = `<script src="https://api.toolbird.io/js/script.js" data-domain="[DOMAIN]"></script>`
const NEXT_JS = `<Script src="https://api.toolbird.io/js/script.js" strategy="lazyOnload" data-domain="[DOMAIN]"/>`

const TOOLBIRD_WEB = `import toolbird from '@toolbird/web'

toolbird.init({
  domain: '[DOMAIN]'
})
`
export { HTML, NEXT_JS, TOOLBIRD_WEB }
