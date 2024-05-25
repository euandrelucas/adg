import Page from "../../../engine/page.js";
import header from "./components/header.js";
import navbar from "./components/navbar.js";
import footer from "./components/footer.js";

export default new Page({
    components: [header, navbar, footer],
    page: {
        title: 'Home',
        content: `
        <section id="portfolio">
            <h2>Portfólio</h2>
            <p>Bem-vindo ao meu portfólio. Aqui você pode encontrar informações sobre meus projetos e habilidades.</p>
        </section>
        `
    },
    styles: `
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #36393f;
        color: #ffffff;
    }
    header {
        background-color: #7289da;
        padding: 20px;
        text-align: center;
    }
    header h1 {
        margin: 0;
        font-size: 36px;
    }
    nav {
        background-color: #2c2f33;
        padding: 10px;
        text-align: center;
    }
    nav a {
        color: #ffffff;
        text-decoration: none;
        margin: 0 10px;
    }
    nav a:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    section {
        padding: 20px;
        text-align: center;
    }
    .discord {
        display: inline-block;
        background-color: #7289da;
        color: #ffffff;
        padding: 10px 20px;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
        margin-top: 20px;
    }
    .discord:hover {
        background-color: #677bc4;
    }
    footer {
        background-color: #2c2f33;
        padding: 10px;
        text-align: center;
        position: fixed;
        bottom: 0;
        width: 100%;
    }
    .card {
        background-color: #2c2f33;
        color: #ffffff;
        border-radius: 10px;
        padding: 20px;
        margin: 10px;
        width: calc(33.33% - 20px);
        display: inline-block;
        vertical-align: top;
    }
    .card img {
        max-width: 100px;
        max-height: 100px;
        border-radius: 50%;
        margin-right: 10px;
        vertical-align: middle;
    }
    .card h3 {
        margin-top: 0;
    }
    h1 {
        font-size: 6vw;
    }    
    `,
    scripts: `
    function showSection(sectionId) {
        document.querySelectorAll('section').forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(sectionId).style.display = 'block';
    }
    `
})