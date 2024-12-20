import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import { Meal } from "../store/meal/types";
import { useAppSelector } from "../store/hooks";
import { Colors } from "@/constants";
import { BackButton, Error, Loader } from "@/components/shared";

const { height } = Dimensions.get("screen");
function getIngredientsWithMeasures(meal: Meal): string[] {
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = (meal as any)[`strIngredient${i}`];
    const measure = (meal as any)[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }
  return ingredients;
}

const MealDetail: React.FC = () => {
  const { details, detailsLoading, detailsError } = useAppSelector(
    (state) => state.meal
  );

  const ingredientsWithMeasures =
    details && getIngredientsWithMeasures(details);

  const handleClick = () => {
    if (details?.strYoutube) {
      Linking.openURL(details.strYoutube);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <BackButton absolute />
      {detailsLoading && <Loader />}
      {detailsError && <Error />}
      {details && (
        <>
          {/* Meal Image and Basic Details */}
          <Image source={{ uri: details.strMealThumb }} style={styles.image} />
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{details.strMeal}</Text>
            <Text style={styles.detailText}>
              Categorie: {details.strCategory}
            </Text>
            <Text style={styles.detailText}>Area: {details.strArea}</Text>
            <TouchableOpacity style={styles.button} onPress={handleClick}>
              <Text style={styles.buttonText}>Youtube Tutorial</Text>
            </TouchableOpacity>
          </View>

          {/* Instructions and Ingredients */}
          <View style={styles.instructionsContainer}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instructionsText}>
              {details.strInstructions}
            </Text>
            <Text style={styles.sectionTitle}>Measures</Text>
            {ingredientsWithMeasures &&
              ingredientsWithMeasures.map((item, index) => (
                <Text style={styles.ingredient} key={index}>
                  {item}
                </Text>
              ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.amber100,
  },
  content: {
    paddingBottom: 20,
  },
  detailsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: height * 0.4,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 30,
    color: Colors.amber400,
    fontFamily: "Anton",
  },
  detailText: {
    fontSize: 16,
    color: Colors.zinc900,
    fontFamily: "Anton",
    marginVertical: 4,
  },
  button: {
    backgroundColor: "#E63946",
    padding: 10,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontFamily: "Anton",
    fontSize: 15,
    textAlign: "center",
  },
  instructionsContainer: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 30,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Anton",
    color: Colors.amber400,
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 16,
    color: "#FFF",
    fontFamily: "Anton",
    marginBottom: 16,
  },
  ingredient: {
    fontSize: 14,
    color: Colors.amber400,
    marginVertical: 2,
    fontFamily: "Anton",
  },
});

export default MealDetail;
