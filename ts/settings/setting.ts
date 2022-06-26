import { settingsContainer } from './settings-manager.js';

export class Setting {
	protected name: string;
	protected container: HTMLDivElement;
	protected label: HTMLLabelElement;

	public constructor(name: string) { this.name = name;

		this.container = document.createElement('div');
		this.container.classList.add('input-container');

		this.label = document.createElement('label');
		this.label.innerHTML = name;
		this.container.appendChild(this.label);

		settingsContainer.appendChild(this.container);
	}

	protected CallCallback?(): void;
	protected Save?(): void;
	protected InitValue?(): void;
	public Restart?(): void;
}
