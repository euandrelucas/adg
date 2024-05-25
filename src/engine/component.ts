export default class Component {
    type: 'navbar' | 'footer' | 'header' | 'page' = 'page';
    content: string = '';
    constructor({ type, content }: { type: 'navbar' | 'footer' | 'header' | 'page', content: string }) {
        this.type = type;
        this.content = content;
    }
    render() {
        return this.content;
    }
}