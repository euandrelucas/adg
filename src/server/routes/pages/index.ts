import Page from "../../../engine/page.js";
import header from "./components/header.js";
import navbar from "./components/navbar.js";
import footer from "./components/footer.js";

export default new Page({
    components: [header, navbar, footer],
    page: {
        title: 'ADG',
        content: `
        <section class="section" id="content">
            <h2>Portfólio</h2>
            <p>Bem-vindo ao meu portfólio. Aqui você pode encontrar informações sobre meus projetos e habilidades.</p>
        </section>
        `
    }
})