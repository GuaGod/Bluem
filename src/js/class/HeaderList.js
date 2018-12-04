export class NavList {
    constructor(config) {
       this.html = this.rendor(config);
    }
    rendor(config) {
       var html = '';
       for(let i in config) {
           html += `<li><a href="${config[i]}">${i}</a></li>`
       }
       return html;
    }
}

