import {chromium} from "@playwright/test";

let browser = chromium.launch();

export async function useBrowser() {
    return await browser
}