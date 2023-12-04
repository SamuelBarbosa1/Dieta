import AsyncStorage from '@react-native-async-storage/async-storage';
import { MEAL_COLLECTION } from '@storage/storageConfig';
import { formatDate } from '@utils/DateFormat';
import { mealsGetAll } from './mealsGetAll';

export type Meal = {
  id: string;
  hour: string;
  name: string;
  description: string;
  positive: boolean;
};

export async function mealCreate(mealDate: string, newMeal: Meal) {
  try {
    const storedMeals = await mealsGetAll();
    const today = formatDate(mealDate);

    const existingIndex = storedMeals.findIndex((item) => item.title === today);

    if (existingIndex >= 0) {
      let newStoredMeals = storedMeals;
      const firstMeal = newStoredMeals[existingIndex].data.length <= 0;

      if (firstMeal) {
        newStoredMeals[existingIndex].data.unshift(newMeal);
      } else {
        newStoredMeals[existingIndex].data.unshift(newMeal);

        // ordena refeições com base no horário, do maior para o menor
        newStoredMeals[existingIndex].data.sort((a, b) => {
          if (a.hour > b.hour) {
            return -1;
          } else {
            return 1;
          }
        });
      }

      const storage = JSON.stringify(newStoredMeals);
      await AsyncStorage.setItem(MEAL_COLLECTION, storage);
    } else {
      let newStoredMeals = storedMeals;

      const newEntry = {
        title: today,
        data: [newMeal],
      };
      newStoredMeals.push(newEntry);

      newStoredMeals.sort(function (a, b) {
        // Converta as strings de data em objetos de data
        let dateA = new Date(a.title.split('.').reverse().join('-'));
        let dateB = new Date(b.title.split('.').reverse().join('-'));
        // Compare datas usando getTime()
        return dateB.getTime() - dateA.getTime();
      });

      const storage = JSON.stringify(newStoredMeals);
      await AsyncStorage.setItem(MEAL_COLLECTION, storage);
    }
  } catch (error) {
    throw error;
  }
}
