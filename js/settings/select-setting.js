import { Setting } from './setting.js';
export class SelectSetting extends Setting {
    constructor(name, options, callback) {
        super(name);
        this.callback = callback;
        this.selectElement = document.createElement('select');
        this.selectElement.addEventListener('change', () => {
            this.Save();
            this.CallCallback();
        });
        options.forEach((opt) => {
            const optElement = document.createElement('option');
            optElement.value = opt;
            optElement.textContent = opt;
            this.selectElement.appendChild(optElement);
        });
        this.container.appendChild(this.selectElement);
        this.InitValue();
        this.CallCallback();
    }
    InitValue() {
        let value = 0;
        const savedValue = localStorage.getItem(`setting-${this.name}`);
        savedValue != null && (value = parseInt(savedValue));
        this.selectElement.selectedIndex = value;
    }
    CallCallback() {
        this.callback(this.selectElement.value);
    }
    Save() {
        localStorage.setItem(`setting-${this.name}`, this.selectElement.selectedIndex.toString());
    }
    SetValue(idx) {
        this.selectElement.selectedIndex = idx;
        this.Save();
        this.CallCallback();
    }
    Restart() {
        this.SetValue(0);
    }
}
