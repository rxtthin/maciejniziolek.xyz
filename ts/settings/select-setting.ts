import { Setting } from './setting.js';

export type SelectSettingCallback = (value: string) => void;

export class SelectSetting extends Setting {
	private selectElement: HTMLSelectElement;
	private callback: SelectSettingCallback;

	constructor(name: string, options: string[], callback: SelectSettingCallback) {
		super(name);

		this.callback = callback;

		this.selectElement = document.createElement('select');
		this.selectElement.addEventListener('change', () => {
			this.Save();
			this.CallCallback();
		});

		options.forEach((opt) => {
			const optElement: HTMLOptionElement = document.createElement('option');
			optElement.value = opt;
			optElement.textContent = opt;
			this.selectElement.appendChild(optElement);
		});
		
		this.container.appendChild(this.selectElement);

		this.InitValue();
		this.CallCallback();
	}

	protected InitValue(): void {
		let value: number = 0;

		const savedValue: unknown = localStorage.getItem(`setting-${this.name}`);
		savedValue != null && (value = parseInt(savedValue as string));

		this.selectElement.selectedIndex = value;
	}

	protected CallCallback(): void {
		this.callback(this.selectElement.value);
	}

	public Save(): void {
		localStorage.setItem(`setting-${this.name}`, this.selectElement.selectedIndex.toString());
	}

	private SetValue(idx: number): void {
		this.selectElement.selectedIndex = idx;
		this.Save();
		this.CallCallback();
	}

	public Restart(): void {
		this.SetValue(0);
	}
}
