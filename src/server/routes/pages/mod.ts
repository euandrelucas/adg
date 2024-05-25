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
            partnerOrVerified = `<img src="/assets/discverified.webp" width="30" height="30" alt="Ícone do Servidor">`;
        } else if (data.guild.features.includes('PARTNERED')) {
            partnerOrVerified = `<img src="/assets/discpartner.webp" width="30" height="30" alt="Ícone do Servidor">`;
        } else {
            partnerOrVerified = '';
        } 
        return `
        <div class="card">
            <img src="https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}" alt="Ícone do Servidor">
            <div class="server-info">
            ${partnerOrVerified}<h3>${data.guild.name}</h3>
            </div>
            <p>${data.guild.description || ''}</p>
            <a href="https://discord.com/invite/${data.guild.invite}" target="_blank">Acessar Servidor</a>
        </div>
        `
    }).join('');
    } else {
        let partnerOrVerified = ''
        const serverCards = await Promise.all(staffList.guilds.map(async staff => {
            try {
                const response = await axios.get(`https://discord.com/api/v9/invites/${staff.invite}`);
                const guild = response.data.guild;
                cachedData.push({
                    guild,
                    time: Date.now()
                });
                if (guild.features.includes('VERIFIED')) {
                    partnerOrVerified = `<img src="/assets/discverified.webp" width="30" height="30" alt="Ícone do Servidor">`;
                } else if (guild.features.includes('PARTNERED')) {
                    partnerOrVerified = `<img src="/assets/discpartner.webp" width="30" height="30" alt="Ícone do Servidor">`;
                } else {
                    partnerOrVerified = '';
                }             
                return `
                <div class="card">
                    <img src="https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}" alt="Ícone do Servidor">
                    <div class="server-info">
                    ${partnerOrVerified}<h3>${guild.name}</h3>
                    </div>
                    <p>Cargo: ${staff.cargo}</p>
                    <p>${guild.description || ''}<br>${staff.autando}</p>
                    <a href="https://discord.com/invite/${staff.invite}" target="_blank">Acessar Servidor</a>
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
            title: 'Moderação',
            content: `
            <section id="content">
                <h2>Moderação de Servidores</h2>
                <p>Tenho experiência em moderar comunidades online, especialmente em plataformas como o Discord. Garanto um ambiente seguro e amigável para todos os membros.</p>
                ${dynamicContent}
            </section>
            `
        }
    });
    return page
}

export default initPage();
