const settingsContainer = document.getElementById('settings-container');
export class Setting {
    constructor(name, type, defaultValue, callback) {
        this.name = name;
        this.defaultValue = defaultValue;
        this.callback = callback;
        this.type = type;
        this.container = document.createElement('div');
        this.container.classList.add('input-container');
        this.label = document.createElement('label');
        this.label.innerHTML = name;
        this.container.appendChild(this.label);
        this.input = document.createElement('input');
        this.input.type = type;
        this.container.appendChild(this.input);
        settingsContainer.appendChild(this.container);
        switch (this.type) {
            case 'checkbox':
                this.input.addEventListener('click', () => {
                    this.Save();
                    this.CallCallback();
                });
                break;
            default:
                console.error(`Unknown setting type: ${this.type}!`);
                break;
        }
        this.Init();
    }
    CallCallback() {
        switch (this.type) {
            case 'checkbox':
                this.callback(this.input.checked);
                break;
            default:
                console.error(`Unknown setting type: ${this.type}!`);
                break;
        }
    }
    Save() {
        switch (this.type) {
            case 'checkbox':
                localStorage.setItem(this.name, this.input.checked.toString());
                break;
            default:
                console.error(`Unknown setting type: ${this.type}!`);
                break;
        }
    }
    Restart() {
        switch (this.type) {
            case 'checkbox':
                this.input.checked = this.defaultValue;
                break;
            default:
                console.error(`Unknown setting type: ${this.type}!`);
                break;
        }
        this.CallCallback();
    }
    Init() {
        switch (this.type) {
            case 'checkbox':
                this.input.checked = localStorage.getItem(this.name) != null ? localStorage.getItem(this.name) == 'true' : this.defaultValue;
                break;
            default:
                console.error(`Unknown setting type: ${this.type}!`);
                break;
        }
        this.CallCallback();
    }
}
