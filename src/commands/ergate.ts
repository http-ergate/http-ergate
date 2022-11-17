import { invoke } from "@tauri-apps/api/tauri";

/**
 * food addition
 */
export interface FoodAddition {
    /**
     * food smell, color and other things you can feel
     */
    senses: Record<string, string>,

    /**
     * things inside the food
     */
    inside: string,
}

/**
 * food
 */
export interface Food {
    /**
     * method to carry
     */
    method: string,

    /**
     * path to carry
     */
    path: string,

    /**
     * addition information
     */
    addition: FoodAddition,
}

/**
 * reward earned response
 */
export interface Reward {
    status_code: string,
    headers: Record<string, string>,
    body: string,
}

/**
 * obstacle, aka an error
 */
interface Obstacle {
    message: string,
}

/**
 * carry food
 * @param food food
 * @returns reward
 */
export async function carry(food: Food): Promise<Reward> {
    try {
        return await invoke<Reward>("carry", { food: food });
    } catch (error) {
        throw new Error((error as Obstacle).message);
    }
}
