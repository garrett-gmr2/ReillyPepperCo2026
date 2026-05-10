export type PlanMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  file: string;
  meals: string[];
  tags: string[];
};

export type MealMeta = {
  title: string;
  planSlug: string;
  planTitle: string;
  tags: string[];
  index: number; // position in plan
};

export const plans: PlanMeta[] = [
  {
    slug: 'mealtime-plan-may-9',
    title: 'Half-Week Meal Plan',
    date: '2025-05-09',
    description: '1 lunch · 2 dinners · 3 global regions',
    file: 'mealtime_plan_may9.html',
    meals: [
      'Thai-style pineapple fried rice',
      'Smoker pizza on homemade naan — white garlic + chicken',
      'Moroccan-spiced turkey skillet with lemon couscous',
    ],
    tags: ['Thai', 'American BBQ', 'Moroccan'],
  },
];

export const allMeals: MealMeta[] = plans.flatMap((plan) =>
  plan.meals.map((meal, index) => ({
    title: meal,
    planSlug: plan.slug,
    planTitle: plan.title,
    tags: plan.tags,
    index,
  }))
);

export function getPlanBySlug(slug: string): PlanMeta | undefined {
  return plans.find((p) => p.slug === slug);
}
