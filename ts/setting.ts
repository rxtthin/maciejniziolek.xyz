const settingsContainer: HTMLDivElement = document.getElementById('settings-container') as HTMLDivElement;

export type SettingCallback = (value: unknown) => void;

export class Setting {
	private name: string;
	private type: string
	private container: HTMLDivElement;
	private label: HTMLLabelElement;
	private input: HTMLInputElement;
	private defaultValue: unknown;
	private callback: SettingCallback;

	public constructor(name: string, type: string, defaultValue: unknown, callback: SettingCallback) {
		this.name = name;
		this.defaultValue = defaultValue;
		this.callback = callback;
		this.type = type;

		this.container = document.createElement('div') as HTMLDivElement;
		this.container.classList.add('input-container');

		this.label = document.createElement('label') as HTMLLabelElement;
		this.label.innerHTML = name;
		this.container.appendChild(this.label);

		this.input = document.createElement('input') as HTMLInputElement;
		this.input.type = type;
		this.container.appendChild(this.input);

		settingsContainer.appendChild(this.container);

		switch(this.type) {
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

	private CallCallback(): void {
		switch(this.type) {
			case 'checkbox':
				this.callback(this.input.checked);
				break;

			default:
				console.error(`Unknown setting type: ${this.type}!`);
				break;
		}
	}

	public Save(): void {
		switch(this.type) {
			case 'checkbox':	
				localStorage.setItem(this.name, this.input.checked.toString()); 
				break;

			default:
				console.error(`Unknown setting type: ${this.type}!`);
				break;
		}
	}

	public Restart(): void {
		switch(this.type) {
			case 'checkbox':	
				this.input.checked = this.defaultValue as boolean;
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
				this.input.checked = localStorage.getItem(this.name) != null ? localStorage.getItem(this.name) == 'true' : this.defaultValue as unknown as boolean;
				break;

			default:
				console.error(`Unknown setting type: ${this.type}!`);
				break;
		}

		this.CallCallback();
	}
}
