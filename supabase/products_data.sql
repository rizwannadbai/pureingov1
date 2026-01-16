-- Product Data Migration for Pureingo
-- Run this AFTER products_schema.sql

-- Fresh Juices - Single Ingredient (10 products)
INSERT INTO public.products (id, name, category, type, description, long_description, price, unit, image, benefits, benefit_details, features, nutrition_info, how_to_consume, best_time) VALUES

('juice-apple', 'Apple Juice', 'fresh-juices', 'single', 
'Freshly pressed apple juice with no added sugar. Made from hand-picked apples.',
'Our Apple Juice is cold-pressed from farm-fresh apples every morning. Rich in natural sugars and fiber, it provides sustained energy without the crash.',
79, 'glass', '/products/apple-juice.png',
'["Digestion", "Heart health", "Natural energy"]'::jsonb,
'["Supports digestive health with natural pectin fiber", "Contains polyphenols that help maintain healthy cholesterol levels", "Natural fructose provides quick, clean energy boost", "Rich in antioxidants that protect cells from damage"]'::jsonb,
'["No added sugar", "Fresh daily", "100% natural"]'::jsonb,
'["Calories: 95 kcal", "Carbs: 25g", "Fiber: 0.5g", "Vitamin C: 14%"]'::jsonb,
'Best consumed fresh within 2 hours of delivery',
'Morning on empty stomach or mid-afternoon'),

('juice-orange', 'Orange Juice', 'fresh-juices', 'single',
'Fresh citrus burst packed with Vitamin C. Perfect morning energizer.',
'Squeeze the goodness of fresh oranges into your daily routine. A natural immunity booster that tastes like sunshine.',
69, 'glass', '/products/orange-juice.png',
'["Vitamin C", "Immunity boost", "Energy"]'::jsonb,
'["One glass provides 100% of daily Vitamin C requirement", "Strengthens immune system with natural antioxidants", "Flavonoids support cardiovascular health"]'::jsonb,
'["No added sugar", "Fresh daily", "Rich in Vitamin C"]'::jsonb,
'["Calories: 112 kcal", "Carbs: 26g", "Vitamin C: 124%", "Potassium: 10%"]'::jsonb,
'Drink immediately for maximum vitamin retention',
'With breakfast or after exercise'),

('juice-pomegranate', 'Pomegranate Juice', 'fresh-juices', 'single',
'Rich, ruby-red pomegranate juice for heart and blood health.',
'The king of antioxidants! Our Pomegranate Juice delivers powerful polyphenols that support heart health.',
99, 'glass', '/products/pomegranate-juice.png',
'["Hemoglobin boost", "Heart health", "Antioxidants"]'::jsonb,
'["Increases hemoglobin levels naturally", "Powerful antioxidants 3x more potent than green tea", "Supports healthy blood pressure"]'::jsonb,
'["No added sugar", "Fresh daily", "Blood purifier"]'::jsonb,
'["Calories: 134 kcal", "Carbs: 33g", "Iron: 3%", "Vitamin K: 26%"]'::jsonb,
'Can be consumed directly or mixed with water',
'Morning or evening'),

('juice-mosambi', 'Mosambi Juice', 'fresh-juices', 'single',
'Sweet lime juice that hydrates and refreshes. Light on stomach.',
'Mosambi is India''s favorite refreshing juice. Perfect for sensitive stomachs.',
59, 'glass', '/products/citrus-boost-juice.png',
'["Hydration", "Immunity", "Gentle digestion"]'::jsonb,
'["Excellent source of hydration", "Gentle on stomach", "Boosts immunity with Vitamin C"]'::jsonb,
'["No added sugar", "Fresh daily", "Light & refreshing"]'::jsonb,
'["Calories: 45 kcal", "Carbs: 11g", "Vitamin C: 50%"]'::jsonb,
'Best served chilled',
'Anytime'),

('juice-beetroot', 'Beetroot Juice', 'fresh-juices', 'single',
'Deep red beetroot juice for blood purification and stamina.',
'Athletes secret weapon! Scientifically proven to improve stamina and blood flow.',
79, 'glass', '/products/beetroot-juice.png',
'["Blood purification", "Stamina", "Iron boost"]'::jsonb,
'["Dietary nitrates improve blood flow", "16% improvement in exercise endurance", "High iron content increases hemoglobin"]'::jsonb,
'["No added sugar", "Fresh daily", "Athletic favorite"]'::jsonb,
'["Calories: 58 kcal", "Carbs: 13g", "Iron: 4%", "Folate: 20%"]'::jsonb,
'Drink 2-3 hours before exercise',
'Morning or pre-workout'),

('juice-carrot', 'Carrot Juice', 'fresh-juices', 'single',
'Golden carrot juice for eye health and glowing skin.',
'Packed with beta-carotene for eye health and skin radiance.',
59, 'glass', '/products/carrot-juice.png',
'["Eye health", "Skin glow", "Beta-carotene"]'::jsonb,
'["Rich in beta-carotene for eye health", "Promotes glowing skin", "Strengthens immune system"]'::jsonb,
'["No added sugar", "Fresh daily", "Vitamin A rich"]'::jsonb,
'["Calories: 40 kcal", "Carbs: 9g", "Vitamin A: 428%"]'::jsonb,
'Add a few drops of oil for better absorption',
'Morning with breakfast'),

('juice-watermelon', 'Watermelon Juice', 'fresh-juices', 'single',
'Refreshing summer favorite. Natural hydration with every sip.',
'Made from sweet, ripe watermelons. Nature''s perfect hydrator!',
59, 'glass', '/products/watermelon-juice.png',
'["Cooling", "Hydration", "Low calorie"]'::jsonb,
'["92% water content", "Supports heart health", "Only 30 cal per 100ml"]'::jsonb,
'["No added sugar", "Fresh daily", "Summer special"]'::jsonb,
'["Calories: 30 kcal", "Carbs: 8g", "Vitamin A: 11%", "Vitamin C: 13%"]'::jsonb,
'Serve chilled',
'Afternoon or post-workout'),

('juice-papaya', 'Papaya Juice', 'fresh-juices', 'single',
'Smooth papaya juice for gut health and digestion.',
'Contains papain enzyme that aids protein digestion.',
69, 'glass', '/products/mango-juice.png',
'["Digestion", "Gut health", "Skin glow"]'::jsonb,
'["Papain enzyme breaks down proteins", "Promotes healthy bowel movements", "Improves skin health"]'::jsonb,
'["No added sugar", "Fresh daily", "Enzyme rich"]'::jsonb,
'["Calories: 43 kcal", "Vitamin A: 31%", "Vitamin C: 103%"]'::jsonb,
'Best on empty stomach',
'Morning before breakfast'),

('juice-cucumber', 'Cucumber Juice', 'fresh-juices', 'single',
'Cooling cucumber juice for hydration.',
'Ultra-hydrating and low in calories. Perfect summer drink.',
49, 'glass', '/products/cucumber-juice.png',
'["Cooling", "Hydration", "Low calorie"]'::jsonb,
'["96% water content", "Only 16 calories", "Promotes healthy skin"]'::jsonb,
'["No added sugar", "Fresh daily", "Summer coolant"]'::jsonb,
'["Calories: 16 kcal", "Carbs: 4g"]'::jsonb,
'Serve chilled',
'Afternoon'),

('juice-amla', 'Amla Juice', 'fresh-juices', 'wellness',
'Indian gooseberry juice - the Vitamin C powerhouse.',
'Ancient Ayurvedic superfood. 20x more Vitamin C than oranges!',
99, 'glass', '/products/amla-juice.png',
'["Vitamin C", "Immunity", "Hair health"]'::jsonb,
'["20 times more Vitamin C than oranges", "Promotes thick hair growth", "Powerful anti-aging antioxidants"]'::jsonb,
'["No added sugar", "Fresh daily", "Ayurvedic superfood"]'::jsonb,
'[]'::jsonb,
'Morning on empty stomach',
'Morning on empty stomach');

-- Combo Juices (8 products)
INSERT INTO public.products (id, name, category, type, description, price, unit, image, benefits, features, best_time) VALUES

('juice-abc', 'ABC Juice (Apple+Beetroot+Carrot)', 'fresh-juices', 'combo',
'The ultimate blood boost drink for stamina and strength.',
99, 'glass', '/products/abc-juice.png',
'["Energy", "Blood boost", "Athletic performance"]'::jsonb,
'["No added sugar", "Fresh daily", "Power combo"]'::jsonb,
'Morning on empty stomach'),

('juice-green-detox', 'Green Detox Mix', 'fresh-juices', 'combo',
'Cucumber, mint, and spinach for ultimate detox.',
89, 'glass', '/products/green-detox-juice.png',
'["Detox", "Weight loss", "Cooling"]'::jsonb,
'["No added sugar", "Fresh daily", "Detox special"]'::jsonb,
'Morning'),

('juice-immunity-booster', 'Immunity Booster', 'fresh-juices', 'combo',
'Amla, ginger, and turmeric combination.',
109, 'glass', '/products/immunity-booster-juice.png',
'["Immunity", "Anti-inflammatory", "Wellness"]'::jsonb,
'["No added sugar", "Fresh daily", "Immunity booster"]'::jsonb,
'Morning before breakfast'),

('juice-energy-punch', 'Energy Punch', 'fresh-juices', 'combo',
'Beetroot, orange, and ginger for sustained energy.',
99, 'glass', '/products/energy-punch-juice.png',
'["Energy", "Stamina", "Metabolism"]'::jsonb,
'["No added sugar", "Fresh daily", "Energy booster"]'::jsonb,
'Pre-workout');

-- Juice Packages (4 products)
INSERT INTO public.products (id, name, category, type, description, price, unit, duration, image, benefits, features) VALUES

('pkg-daily-juice', 'Daily Juice Plan', 'juice-packages', 'subscription',
'1 fresh juice delivered every day for 30 days.',
1099, 'month', '30 days', '/products/tropical-punch-juice.png',
'["Daily nutrition", "Variety", "Convenience"]'::jsonb,
'["1 juice/day", "30 day supply", "Free delivery"]'::jsonb),

('pkg-detox-7day', '7-Day Detox Plan', 'juice-packages', 'subscription',
'Curated detox juice cleanse for a week.',
599, 'week', '7 days', '/products/green-detox-juice.png',
'["Body detox", "Weight management", "Skin glow"]'::jsonb,
'["Curated detox juices", "Daily delivery", "Diet guide"]'::jsonb),

('pkg-immunity-boost', 'Immunity Boost Plan', 'juice-packages', 'subscription',
'15-day immunity program with Amla and citrus juices.',
799, '15 days', '15 days', '/products/immunity-booster-juice.png',
'["Immunity boost", "Vitamin C rich", "Disease prevention"]'::jsonb,
'["Amla & citrus focus", "Ginger shots", "Immunity tracking"]'::jsonb),

('pkg-weight-management', 'Weight Management Plan', 'juice-packages', 'subscription',
'30-day low sugar, fiber-rich juice plan.',
999, 'month', '30 days', '/products/green-detox-juice.png',
'["Weight loss", "Metabolism boost", "Low calorie"]'::jsonb,
'["Low sugar juices", "Fiber rich", "Nutrition guide"]'::jsonb);

-- Fresh Fruit Boxes (3 main products)
INSERT INTO public.products (id, name, category, type, description, long_description, price, unit, duration, image, benefits, benefit_details, features) VALUES

('box-daily', 'Daily Fresh Fruit Box', 'fresh-fruit-boxes', 'subscription',
'A curated box of fresh fruits for individuals. Balanced for daily health needs.',
'Your personal daily fruit supply! Perfectly portioned selection of seasonal fruits.',
2899, 'month', '30 days', '/daily_fruit_box.png',
'["Daily nutrition", "Personal portion", "Variety"]'::jsonb,
'["Balanced mix of vitamins daily", "Portion-controlled for one", "Seasonal variety", "Quality checked"]'::jsonb,
'["Seasonal fruits", "Premium selection", "1-person portion", "Daily delivery"]'::jsonb),

('box-couple', 'Couple Fruit Box', 'fresh-fruit-boxes', 'subscription',
'Double-portion fruit box for couples. Seasonal & premium fruits.',
'Share health with your partner! Double the Daily Box with premium specials.',
4999, 'month', '30 days', '/couple_fruit_box.png',
'["Couple nutrition", "Premium mix", "Freshness"]'::jsonb,
'["Double portions", "Premium fruits rotation", "Smart packaging", "Perfect for couples"]'::jsonb,
'["Double quantity", "Premium mix", "Smart packaging", "Daily delivery"]'::jsonb),

('box-family', 'Family Fruit Box', 'fresh-fruit-boxes', 'subscription',
'Family-sized box for 3-5 members. Large portions with variety.',
'Fuel your whole family! Kid-friendly favorites and adult preferences.',
8999, 'month', '30 days', '/family_fruit_box.png',
'["Family nutrition", "Variety", "Value"]'::jsonb,
'["Sized for 3-5 members", "Kid-friendly included", "Weekly rotation", "Best value"]'::jsonb,
'["3-5 member portions", "Weekly rotation", "Mixed basket", "Daily delivery"]'::jsonb);

-- Sprouts (7 products)
INSERT INTO public.products (id, name, category, type, description, price, unit, image, benefits, features, how_to_consume, best_time) VALUES

('sprout-moong', 'Moong Sprouts', 'sprouts', 'single',
'Fresh green moong sprouts. High protein, easy to digest.',
49, '100g', '/products/moong-sprouts.png',
'["Protein", "Digestion", "Light meal"]'::jsonb,
'["Fresh daily", "Hygienic packaging", "Ready to eat"]'::jsonb,
'Eat raw, add to salads',
'Breakfast or snack'),

('sprout-chana', 'Kala Chana Sprouts', 'sprouts', 'single',
'Black chickpea sprouts for strength and energy.',
59, '100g', '/products/chana-sprouts.png',
'["Strength", "Energy", "Muscle building"]'::jsonb,
'["Fresh daily", "Hygienic packaging", "High fiber"]'::jsonb,
'With lemon and spices',
'Morning or post-workout'),

('sprout-mixed', 'Mixed Lentil Sprouts', 'sprouts', 'single',
'Balanced mix of different lentil sprouts.',
69, '100g', '/products/mixed-sprouts.png',
'["Balanced nutrition", "Variety", "Complete protein"]'::jsonb,
'["Fresh daily", "Multi-lentil mix", "Ready to eat"]'::jsonb,
'In salads or with rice',
'Lunch or dinner'),

('sprout-classic-mix', 'Classic Mixed Sprouts', 'sprouts', 'combo',
'Daily diet support with classic sprout combination.',
79, '150g', '/products/mixed-sprouts.png',
'["Daily diet", "Balanced nutrition", "Easy breakfast"]'::jsonb,
'["Fresh daily", "Hygienic packaging", "Ready to eat"]'::jsonb,
'As breakfast bowl',
'Breakfast'),

('sprout-protein-mix', 'High Protein Sprout Mix', 'sprouts', 'combo',
'Fitness-focused sprout mix for muscle support.',
99, '150g', '/products/chana-sprouts.png',
'["Fitness", "Muscle recovery", "High protein"]'::jsonb,
'["Fresh daily", "30g+ protein", "Gym favorite"]'::jsonb,
'Post-workout',
'Post-workout');

-- Sprout Packages (3 products)
INSERT INTO public.products (id, name, category, type, description, price, unit, duration, image, benefits, features) VALUES

('pkg-sprout-daily', 'Daily Sprout Pack', 'sprout-packages', 'subscription',
'100-150g fresh sprouts delivered daily for a month.',
999, 'month', '30 days', '/products/mixed-sprouts.png',
'["Daily protein", "Convenience", "Fresh quality"]'::jsonb,
'["100-150g daily", "Monthly subscription", "Free delivery"]'::jsonb),

('pkg-sprout-fitness', 'Fitness Sprout Plan', 'sprout-packages', 'subscription',
'High protein sprout mix for fitness enthusiasts.',
1299, 'month', '30 days', '/products/chana-sprouts.png',
'["Muscle building", "Recovery", "Performance"]'::jsonb,
'["High protein mix", "Larger portions", "Fitness focused"]'::jsonb),

('pkg-sprout-family', 'Family Sprout Pack', 'sprout-packages', 'subscription',
'Larger portions for the entire family.',
1799, 'month', '30 days', '/products/mixed-sprouts.png',
'["Family nutrition", "Value pack", "Daily health"]'::jsonb,
'["Family portions", "Mixed variety", "Daily delivery"]'::jsonb);

-- Summary
SELECT 'Inserted ' || COUNT(*) || ' products' as result FROM public.products;
