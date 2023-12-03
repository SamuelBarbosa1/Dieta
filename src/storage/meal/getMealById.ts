import AsyncStorage from '@react-native-async-storage/async-storage';
import { MEAL_COLLECTION } from '@storage/storageConfig';
import { Meal } from './mealCreate';

export type Meals = {
  title: string;
  data: Meal[];
}[];

export async function getMealById(id: string): Promise<Meal> {
  try {
    const storage = await AsyncStorage.getItem(MEAL_COLLECTION);

    const meals: Meals = storage ? JSON.parse(storage) : ([] as Meals);

    for (let meal of meals) {
      for (let data of meal.data) {
        if (data.id === id) {
          return data;
        }
      }
    }

    return {} as Meal;
  } catch (error) {
    throw error;
  }
}
