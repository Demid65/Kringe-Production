import {chromium} from "playwright";

let browser = chromium.launch();

export async function useBrowser() {
    return await browser
}