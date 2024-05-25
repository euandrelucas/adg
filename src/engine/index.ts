import Page from './page.js';
import fs from 'node:fs';

export default class AdgWebpages {
    private pages: Page[] = [];
    private dir: string = '';
    constructor({ pages, dir }: { pages: Page[], dir: string }) {
        this.pages = pages;
        this.dir = dir;
    }

    buildStaticPages() {
        this.pages.forEach(page => {
            const content = page.render();
            console.log(`Building page ${page.page.title}`);
            console.log(`Saving page ${page.page.title} in ${this.dir}`);
            console.log(content);
        })
    }

    buildStaticPage(page: Page) {
        const content = page.render();
        console.log(`Building page ${page.page.title}`);
        console.log(`Saving page ${page.page.title} in ${this.dir}`);
        console.log(content);
    }

    saveStaticFiles() {
        this.pages.forEach(page => {
            const content = page.render();
            if (!fs.existsSync(this.dir)) {
                fs.mkdirSync(this.dir);
            }
            console.log(`Building page ${page.page.title}`);
            fs.writeFileSync(`${this.dir}/${page.page.title}.html`, content);
        })
    }
}