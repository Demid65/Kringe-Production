import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";
import memoryDriver from "unstorage/drivers/memory"

const fileStorage = createStorage({
    driver: fsDriver({ base: "./userfiles" }),
});

const settingsStorage = createStorage({
    driver: fsDriver({ base: "./settings" })
})

export function useFileStorage() {
    return fileStorage
}

export function useSettingsStorage() {
    return settingsStorage
}