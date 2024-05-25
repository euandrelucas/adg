import Page from "../../../engine/page.js";
import header from "./components/header.js";
import navbar from "./components/navbar.js";
import footer from "./components/footer.js";

export default new Page({
    components: [header, navbar, footer],
    page: {
        title: 'Home',
        content: `
        <section id="content">
            <h2>Desenvolvimento de Bots</h2>
            <p>Sou especializado no desenvolvimento personalizado de bots para o Discord. Posso criar bots para automatizar tarefas, moderar servidores e oferecer uma experiência única aos usuários.</p>
        </section>
        `
    }
})