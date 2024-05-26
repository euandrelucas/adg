import Page from "../../../engine/page.js";
import header from "./components/header.js";
import navbar from "./components/navbar.js";
import footer from "./components/footer.js";

export default new Page({
    components: [header, navbar, footer],
    page: {
        title: 'Contato',
        content: `
        <section class="section" id="content">
            <h2>Contato</h2>
            <p>Para entrar em contato comigo, você pode me encontrar no Discord ou enviar um e-mail.</p>
            <a class="discord" href="https://discord.com/users/717766639260532826">Meu Discord</a>
            <p>Email: discord@andrepaiva.dev</p>
        </section>
        `
    }
})