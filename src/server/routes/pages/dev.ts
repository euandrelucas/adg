import Page from "../../../engine/page.js";
import header from "./components/header.js";
import navbar from "./components/navbar.js";
import footer from "./components/footer.js";
import staffList from "../../../staff.js";
import axios from "axios";

interface cachedData {
    guild: any;
    time: number;
}

const cachedData = [] as cachedData[];

async function fetchServerData() {
    const cachedServerData = cachedData.find(data => Date.now() - data.time < 600000);
    if (cachedServerData) {
        let partnerOrVerified = ''
        return cachedData.map(data => {
        if (data.guild.features.includes('VERIFIED')) {
            partnerOrVerified = `<img class="img" src="/assets/discverified.webp" width="30" height="30" alt="Ícone do Servidor">`;
        } else if (data.guild.features.includes('PARTNERED')) {
            partnerOrVerified = `<img class="img" src="/assets/discpartner.webp" width="30" height="30" alt="Ícone do Servidor">`;
        } else {
            partnerOrVerified = '';
        } 
        return `
        <div class="card">
            <img src="https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.webp" alt="Ícone do Servidor">
            <div class="server-info">
            ${partnerOrVerified}<h3>${data.guild.name}</h3>
            </div>
            <p>${data.guild.description || ''}</p>
            <a href="https://discord.com/invite/${data.guild.invite}" target="_blank"><button class="buttonServer">Acessar Servidor</button></a>
            </div>
        `
    }).join('');
    } else {
        let partnerOrVerified = ''
        const serverCards = await Promise.all(staffList.devs.map(async staff => {
            try {
                const response = await axios.get(`https://discord.com/api/v9/invites/${staff.invite}`);
                const guild = response.data.guild;
                cachedData.push({
                    guild,
                    time: Date.now()
                });
                if (guild.features.includes('VERIFIED')) {
                    partnerOrVerified = `<img class="img" src="/assets/discverified.webp" width="30" height="30" alt="Ícone do Servidor">`;
                } else if (guild.features.includes('PARTNERED')) {
                    partnerOrVerified = `<img class="img" src="/assets/discpartner.webp" width="30" height="30" alt="Ícone do Servidor">`;
                } else {
                    partnerOrVerified = '';
                }             
                return `
                <div class="card">
                    <img src="https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp" alt="Ícone do Servidor">
                    <div class="server-info">
                    ${partnerOrVerified}<h3>${guild.name}</h3>
                    </div>
                    <p>Cargo: ${staff.cargo}</p>
                    <p>${guild.description || ''}<br>${staff.autando}</p>
                    <a href="https://discord.com/invite/${staff.invite}" target="_blank"><button class="buttonServer">Acessar Servidor</button></a>
                </div>
                `;
            } catch (error) {
                console.error(`Erro ao buscar dados do servidor com convite ${staff.invite}:`, error);
                return `
                <div class="card">
                    <p>Erro ao carregar os dados do servidor.</p>
                </div>
                `;
            }
        }));
        return serverCards.join('');
    }
}

async function initPage() {
    const dynamicContent = await fetchServerData();
    const page = new Page({
        components: [header, navbar, footer],
        page: {
            title: 'Desenvolvedor',
            content: `
            <section class="section" id="content">
                <h2>Desenvolvimento de Bots</h2>
                <p>Sou especializado no desenvolvimento personalizado de bots para o Discord. Posso criar bots para automatizar tarefas, moderar servidores e oferecer uma experiência única aos usuários.</p>
                ${dynamicContent}
            </section>
            `
        }
    });
    return page
}

export default initPage();
