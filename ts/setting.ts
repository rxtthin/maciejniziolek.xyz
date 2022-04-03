import { settingsContainer } from './settings-manager.js';

export type SettingCallback = (value: unknown) => void;

export class Setting {
	private name: string;
	private type: string
	private container: HTMLDivElement;
	private label: HTMLLabelElement;
	private input: HTMLElement;
	private defaultValue: unknown;
	private callback: SettingCallback;

	public constructor(name: string, type: string, defaultValue: unknown, callback: SettingCallback, data?: unknown[]) {
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

		switch(this.type) {
			case 'checkbox':
				this.input = document.createElement('input');
				(this.input as HTMLInputElement).type = type;
				this.input.addEventListener('click', () => {
					this.Save();
					this.CallCallback();
				});
				this.container.appendChild(this.input as HTMLInputElement);
				break;

			case 'select':
				this.input = document.createElement('select');
				this.input.addEventListener('change', () => {
					this.Save();
					this.CallCallback();
				});
				(data as string[])?.forEach((opt) => {
					const optElement: HTMLOptionElement = document.createElement('option');
					optElement.value = opt;
					optElement.textContent = opt;
					this.input.appendChild(optElement);
				});
				this.container.appendChild(this.input as HTMLInputElement);
				break;
				
			default:
				this.input = document.createElement('div');
				console.error(`Unknown setting type: ${this.type}!`);
				break;
		}
		
		this.Init();
	}

	private CallCallback(): void {
		switch(this.type) {
			case 'checkbox':
				this.callback((this.input as HTMLInputElement).checked);
				break;

			case 'select':
				this.callback((this.input as HTMLSelectElement).value);
				break;

			default:
				console.error(`Unknown setting type: ${this.type}!`);
				break;
		}
	}

	public Save(): void {
		switch(this.type) {
			case 'checkbox':	
				localStorage.setItem(this.name, (this.input as HTMLInputElement).checked.toString()); 
				break;

			case 'select':
				localStorage.setItem(this.name, (this.input as HTMLSelectElement).value);
				break;

			default:
				console.error(`Unknown setting type: ${this.type}!`);
				break;
		}
	}

	public Restart(): void {
		switch(this.type) {
			case 'checkbox':	
				(this.input as HTMLInputElement).checked = this.defaultValue as boolean;
				break;

			case 'select':
				(this.input as HTMLSelectElement).value = this.defaultValue as string;
				break;

			default:
				console.error(`Unknown setting type: ${this.type}!`);
				break;
		}

		this.CallCallback();
	}

	public Init(): void {
		switch(this.type) {
			case 'checkbox':	
				(this.input as HTMLInputElement).checked = localStorage.getItem(this.name) != null ? localStorage.getItem(this.name) == 'true' : this.defaultValue as boolean;
				break;

			case 'select':	
				(this.input as HTMLSelectElement).value = localStorage.getItem(this.name) || this.defaultValue as string;
				break;

			default:
				console.error(`Unknown setting type: ${this.type}!`);
				break;
		}

		this.CallCallback();
	}
}
