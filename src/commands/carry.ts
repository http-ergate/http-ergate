import { invoke } from "@tauri-apps/api/tauri";

/**
 * food information
 */
export interface FoodInfo {
    /**
     * method to carry
     */
    method: string,

    /**
     * path to carry
     */
    path: string,
}

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
 * @param fi food info
 * @returns reward
 */
export async function carry(fi: FoodInfo): Promise<Reward> {
    try {
        return await invoke<Reward>("send", { method: fi.method, url: fi.path });
    } catch (error) {
        throw new Error((error as Uncarriable).message);
    }
}
