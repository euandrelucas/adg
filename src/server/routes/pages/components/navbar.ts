import Component from "../../../../engine/component.js";

export default new Component({
    type: 'navbar',
    content: `
    <nav>
        <a href="/public/components/main.html" hx-get="/public/components/main.html" hx-trigger="click" hx-target="body" hx-select="body" hx-swap="innerHTML">Portfólio</a>
        <a href="/public/components/mod.html" hx-get="/public/components/mod.html" hx-trigger="click" hx-target="body" hx-select="body" hx-swap="innerHTML">Moderação de Servidores</a>
        <a href="/public/components/dev.html" hx-get="/public/components/dev.html" hx-trigger="click" hx-target="body" hx-select="body" hx-swap="innerHTML">Desenvolvimento de Bots</a>
        <a href="/public/components/contact.html" hx-get="/public/components/contact.html" hx-trigger="click" hx-target="body" hx-select="body" hx-swap="innerHTML">Contato</a>
    </nav>
    `
})