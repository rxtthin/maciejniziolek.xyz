const settingsContainer = document.getElementById('settings-container');
export class Setting {
    constructor(name, type, defaultValue, callback, data) {
        this.name = name;
        this.defaultValue = defaultValue;
        this.callback = callback;
        this.type = type;
        this.container = document.createElement('div');
        this.container.classList.add('input-container');
        this.label = document.createElement('label');
        this.label.innerHTML = name;
        this.container.appendChild(this.label);
        settingsContainer.appendChild(this.container);
        switch (this.type) {
            case 'checkbox':
                this.input = document.createElement('input');
                this.input.type = type;
                this.input.addEventListener('click', () => {
                    this.Save();
                    this.CallCallback();
                });
                this.container.appendChild(this.input);
                break;
            case 'select':
                this.input = document.createElement('select');
                this.input.addEventListener('change', () => {
                    this.Save();
                    this.CallCallback();
                });
                data === null || data === void 0 ? void 0 : data.forEach((opt) => {
                    const optElement = document.createElement('option');
                    optElement.value = opt;
                    optElement.textContent = opt;
                    this.input.appendChild(optElement);
                });
                this.container.appendChild(this.input);
                break;
            default:
                this.input = document.createElement('div');
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
            case 'select':
                this.callback(this.input.value);
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
            case 'select':
                localStorage.setItem(this.name, this.input.value);
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
            case 'select':
                this.input.value = this.defaultValue;
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
            case 'select':
                this.input.value = localStorage.getItem(this.name) || this.defaultValue;
                break;
            default:
                console.error(`Unknown setting type: ${this.type}!`);
                break;
        }
        this.CallCallback();
    }
}
