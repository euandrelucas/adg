import Page from "../../../../engine/page.js";
import header from "../components/header.js";
import navbar from "../components/navbar.js";
import footer from "../components/footer.js";
import axios from 'axios';

interface Post {
    frontmatter: {
        title: string;
        date: string;
        description: string;
        tag: string;
        author: string;
        fixed: boolean;
        fileName: string;
    },
    postContent: string;
}

async function fetchServerData() {
    const response = await axios.get(`http://localhost:${process.env.PORT}/api/get/posts`)
    const posts = response.data;
    let fixedPost = ''
    const cards = posts.map((post: Post) => {
        if (post.frontmatter.fixed) {
            fixedPost = `<img class="iconbg" src="/assets/pushpin.webp" width="10" height="10" alt="Post fixado">`
        } else {
            fixedPost = ''
        }
        return `
        <div class="card">
        <div class="server-info">
        ${fixedPost}<h3>${post.frontmatter.title}</h3>
        </div>
        <p>${post.frontmatter.description || ''}</p>
        <a href="/blog/read/${post.frontmatter.fileName.replace('.mdx', '')}" hx-get="/blog/read/${post.frontmatter.fileName.replace('.mdx', '')}" hx-trigger="click" hx-target="#content" hx-select="#content" hx-swap="innerHTML" hx-push-url="true">        <button class="buttonServer">Ler postagem</button></a>
        </div>
        `
    })
    return cards.join('');
}

async function initPage() {
    const dynamicContent = await fetchServerData();
    const page = new Page({
        components: [header, navbar, footer],
        page: {
            title: 'Blog',
            content: `
            <section class="section" id="content">
                <h2>Portfólio</h2>
                <p>Bem-vindo ao meu portfólio. Aqui você pode encontrar informações sobre meus projetos e habilidades.</p>
                ${dynamicContent}
            </section>
            `
        }
    });
    return page
}

export default initPage();	