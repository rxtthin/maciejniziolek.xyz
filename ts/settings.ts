import { Setting } from './setting.js'
import { BackgroundParticlesSettingCallback } from './backgroundParticles.js'

const settingsBackgroundCover: HTMLDivElement = document.getElementById('settings-background-cover') as HTMLDivElement;
const settingsButton: HTMLButtonElement = document.getElementById('settings-button') as HTMLButtonElement;
const settingsPanel: HTMLDivElement = document.getElementById('settings-panel') as HTMLDivElement;
const settingsRestoreDefaultsBtn: HTMLButtonElement = document.getElementById('settings-restore-defaults-btn') as HTMLButtonElement;

let settingsPanelVisible: boolean = false;
let settings: Setting[] = [];

settingsRestoreDefaultsBtn.addEventListener('click', (): void => {
	settings.forEach((setting) => {
		setting.Restart();
	});
});

settingsButton.addEventListener('click', (): void => {
	if(settingsPanelVisible) {
		CloseSettingsPanel();
	} else {
		OpenSettingsPanel();
	}
});

function OpenSettingsPanel(): void {
	settingsBackgroundCover.style.display = 'block';
	settingsPanel.style.display = 'block';
	settingsPanelVisible = true;
}

function CloseSettingsPanel(): void {
	settingsBackgroundCover.style.display = 'none';
	settingsPanel.style.display = 'none';
	settingsPanelVisible = false;
}

function AddSetting(setting: Setting): void {
	settings.push(setting);
}

function Init(): void {
	CloseSettingsPanel();
	AddSetting(new Setting('Background particles', 'checkbox', true, BackgroundParticlesSettingCallback));
}

Init();
