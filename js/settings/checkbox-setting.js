import { Setting } from './setting.js';
export class CheckboxSetting extends Setting {
    constructor(name, defaultValue, callback) {
        super(name);
        this.defaultValue = defaultValue;
        this.callback = callback;
        this.checkboxElement = document.createElement('input');
        this.checkboxElement.type = 'checkbox';
        this.checkboxElement.addEventListener('click', () => {
            this.Save();
            this.CallCallback();
        });
        this.container.appendChild(this.checkboxElement);
        this.InitValue();
        this.CallCallback();
    }
    InitValue() {
        let value = this.defaultValue;
        const savedValue = localStorage.getItem(`setting-${this.name}`);
        savedValue != null && (value = savedValue == "true");
        this.SetValue(value, false);
    }
    CallCallback() {
        this.callback(this.checkboxElement.checked);
    }
    Save() {
        localStorage.setItem(`{setting-this.name}`, this.checkboxElement.checked.toString());
    }
    SetValue(value, save = true) {
        this.checkboxElement.checked = value;
        save && this.Save();
        this.CallCallback();
    }
    Restart() {
        this.SetValue(this.defaultValue);
    }
}
