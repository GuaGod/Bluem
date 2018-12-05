export class User {
    constructor() {
        this.name = '';
        this.stateCode = '0';
        this.stuId = '';
        this.update();
    }

    update() {
        this.name = sessionStorage.getItem('name') || '';
        this.stateCode = sessionStorage.getItem('stateCode') || '0';
        this.stuId = sessionStorage.getItem('stuId') || '';
    }

}