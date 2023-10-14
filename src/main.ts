import { Plugin, type App, PluginSettingTab, Setting } from "obsidian"

type ImportPlaintextPluginSettings = {
    supportedFileExtensions: string
}

export default class ImportPlaintextPlugin extends Plugin {
    public settings: ImportPlaintextPluginSettings
    defaultSettings: ImportPlaintextPluginSettings = {
        supportedFileExtensions: "",
    }

    async onload() {
        super.onload()
        this.addSettingTab(new ImportPlaintextSettingsTab(this.app, this))
    }

    async onunload() {
        super.onunload()
    }

    async loadSettings() {
        const loadedSettings = await this.loadData()

        this.settings = {
            ...this.defaultSettings,
            ...loadedSettings,
        }
    }

    async saveSettings() {
        this.registerExtensions(
            this.settings.supportedFileExtensions
                .split(",")
                .map((ext) => ext.trim().replace(".", "")),
            "markdown",
        )

        await this.saveData(this.settings)
    }
}

class ImportPlaintextSettingsTab extends PluginSettingTab {
    constructor(
        app: App,
        private plugin: ImportPlaintextPlugin,
    ) {
        super(app, plugin)
    }

    async hide() {
        this.plugin.saveSettings()
    }

    async display() {
        const { containerEl } = this

        new Setting(containerEl)
            .setName("Supported file extensions")
            .setDesc(
                "Comma separated list of file extensions that will be imported as Obsidian notes.",
            )
            .addText((text) =>
                text
                    .setPlaceholder(".md,.txt,.html,.json,...")
                    .setValue(this.plugin.settings.supportedFileExtensions)
                    .onChange(async (value) => {
                        this.plugin.settings.supportedFileExtensions = value
                    }),
            )
    }
}
