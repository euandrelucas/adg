import Component from "../../../../engine/component.js";

export default new Component({
    type: 'navbar',
    content: `
    <nav class="nav">
        <a href="/" hx-get="/" hx-trigger="click" hx-target="#content" hx-select="#content" hx-swap="innerHTML" hx-push-url="true">Portfólio</a>
        <a href="/mod" hx-get="/mod" hx-trigger="click" hx-target="#content" hx-select="#content" hx-swap="innerHTML" hx-push-url="true">Moderação de Servidores</a>
        <a href="/dev" hx-get="/dev" hx-trigger="click" hx-target="#content" hx-select="#content" hx-swap="innerHTML" hx-push-url="true">Desenvolvimento de Bots</a>
        <a href="/blog" hx-get="/blog" hx-trigger="click" hx-target="#content" hx-select="#content" hx-swap="innerHTML" hx-push-url="true">Blog</a>
        <a href="/contact" hx-get="/contact" hx-trigger="click" hx-target="#content" hx-select="#content" hx-swap="innerHTML" hx-push-url="true">Contato</a>
    </nav>
    `
})