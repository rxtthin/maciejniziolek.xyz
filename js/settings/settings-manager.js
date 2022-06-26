import { CheckboxSetting } from './checkbox-setting.js';
import { SelectSetting } from './select-setting.js';
import { BackgroundParticlesJointsSettingCallback, BackgroundParticlesSettingCallback, BackgroundParticlesColorSettingCallback } from '../background-particles.js';
export const settingsContainer = document.getElementById('settings-container');
;
const settingsBackgroundCover = document.getElementById('settings-background-cover');
const settingsButton = document.getElementById('settings-button');
const settingsPanel = document.getElementById('settings-panel');
const settingsRestoreDefaultsBtn = document.getElementById('settings-restore-defaults-btn');
let settingsPanelVisible = false;
let settings = [];
settingsRestoreDefaultsBtn.addEventListener('click', () => {
    settings.forEach((setting) => {
        setting.Restart && setting.Restart();
    });
});
settingsBackgroundCover.addEventListener('click', () => {
    CloseSettingsPanel();
});
settingsButton.addEventListener('click', () => {
    settingsPanelVisible ? CloseSettingsPanel() : OpenSettingsPanel();
});
function OpenSettingsPanel() {
    settingsBackgroundCover.style.display = 'block';
    settingsPanel.style.display = 'block';
    settingsPanelVisible = true;
}
function CloseSettingsPanel() {
    settingsBackgroundCover.style.display = 'none';
    settingsPanel.style.display = 'none';
    settingsPanelVisible = false;
}
function AddSetting(setting) {
    settings.push(setting);
}
function Init() {
    CloseSettingsPanel();
    AddSetting(new CheckboxSetting('Background particles', true, BackgroundParticlesSettingCallback));
    AddSetting(new CheckboxSetting('Background particles joints', true, BackgroundParticlesJointsSettingCallback));
    AddSetting(new SelectSetting('Background particles color', ['red', 'green', 'blue'], BackgroundParticlesColorSettingCallback));
}
Init();
