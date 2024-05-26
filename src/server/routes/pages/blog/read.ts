import Page from "../../../../engine/page.js";
import header from "../components/header.js";
import navbar from "../components/navbar.js";
import footer from "../components/footer.js";
import markdownit from 'markdown-it'

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

async function initPage(post: Post) {
    const dynamicContent = post
    const md = new markdownit();
    const html = md.render(dynamicContent.postContent)
    const page = new Page({
        components: [header, navbar, footer],
        page: {
            title: 'Moderação',
            content: `
            <section id="content">
                <h2>${dynamicContent.frontmatter.title}</h2>
                <p>${dynamicContent.frontmatter.description}</p>
                <div class="blog-post">
                ${html}
                </div>
            </section>
            `
        }
    });
    return page
}

export default initPage