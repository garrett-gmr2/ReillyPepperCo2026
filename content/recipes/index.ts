export type Recipe = {
  slug: string;
  title: string;
  ethnicity: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  description: string;
  ingredients: string[];
  steps: string[];
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    highlight: string;
  };
  equipment?: string;
};

export const recipes: Recipe[] = [
  {
    slug: 'thai-style-pineapple-fried-rice',
    title: 'Thai-style pineapple fried rice',
    ethnicity: 'Southeast Asian — Thai',
    prepTime: '15 min',
    cookTime: '15 min',
    servings: 6,
    description: 'Savory-sweet jasmine rice wok-tossed with fresh pineapple, shrimp, and toasted cashews — finished with fish sauce and a hit of lime. Leftovers hold beautifully.',
    ingredients: [
      '3 cups jasmine rice (cooked day-ahead, chilled)',
      '1 lb large shrimp, peeled and deveined',
      '2 cups fresh pineapple, diced (use your pineapple)',
      '3 eggs',
      '1 cup frozen peas',
      '4 scallions, sliced',
      '4 garlic cloves, minced',
      '1 tbsp fresh ginger, grated',
      '3 tbsp soy sauce',
      '1 tbsp fish sauce',
      '1 tbsp sesame oil',
      '2 tbsp neutral oil (avocado or canola)',
      '½ cup roasted cashews',
      '1 lime, juiced (use your lemons if preferred)',
      'Fresh cilantro to finish',
    ],
    steps: [
      'Cook jasmine rice a day ahead and refrigerate uncovered. Cold, dry rice is essential — fresh rice holds too much moisture and steams instead of frying, producing clumped, mushy results.',
      'Heat a large pan or wok over high heat until smoking. Add 1 tbsp neutral oil. Sear shrimp 90 seconds per side — don\'t crowd. Remove and set aside.',
      'Add remaining oil. Sauté garlic and ginger 30 seconds until fragrant, then add pineapple and cook 2 minutes to caramelize the edges slightly.',
      'Push everything to the sides. Crack eggs into the center and scramble until just set, then fold into the pineapple mixture.',
      'Add cold rice. Press it flat against the pan and let it sit 60–90 seconds untouched — this creates the lightly crisped crust that distinguishes good fried rice. Toss and repeat once.',
      'Add soy sauce, fish sauce, and sesame oil. Toss to coat evenly. Fold in peas, scallions, and shrimp.',
      'Finish with lime juice and cashews. Top with cilantro. Serve immediately, or refrigerate — reheats well in a hot pan.',
    ],
    nutrition: {
      calories: '~420',
      protein: '28g',
      carbs: '~52g',
      highlight: 'High Vitamin C (pineapple)',
    },
    equipment: 'The Blackstone griddle is ideal here — its large surface area lets you spread all the rice flat for simultaneous crust formation. A standard wok or large skillet works, but you\'ll need to work in batches to avoid steaming.',
  },
  {
    slug: 'smoker-pizza-on-homemade-naan-white-garlic-chicken',
    title: 'Smoker pizza on homemade naan — white garlic + chicken',
    ethnicity: 'South Asian base · American BBQ technique',
    prepTime: '25 min active prep + 1 hr dough rest',
    cookTime: '60 min',
    servings: 4,
    description: 'Pillowy hand-stretched naan acts as the crust — topped with roasted garlic cream, smoked chicken thighs, fresh mozzarella, and a lemon-herb finish. The pellet smoker adds a subtle wood note that a conventional oven never touches.',
    ingredients: [
      // Naan dough
      '2¼ tsp instant yeast',
      '1 cup warm water',
      '3 cups all-purpose flour',
      '½ cup plain Greek yogurt',
      '2 tbsp olive oil',
      '1 tsp salt',
      '1 tsp sugar',
      // Toppings
      '3 boneless skinless chicken thighs',
      '6 garlic cloves',
      '4 oz cream cheese, softened',
      '¼ cup heavy cream',
      '8 oz fresh mozzarella, torn',
      '1 lemon, zested and juiced (use your lemons)',
      'Fresh thyme or rosemary',
      'Olive oil, salt, pepper, red pepper flakes',
      'Fresh arugula (optional finish)',
    ],
    steps: [
      'Make naan dough: combine yeast, sugar, and warm water — rest 5 minutes until foamy. Mix in flour, yogurt, olive oil, and salt until a shaggy dough forms. Knead 5–6 minutes until smooth and slightly tacky. Cover and rest 1 hour until doubled.',
      'While dough rests, preheat pellet smoker to 275°F with a mild wood like apple or cherry. Season chicken thighs with salt, pepper, and olive oil. Smoke 45–55 minutes until internal temp hits 165°F. Rest 10 minutes, then slice thin.',
      'Roasted garlic sauce: wrap garlic cloves in foil with a drizzle of olive oil — place directly on the smoker grate the last 30 minutes. When soft, squeeze cloves out and blend with cream cheese and heavy cream until smooth. Season with salt and lemon zest.',
      'Divide dough into 4 equal portions. On a lightly floured surface, stretch or roll each into a roughly oval shape, about ¼ inch thick. Don\'t aim for perfect circles — rustic edges cook better.',
      'Crank smoker to 450°F (or as high as it goes). Place naan directly on the grates. Cook 3–4 minutes until the bottom has grill marks and is set but not fully cooked through.',
      'Flip naan. Working quickly, spread garlic cream, top with torn mozzarella and sliced chicken. Close the lid and cook 4–5 more minutes until cheese is melted and edges are golden.',
      'Remove from smoker. Finish with lemon juice, red pepper flakes, and fresh herbs. Top with arugula if using — it wilts perfectly on the residual heat.',
    ],
    nutrition: {
      calories: '~560',
      protein: '38g',
      carbs: '~48g',
      highlight: 'High Selenium (chicken)',
    },
    equipment: 'The pellet smoker does real work here — both the chicken and garlic absorb smoke during the low-temp phase, then the high-heat finish blisters the naan directly on the grates. A pizza stone placed inside the smoker during preheat is optional but adds bottom crunch.',
  },
  {
    slug: 'moroccan-spiced-turkey-skillet-with-lemon-couscous',
    title: 'Moroccan-spiced turkey skillet with lemon couscous',
    ethnicity: 'North African — Moroccan',
    prepTime: '10 min',
    cookTime: '30 min',
    servings: 4,
    description: 'Ground turkey simmered with warm spices — cumin, coriander, cinnamon — in a tomato-chickpea sauce. Finished with preserved-style lemon brightness and served over fluffy couscous. Bold, warming, and weeknight-fast.',
    ingredients: [
      '1.25 lbs lean ground turkey',
      '1 can (15 oz) chickpeas, drained',
      '1 can (14 oz) crushed tomatoes',
      '1 medium yellow onion, diced',
      '4 garlic cloves, minced',
      '1 tsp each: cumin, coriander, smoked paprika',
      '½ tsp cinnamon',
      '¼ tsp cayenne (adjust to taste)',
      '1 cup chicken broth',
      '2 lemons — zest both, juice one (use your lemons)',
      '1½ cups couscous',
      '1¾ cups boiling water or broth (for couscous)',
      'Fresh parsley or mint to finish',
      '2 tbsp olive oil, salt, pepper',
    ],
    steps: [
      'Bloom the spices: heat olive oil in a large skillet over medium-high. Add onion and cook 4–5 minutes until softened and lightly golden. Add garlic and all dry spices — cook 60 seconds, stirring constantly. Blooming spices in fat unlocks fat-soluble compounds and deepens flavor significantly.',
      'Add ground turkey. Break into small pieces and cook until no pink remains, about 5–6 minutes. Don\'t rush this — full browning develops the Maillard crust that adds depth to the sauce.',
      'Pour in crushed tomatoes, chickpeas, and chicken broth. Stir to combine, scraping any fond from the pan bottom. Reduce heat to medium-low and simmer uncovered 15 minutes until sauce thickens.',
      'While sauce simmers, make couscous: place in a heatproof bowl, pour boiling water or broth over, cover tightly with plastic wrap or a plate. Rest exactly 5 minutes. Fluff with a fork, add lemon zest and a drizzle of olive oil.',
      'Finish the skillet with lemon juice. Taste and adjust salt. The lemon does the work preserved lemon would — bright acidity cuts the warm spices cleanly.',
      'Serve turkey mixture over couscous. Top with fresh parsley or mint. Optionally add a spoonful of Greek yogurt — it cools the heat and adds creaminess without extra cooking.',
    ],
    nutrition: {
      calories: '~470',
      protein: '42g',
      carbs: '~50g',
      highlight: 'High Fiber (chickpeas)',
    },
    equipment: 'No specialty equipment needed here — this is a pure skillet meal. The convection oven setting (if finishing in a covered baking dish) can deepen the sauce further, but stovetop alone is excellent and faster.',
  },
];

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}