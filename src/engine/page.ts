interface Components {
    type: 'navbar' | 'footer' | 'header' | 'page'
    content: string
}

interface PageData {
    title?: string
    content: string
    styles?: string
    scripts?: string
}

export default class Page {
    private components: Components[] = [];
    page: PageData = {
        content: ''
    }

    constructor({ components, page, styles, scripts }: { components: Components[], page: PageData, styles?: string, scripts?: string}) {
        this.components = components;
        this.page = page;
        if (styles) {
            this.page.styles = styles;
        } else if (scripts) {
            this.page.scripts = scripts;
        }
    }

    buildStaticPage() {
        return this.render().replace(/\s{2,}/g, ' ').replace(/>\s+</g, '><');
    }

    render() {
        const header = this.components.find(component => component.type === 'header');
        const navbar = this.components.find(component => component.type === 'navbar');
        const footer = this.components.find(component => component.type === 'footer');
        return `<!DOCTYPE html>
        <html lang="pt-BR">
        <head>
        <link rel="stylesheet" href="/styles/main.css">
        <script src="https://unpkg.com/htmx.org@1.9.12/dist/htmx.min.js"></script>
        ${this.page.title ? `<title>${this.page.title}</title>` : ''}
        <meta content="ADG" property="og:site_name">
        <meta content="Olá, e me chamo ADG, Gerente de Comunidades, Desenvolvedor, e um carinha gente boa :) " property="og:description">
        <meta content="ADG" property="og:title">
        <meta content="https://andrepaiva.dev/assets/ADG.jpg" property="og:image">
        <meta charset="UTF-8">
        <div class="gtranslate_wrapper"></div>
        <script>window.gtranslateSettings = {"default_language":"pt","detect_browser_language":true,"languages":["pt","en","es"],"wrapper_selector":".gtranslate_wrapper","alt_flags":{"en":"usa","pt":"brazil","es":"mexico"}}</script>
        <script src="https://cdn.gtranslate.net/widgets/latest/float.js" defer></script>
        ${this.page.styles ? `<style>${this.page.styles}</style>` : ''}
        </head>
        <body>
        ${header?.content || ''}
        ${navbar?.content || ''}
        ${this.page.content ? `${this.page.content}` : ''}
        ${this.page.scripts ? `<script>${this.page.scripts}</script>` : ''}
        ${footer?.content ? `<footer>${footer.content}</footer>` : ''}
        </body>
        </html>
        `
    }
}