import { Setting } from './setting.js';

export type CheckboxSettingCallback = (value: boolean) => void;

export class CheckboxSetting extends Setting {
	private defaultValue: boolean;
	private checkboxElement: HTMLInputElement;
	private callback: CheckboxSettingCallback;

	constructor(name: string, defaultValue: boolean, callback: CheckboxSettingCallback) {
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

	protected InitValue(): void {
		let value = this.defaultValue;

		const savedValue: unknown = localStorage.getItem(`setting-${this.name}`);
		savedValue != null && (value = (savedValue as string) == "true");

		this.SetValue(value, false);
	}

	protected CallCallback(): void {
		this.callback(this.checkboxElement.checked);
	}

	public Save(): void {
		localStorage.setItem(`{setting-this.name}`, this.checkboxElement.checked.toString());
	}

	private SetValue(value: boolean, save: boolean = true): void {
		this.checkboxElement.checked = value;
		save && this.Save();
		this.CallCallback();
	}

	public Restart(): void {
		this.SetValue(this.defaultValue);
	}
}
