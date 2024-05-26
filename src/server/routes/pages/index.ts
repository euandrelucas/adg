import Page from "../../../engine/page.js";
import header from "./components/header.js";
import navbar from "./components/navbar.js";
import footer from "./components/footer.js";

let idade = new Date().getFullYear() - 2007

export default new Page({
    components: [header, navbar, footer],
    page: {
        title: 'ADG',
        content: `
        <section class="section" id="content">
            <h2>ADG</h2>
            <p class="aboutMeText">Olá, me chamo André, possuo ${idade} anos, e sou programador, e desenvolvedor verificado no Discord, gosto de programar bots, e estou sempre tentando evoluir no ramo da programação, aqui você poderá conhecer mais de meus projetos!</p>
            <p class="aboutMeText">Gosto bastante de conversar sobre tecnologia e sobre a cultura Geek em geral, gosto de fazer as pessoas ao meu redor se sentirem bem, e gosto de gerenciar projetos, e eu também gosto de escrever bastante, um dos motivos para eu ter feito esse website foi pode ter meu próprio blog pessoal</p>
        </section>
        `
    }
})