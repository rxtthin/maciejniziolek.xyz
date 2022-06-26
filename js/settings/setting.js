import { settingsContainer } from './settings-manager.js';
export class Setting {
    constructor(name) {
        this.name = name;
        this.container = document.createElement('div');
        this.container.classList.add('input-container');
        this.label = document.createElement('label');
        this.label.innerHTML = name;
        this.container.appendChild(this.label);
        settingsContainer.appendChild(this.container);
    }
}
