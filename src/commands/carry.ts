import { invoke } from "@tauri-apps/api/tauri";

/**
 * reward earned response
 */
export interface Reward {
    status_code: string,
    headers: Map<string, string>,
    body: string,
}

/**
 * uncarriable error
 */
interface Uncarriable {
    message: string,
}

/**
 * carry food
 * @param method method to carry
 * @param path path to carry
 * @returns reward
 */
export async function carry(method: string, path: string): Promise<Reward> {
    try {
        return await invoke<Reward>("send", { method: method, url: path });
    } catch (error) {
        throw new Error((error as Uncarriable).message);
    }
}
