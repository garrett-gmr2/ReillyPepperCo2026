const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function parseRecipeFromHTML(html, planSlug) {
  const $ = cheerio.load(html);
  const recipes = [];

  $('.meal-card').each((index, element) => {
    const $meal = $(element);
    const title = $meal.find('.meal-title').text().trim();
    const ethnicity = $meal.find('.meal-origin').text().trim();
    const description = $meal.find('.meal-flavor').text().trim();

    // Extract prep and cook time from meta-row
    const metaText = $meal.find('.meta-row').text();
    const prepMatch = metaText.match(/(\d+ min prep)/);
    const cookMatch = metaText.match(/(\d+ min cook)/);
    const prepTime = prepMatch ? prepMatch[1] : '15 min';
    const cookTime = cookMatch ? cookMatch[1] : '30 min';

    // Servings from tag
    const servingsText = $meal.find('.meal-tag').text();
    const servingsMatch = servingsText.match(/(\d+) servings/);
    const servings = servingsMatch ? parseInt(servingsMatch[1]) : 4;

    // Ingredients
    const ingredients = [];
    $meal.find('.ingredient').each((i, el) => {
      ingredients.push($(el).text().replace(/^—\s*/, '').trim());
    });

    // Steps
    const steps = [];
    $meal.find('.step').each((i, el) => {
      steps.push($(el).text().trim());
    });

    // Nutrition
    const nutrition = {
      calories: $meal.find('.nut-val').first().text().trim() || '~400',
      protein: $meal.find('.nut-val').eq(1).text().trim() || '25g',
      carbs: $meal.find('.nut-val').eq(2).text().trim() || '~45g',
      highlight: $meal.find('.nut-val').eq(3).text().trim() || 'High Vitamin C',
    };

    // Equipment
    const equipment = $meal.find('.equip-box p').text().trim() || null;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    recipes.push({
      slug,
      title,
      ethnicity,
      prepTime,
      cookTime,
      servings,
      description,
      ingredients,
      steps,
      nutrition,
      equipment,
    });
  });

  return recipes;
}

// Usage: node scripts/parse-html.js content/plans/new_plan.html
const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node scripts/parse-html.js <html-file>');
  process.exit(1);
}

const html = fs.readFileSync(path.resolve(filePath), 'utf-8');
const planSlug = path.basename(filePath, '.html');
const recipes = parseRecipeFromHTML(html, planSlug);

console.log(JSON.stringify(recipes, null, 2));