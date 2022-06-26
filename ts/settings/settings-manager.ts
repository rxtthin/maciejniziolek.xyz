import { Setting } from './setting.js'
import { CheckboxSetting } from './checkbox-setting.js'
import { SelectSetting } from './select-setting.js'
import { BackgroundParticlesJointsSettingCallback, BackgroundParticlesSettingCallback, BackgroundParticlesColorSettingCallback } from '../background-particles.js'

export const settingsContainer: HTMLDivElement = document.getElementById('settings-container') as HTMLDivElement;;
const settingsBackgroundCover: HTMLDivElement = document.getElementById('settings-background-cover') as HTMLDivElement;

const settingsButton: HTMLButtonElement = document.getElementById('settings-button') as HTMLButtonElement;
const settingsPanel: HTMLDivElement = document.getElementById('settings-panel') as HTMLDivElement;
const settingsRestoreDefaultsBtn: HTMLButtonElement = document.getElementById('settings-restore-defaults-btn') as HTMLButtonElement;

let settingsPanelVisible: boolean = false;
let settings: Setting[] = [];

settingsRestoreDefaultsBtn.addEventListener('click', (): void => {
	settings.forEach((setting) => {
		setting.Restart && setting.Restart();
	});
});

settingsBackgroundCover.addEventListener('click', (): void => {
	CloseSettingsPanel();
});

settingsButton.addEventListener('click', (): void => {
	settingsPanelVisible ? CloseSettingsPanel() : OpenSettingsPanel();
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

	AddSetting(new CheckboxSetting('Background particles', true, BackgroundParticlesSettingCallback));
	AddSetting(new CheckboxSetting('Background particles joints', true, BackgroundParticlesJointsSettingCallback));
	AddSetting(new SelectSetting('Background particles color', ['red', 'green', 'blue'], BackgroundParticlesColorSettingCallback));
}

Init();
