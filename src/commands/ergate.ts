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

export interface RewardDetail {
    /**
     * exteriors of reward
     */
    exteriors: Record<string, string>,

    /**
     * reward description
     */
    description: string,
}

/**
 * reward earned response
 */
export interface Reward {
    /**
     * level of reward
     */
    level: string,
 
    /**
     * reward detail
     */
    detail: RewardDetail,
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
