import Component from "../../../../engine/component.js";

const ano = new Date().getFullYear()

export default new Component({
    type: 'footer',
    content: `<p>&copy; ${ano} ADG. Todos os direitos reservados.</p>`
})