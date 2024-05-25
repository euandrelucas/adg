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
        return `
        <!DOCTYPE html>
        <head>
        <script src="https://unpkg.com/htmx.org@1.9.12/dist/htmx.min.js"></script>
        ${this.page.title ? `<title>${this.page.title}</title>` : ''}
        </head>
        ${this.page.styles ? `<style>${this.page.styles}</style>` : ''}
        ${header?.content || ''}
        ${navbar?.content || ''}
        ${this.page.content ? `<body>${this.page.content}</body>` : ''}
        ${this.page.scripts ? `<script>${this.page.scripts}</script>` : ''}
        ${footer?.content ? `<footer>${footer.content}</footer>` : ''}
        </html>
        `
    }
}