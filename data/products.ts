// Pureingo Product Catalog
// Pure. Fresh. Everyday.

export type ProductCategory =
    | 'fresh-juices'
    | 'juice-packages'
    | 'fresh-fruit-boxes'
    | 'sprouts'
    | 'sprout-packages'

export interface Product {
    id: string
    name: string
    category: ProductCategory
    type?: 'single' | 'combo' | 'wellness' | 'package' | 'subscription'
    description: string
    longDescription?: string
    benefits: string[]
    benefitDetails?: string[]
    price: number
    unit: string
    image?: string
    features?: string[]
    duration?: string
    nutritionInfo?: string[]
    howToConsume?: string
    bestTime?: string
    inStock?: boolean
}

// ============================================
// FRESH JUICES (Individual Products)
// ============================================

// A. Single Ingredient Juices (10)
export const singleJuices: Product[] = [
    {
        id: "juice-apple",
        name: "Apple Juice",
        category: "fresh-juices",
        type: "single",
        description: "Freshly pressed apple juice with no added sugar. Made from hand-picked apples.",
        longDescription: "Our Apple Juice is cold-pressed from farm-fresh apples every morning. Rich in natural sugars and fiber, it provides sustained energy without the crash. Perfect for starting your day or as a mid-day refresher.",
        benefits: ["Digestion", "Heart health", "Natural energy"],
        benefitDetails: [
            "Supports digestive health with natural pectin fiber",
            "Contains polyphenols that help maintain healthy cholesterol levels",
            "Natural fructose provides quick, clean energy boost",
            "Rich in antioxidants that protect cells from damage"
        ],
        price: 79,
        unit: "glass",
        image: "/products/apple-juice.png",
        features: ["No added sugar", "Fresh daily", "100% natural"],
        nutritionInfo: ["Calories: 95 kcal", "Carbs: 25g", "Fiber: 0.5g", "Vitamin C: 14%"],
        howToConsume: "Best consumed fresh within 2 hours of delivery",
        bestTime: "Morning on empty stomach or mid-afternoon"
    },
    {
        id: "juice-orange",
        name: "Orange Juice",
        category: "fresh-juices",
        type: "single",
        description: "Fresh citrus burst packed with Vitamin C. Perfect morning energizer.",
        longDescription: "Squeeze the goodness of fresh oranges into your daily routine. Our Orange Juice is pressed from ripe, juicy oranges and delivered within hours. A natural immunity booster that tastes like sunshine.",
        benefits: ["Vitamin C", "Immunity boost", "Energy"],
        benefitDetails: [
            "One glass provides 100% of daily Vitamin C requirement",
            "Strengthens immune system with natural antioxidants",
            "Flavonoids support cardiovascular health",
            "Natural citric acid aids iron absorption"
        ],
        price: 69,
        unit: "glass",
        image: "/products/orange-juice.png",
        features: ["No added sugar", "Fresh daily", "Rich in Vitamin C"],
        nutritionInfo: ["Calories: 112 kcal", "Carbs: 26g", "Vitamin C: 124%", "Potassium: 10%"],
        howToConsume: "Drink immediately for maximum vitamin retention",
        bestTime: "With breakfast or after exercise"
    },
    {
        id: "juice-pomegranate",
        name: "Pomegranate Juice",
        category: "fresh-juices",
        type: "single",
        description: "Rich, ruby-red pomegranate juice for heart and blood health.",
        longDescription: "The king of antioxidants! Our Pomegranate Juice is extracted from premium arils, delivering powerful polyphenols that support heart health and boost hemoglobin levels naturally.",
        benefits: ["Hemoglobin boost", "Heart health", "Antioxidants"],
        benefitDetails: [
            "Increases hemoglobin levels naturally - ideal for anemia",
            "Punicalagins are powerful antioxidants, 3x more potent than green tea",
            "Supports healthy blood pressure and circulation",
            "Anti-inflammatory properties reduce joint pain"
        ],
        price: 99,
        unit: "glass",
        image: "/products/pomegranate-juice.png",
        features: ["No added sugar", "Fresh daily", "Blood purifier"],
        nutritionInfo: ["Calories: 134 kcal", "Carbs: 33g", "Iron: 3%", "Vitamin K: 26%"],
        howToConsume: "Can be consumed directly or mixed with water",
        bestTime: "Morning or evening, avoid with meals"
    },
    {
        id: "juice-mosambi",
        name: "Mosambi Juice",
        category: "fresh-juices",
        type: "single",
        description: "Sweet lime juice that hydrates and refreshes. Light on stomach.",
        longDescription: "Mosambi (Sweet Lime) is India's favorite refreshing juice. Light, easy to digest, and incredibly hydrating. Perfect for those with sensitive stomachs or during recovery from illness.",
        benefits: ["Hydration", "Immunity", "Gentle digestion"],
        benefitDetails: [
            "Excellent source of hydration with natural electrolytes",
            "Gentle on stomach - recommended during fever and illness",
            "Boosts immunity with Vitamin C content",
            "Alkalizing effect helps balance body pH"
        ],
        price: 59,
        unit: "glass",
        image: "/products/citrus-boost-juice.png",
        features: ["No added sugar", "Fresh daily", "Light & refreshing"],
        nutritionInfo: ["Calories: 45 kcal", "Carbs: 11g", "Vitamin C: 50%", "Potassium: 5%"],
        howToConsume: "Best served chilled, can add rock salt",
        bestTime: "Anytime, especially during hot weather"
    },
    {
        id: "juice-watermelon",
        name: "Watermelon Juice",
        category: "fresh-juices",
        type: "single",
        description: "Refreshing summer favorite. Natural hydration with every sip.",
        longDescription: "Beat the heat with our fresh Watermelon Juice. Made from sweet, ripe watermelons, this juice is over 90% water - nature's perfect hydrator. Low in calories, high in refreshment!",
        benefits: ["Cooling", "Hydration", "Low calorie"],
        benefitDetails: [
            "92% water content - superior natural hydration",
            "Lycopene content supports heart health",
            "Citrulline amino acid aids muscle recovery",
            "Low calorie - only 30 cal per 100ml"
        ],
        price: 59,
        unit: "glass",
        image: "/products/watermelon-juice.png",
        features: ["No added sugar", "Fresh daily", "Summer special"],
        nutritionInfo: ["Calories: 30 kcal", "Carbs: 8g", "Vitamin A: 11%", "Vitamin C: 13%"],
        howToConsume: "Serve chilled for best taste",
        bestTime: "Afternoon, post-workout, or during hot weather"
    },
    {
        id: "juice-papaya",
        name: "Papaya Juice",
        category: "fresh-juices",
        type: "single",
        description: "Smooth papaya juice for gut health and digestion.",
        longDescription: "Papaya is called the 'fruit of angels' for good reason. Our Papaya Juice contains papain enzyme that aids protein digestion and promotes gut health. A natural solution for digestive issues.",
        benefits: ["Digestion", "Gut health", "Skin glow"],
        benefitDetails: [
            "Papain enzyme breaks down proteins for easier digestion",
            "Rich in fiber to promote healthy bowel movements",
            "Beta-carotene improves skin health and glow",
            "Anti-inflammatory properties soothe the digestive tract"
        ],
        price: 69,
        unit: "glass",
        image: "/products/mango-juice.png",
        features: ["No added sugar", "Fresh daily", "Enzyme rich"],
        nutritionInfo: ["Calories: 43 kcal", "Carbs: 11g", "Vitamin A: 31%", "Vitamin C: 103%"],
        howToConsume: "Best on empty stomach for digestive benefits",
        bestTime: "Morning before breakfast"
    },
    {
        id: "juice-beetroot",
        name: "Beetroot Juice",
        category: "fresh-juices",
        type: "single",
        description: "Deep red beetroot juice for blood purification and stamina.",
        longDescription: "Athletes' secret weapon! Beetroot juice is scientifically proven to improve stamina and blood flow. Rich in iron and nitrates, it naturally boosts hemoglobin and enhances exercise performance.",
        benefits: ["Blood purification", "Stamina", "Iron boost"],
        benefitDetails: [
            "Dietary nitrates convert to nitric oxide, improving blood flow",
            "Studies show 16% improvement in exercise endurance",
            "High iron content increases hemoglobin naturally",
            "Betaine supports liver function and detoxification"
        ],
        price: 79,
        unit: "glass",
        image: "/products/beetroot-juice.png",
        features: ["No added sugar", "Fresh daily", "Athletic favorite"],
        nutritionInfo: ["Calories: 58 kcal", "Carbs: 13g", "Iron: 4%", "Folate: 20%"],
        howToConsume: "Drink 2-3 hours before exercise for performance",
        bestTime: "Morning or pre-workout"
    },
    {
        id: "juice-carrot",
        name: "Carrot Juice",
        category: "fresh-juices",
        type: "single",
        description: "Golden carrot juice for eye health and glowing skin.",
        longDescription: "See the world clearly with our fresh Carrot Juice! Packed with beta-carotene that converts to Vitamin A, it supports eye health, improves skin radiance, and boosts immunity naturally.",
        benefits: ["Eye health", "Skin glow", "Beta-carotene"],
        benefitDetails: [
            "Rich in beta-carotene - essential for eye health and night vision",
            "Promotes healthy, glowing skin from within",
            "Antioxidants protect against cellular damage",
            "Vitamin A strengthens immune system"
        ],
        price: 59,
        unit: "glass",
        image: "/products/carrot-juice.png",
        features: ["No added sugar", "Fresh daily", "Vitamin A rich"],
        nutritionInfo: ["Calories: 40 kcal", "Carbs: 9g", "Vitamin A: 428%", "Vitamin K: 18%"],
        howToConsume: "Add a few drops of oil for better absorption",
        bestTime: "Morning with breakfast"
    },
    {
        id: "juice-tomato",
        name: "Tomato Juice",
        category: "fresh-juices",
        type: "single",
        description: "Tangy tomato juice with powerful antioxidants.",
        longDescription: "The humble tomato packs a powerful punch! Our Tomato Juice is rich in lycopene - one of nature's most potent antioxidants. Low in calories, high in taste, and great for skin health.",
        benefits: ["Antioxidant", "Skin health", "Low calorie"],
        benefitDetails: [
            "Lycopene is a powerful antioxidant that protects skin from UV damage",
            "Supports prostate health in men",
            "Very low in calories - ideal for weight management",
            "Vitamin C and E promote collagen production"
        ],
        price: 49,
        unit: "glass",
        image: "/products/energy-punch-juice.png",
        features: ["No added sugar", "Fresh daily", "Lycopene rich"],
        nutritionInfo: ["Calories: 22 kcal", "Carbs: 5g", "Vitamin A: 10%", "Vitamin C: 45%"],
        howToConsume: "Can add black pepper for enhanced absorption",
        bestTime: "With lunch or as evening snack"
    },
    {
        id: "juice-guava",
        name: "Guava Juice",
        category: "fresh-juices",
        type: "single",
        description: "Tropical guava juice packed with Vitamin C and fiber.",
        longDescription: "Guava contains 4x more Vitamin C than oranges! Our Guava Juice is a tropical immunity powerhouse that also supports digestive health with its natural fiber content.",
        benefits: ["Vitamin C", "Gut health", "Immunity"],
        benefitDetails: [
            "Contains 4 times more Vitamin C than oranges",
            "High fiber content promotes healthy digestion",
            "Low glycemic index - suitable for diabetics in moderation",
            "Potassium helps regulate blood pressure"
        ],
        price: 69,
        unit: "glass",
        image: "/products/tropical-punch-juice.png",
        features: ["No added sugar", "Fresh daily", "Fiber rich"],
        nutritionInfo: ["Calories: 68 kcal", "Carbs: 14g", "Vitamin C: 380%", "Fiber: 9g"],
        howToConsume: "Drink fresh, seeds can be included for extra fiber",
        bestTime: "Morning or as afternoon snack"
    },
]

// B. Combo / Functional Juices (8)
export const comboJuices: Product[] = [
    {
        id: "juice-apple-beetroot",
        name: "Apple + Beetroot",
        category: "fresh-juices",
        type: "combo",
        description: "Perfect heart health combo. Sweet apple balances earthy beetroot.",
        longDescription: "The ultimate cardiovascular duo! Apple sweetness masks the earthiness of beetroot while combining their heart-healthy benefits. Athletes love this for stamina; health enthusiasts love it for blood pressure support.",
        benefits: ["Heart health", "Detox", "Energy boost"],
        benefitDetails: [
            "Beetroot nitrates + apple polyphenols = cardiovascular powerhouse",
            "Natural liver detoxification support",
            "Sustained energy without caffeine",
            "Iron + Vitamin C combo for better absorption"
        ],
        price: 99,
        unit: "glass",
        image: "/products/energy-punch-juice.png",
        features: ["No added sugar", "Fresh daily", "Power combo"],
        bestTime: "Morning or 2-3 hours before exercise"
    },
    {
        id: "juice-carrot-beetroot",
        name: "Carrot + Beetroot",
        category: "fresh-juices",
        type: "combo",
        description: "The ultimate blood boost drink for stamina and strength.",
        longDescription: "Called 'ABC' juice in wellness circles, this combination is famous for increasing hemoglobin naturally. The vibrant red color isn't just beautiful - it signals the blood-building nutrients within.",
        benefits: ["Energy", "Blood boost", "Athletic performance"],
        benefitDetails: [
            "Dramatically increases hemoglobin levels over regular consumption",
            "Improves oxygen delivery to muscles",
            "Natural nitrates enhance exercise performance",
            "Beta-carotene + betalains provide double antioxidant protection"
        ],
        price: 89,
        unit: "glass",
        image: "/products/abc-juice.png",
        features: ["No added sugar", "Fresh daily", "Athlete's choice"],
        bestTime: "Morning on empty stomach"
    },
    {
        id: "juice-ginger-lemon",
        name: "Ginger + Lemon",
        category: "fresh-juices",
        type: "combo",
        description: "Spicy ginger meets tangy lemon. Perfect for digestion and metabolism.",
        longDescription: "The metabolism boosting shot! Fresh ginger's thermogenic properties combined with lemon's detoxifying effect make this the perfect drink for weight management and digestive health.",
        benefits: ["Digestion", "Fat burn", "Metabolism boost"],
        benefitDetails: [
            "Gingerol increases metabolic rate by up to 5%",
            "Aids digestion by stimulating digestive enzymes",
            "Lemon's citric acid supports fat breakdown",
            "Anti-nausea properties - great for morning sickness"
        ],
        price: 79,
        unit: "glass",
        image: "/products/immunity-booster-juice.png",
        features: ["No added sugar", "Fresh daily", "Weight management"],
        bestTime: "Morning before breakfast or after meals"
    },
    {
        id: "juice-lemon-mint",
        name: "Lemon + Mint",
        category: "fresh-juices",
        type: "combo",
        description: "Refreshing detox drink with cooling mint and zesty lemon.",
        longDescription: "The classic refresher with benefits! This cooling combination is perfect for hot days, post-meals, or whenever you need a natural pick-me-up. Mint soothes while lemon cleanses.",
        benefits: ["Detox", "Refreshing", "Digestion"],
        benefitDetails: [
            "Mint menthol relaxes digestive muscles",
            "Lemon supports liver's natural detox process",
            "Natural breath freshener",
            "Cooling effect reduces body heat"
        ],
        price: 69,
        unit: "glass",
        image: "/products/citrus-boost-juice.png",
        features: ["No added sugar", "Fresh daily", "Cooling effect"],
        bestTime: "After meals or during hot afternoons"
    },
    {
        id: "juice-pineapple-ginger",
        name: "Pineapple + Ginger",
        category: "fresh-juices",
        type: "combo",
        description: "Tropical pineapple with warming ginger for immunity.",
        longDescription: "Sweet meets spicy in this immunity-boosting combination! Bromelain from pineapple reduces inflammation while ginger fights infections. A tropical vacation for your immune system.",
        benefits: ["Immunity", "Digestion", "Anti-inflammatory"],
        benefitDetails: [
            "Bromelain enzyme is a powerful natural anti-inflammatory",
            "Ginger compounds fight bacterial and viral infections",
            "Aids protein digestion",
            "Vitamin C from pineapple boosts white blood cell production"
        ],
        price: 89,
        unit: "glass",
        image: "/products/pineapple-juice.png",
        features: ["No added sugar", "Fresh daily", "Immunity booster"],
        bestTime: "Morning or when feeling under the weather"
    },
    {
        id: "juice-papaya-lemon",
        name: "Papaya + Lemon",
        category: "fresh-juices",
        type: "combo",
        description: "Gentle gut cleanser with papaya enzymes and lemon zing.",
        longDescription: "Nature's digestive reset! Papaya's papain enzyme combined with lemon's cleansing properties creates a gentle yet effective gut health drink. Perfect for those with digestive issues.",
        benefits: ["Gut cleansing", "Digestion", "Enzyme rich"],
        benefitDetails: [
            "Papain enzyme breaks down proteins for easy digestion",
            "Lemon's citric acid stimulates digestive juices",
            "Gentle cleansing action without harsh laxative effects",
            "Reduces bloating and gas"
        ],
        price: 79,
        unit: "glass",
        image: "/products/mango-juice.png",
        features: ["No added sugar", "Fresh daily", "Gut friendly"],
        bestTime: "Morning on empty stomach"
    },
    {
        id: "juice-cucumber-mint",
        name: "Cucumber + Mint",
        category: "fresh-juices",
        type: "combo",
        description: "Ultra-cooling summer drink for hydration and digestion.",
        longDescription: "The ultimate cooler! Cucumber's high water content combined with mint's cooling menthol creates the perfect beverage for hot weather. Extremely low calorie and incredibly refreshing.",
        benefits: ["Cooling", "Digestion", "Hydration"],
        benefitDetails: [
            "96% water content for superior hydration",
            "Only 16 calories per glass - perfect for weight loss",
            "Mint aids digestion and reduces bloating",
            "Silica in cucumber promotes healthy skin and hair"
        ],
        price: 59,
        unit: "glass",
        image: "/products/cucumber-juice.png",
        features: ["No added sugar", "Fresh daily", "Summer coolant"],
        bestTime: "Afternoon or with meals"
    },
    {
        id: "juice-watermelon-mint",
        name: "Watermelon + Mint",
        category: "fresh-juices",
        type: "combo",
        description: "Perfect summer hydration with refreshing mint twist.",
        longDescription: "Summer in a glass! Sweet watermelon meets cool mint in this ultimate hydration drink. Perfect post-workout, at the beach, or whenever you need to beat the heat naturally.",
        benefits: ["Summer hydration", "Cooling", "Refreshing"],
        benefitDetails: [
            "Natural electrolytes for optimal hydration",
            "L-citrulline aids muscle recovery post-exercise",
            "Mint provides instant cooling sensation",
            "Low sugar, high satisfaction"
        ],
        price: 69,
        unit: "glass",
        image: "/products/watermelon-juice.png",
        features: ["No added sugar", "Fresh daily", "Beach favorite"],
        bestTime: "Afternoon or post-workout"
    },
]

// C. Wellness / Superfood Juices (6)
export const wellnessJuices: Product[] = [
    {
        id: "juice-amla",
        name: "Amla Juice",
        category: "fresh-juices",
        type: "wellness",
        description: "Indian gooseberry juice - the Vitamin C powerhouse.",
        longDescription: "Ancient Ayurvedic superfood now in fresh juice form! Amla contains 20x more Vitamin C than oranges and has been used for centuries to boost immunity, improve hair health, and slow aging.",
        benefits: ["Vitamin C", "Immunity", "Hair health"],
        benefitDetails: [
            "Contains 20 times more Vitamin C than oranges",
            "Ayurvedic superfood for immune system",
            "Promotes thick, strong hair growth",
            "Powerful anti-aging antioxidants"
        ],
        price: 99,
        unit: "glass",
        image: "/products/amla-juice.png",
        features: ["No added sugar", "Fresh daily", "Ayurvedic superfood"],
        bestTime: "Morning on empty stomach"
    },
    {
        id: "juice-amla-ginger",
        name: "Amla + Ginger",
        category: "fresh-juices",
        type: "wellness",
        description: "Metabolism boosting combo for weight management.",
        longDescription: "The weight management power couple! Amla's fat-burning properties combined with ginger's metabolism boost create a potent drink for those on a fitness journey.",
        benefits: ["Metabolism boost", "Fat burn", "Immunity"],
        benefitDetails: [
            "Ginger increases thermogenesis (calorie burning)",
            "Amla prevents fat accumulation in liver",
            "Combined immune-boosting power",
            "Balances blood sugar levels"
        ],
        price: 109,
        unit: "glass",
        image: "/products/immunity-booster-juice.png",
        features: ["No added sugar", "Fresh daily", "Weight management"],
        bestTime: "Morning before breakfast"
    },
    {
        id: "juice-aloe-vera",
        name: "Aloe Vera Juice",
        category: "fresh-juices",
        type: "wellness",
        description: "Cooling aloe vera for skin glow and gut health.",
        longDescription: "Beauty from within! Fresh aloe vera gel is known worldwide for skin benefits, but drinking it provides even more - gut healing, liver support, and natural hydration for radiant skin.",
        benefits: ["Skin glow", "Gut health", "Cooling"],
        benefitDetails: [
            "Promotes collagen production for youthful skin",
            "Soothes digestive tract and heals gut lining",
            "Natural moisturizer from inside out",
            "Supports liver detoxification"
        ],
        price: 89,
        unit: "glass",
        image: "/products/skin-glow-juice.png",
        features: ["No added sugar", "Fresh daily", "Beauty drink"],
        bestTime: "Morning or evening"
    },
    {
        id: "juice-wheatgrass",
        name: "Wheatgrass Juice",
        category: "fresh-juices",
        type: "wellness",
        description: "Nature's detoxifier. Powerful chlorophyll boost.",
        longDescription: "The ultimate detox shot! Wheatgrass is 70% chlorophyll - called 'liquid sunshine'. It oxygenates blood, removes toxins, and provides more nutrients per gram than any other vegetable.",
        benefits: ["Detox", "Immunity", "Blood cleanser"],
        benefitDetails: [
            "Chlorophyll purifies blood and increases oxygen levels",
            "Contains 70% chlorophyll - nature's detoxifier",
            "17 amino acids including all essential ones",
            "Enzymes aid digestion and nutrient absorption"
        ],
        price: 119,
        unit: "glass",
        image: "/products/green-detox-juice.png",
        features: ["No added sugar", "Fresh daily", "Detox special"],
        bestTime: "Morning on empty stomach (30ml shot)"
    },
    {
        id: "juice-coconut-water-mix",
        name: "Coconut Water Mix",
        category: "fresh-juices",
        type: "wellness",
        description: "Natural electrolyte drink with tender coconut water.",
        longDescription: "Nature's sports drink! Fresh tender coconut water is a perfect isotonic beverage - the electrolyte balance matches blood plasma. Superior to any commercial sports drink, completely natural.",
        benefits: ["Hydration", "Electrolytes", "Natural energy"],
        benefitDetails: [
            "Perfect electrolyte balance similar to blood plasma",
            "Natural potassium replenishes muscle function",
            "Cytokinins have anti-aging properties",
            "Better than artificial sports drinks"
        ],
        price: 79,
        unit: "glass",
        image: "/products/cucumber-juice.png",
        features: ["No added sugar", "Fresh daily", "Sports drink"],
        bestTime: "Post-workout or during hot weather"
    },
    {
        id: "juice-seasonal-special",
        name: "Seasonal Special",
        category: "fresh-juices",
        type: "wellness",
        description: "Rotating wellness drink based on seasonal ingredients.",
        longDescription: "Experience seasonal wellness! Each month, we craft a special juice using the freshest seasonal ingredients. From mango in summer to amla in winter - nature knows best.",
        benefits: ["Seasonal wellness", "Immunity", "Fresh variety"],
        benefitDetails: [
            "Seasonal ingredients are at peak nutrition",
            "Variety ensures broad spectrum of nutrients",
            "Aligned with Ayurvedic seasonal eating principles",
            "New exciting flavors each month"
        ],
        price: 89,
        unit: "glass",
        image: "/products/tropical-punch-juice.png",
        features: ["No added sugar", "Fresh daily", "Limited edition"],
        bestTime: "As recommended for the season"
    },
]

// ============================================
// JUICE PACKAGES (Subscription)
// ============================================

export const juicePackages: Product[] = [
    {
        id: "pkg-daily-juice",
        name: "Daily Juice Plan",
        category: "juice-packages",
        type: "subscription",
        description: "1 fresh juice delivered every day for 30 days. Mix of single & combo juices.",
        longDescription: "Make fresh juice a daily habit! Our most popular subscription includes a rotating variety of our best single and combo juices. Perfect for building a sustainable health routine.",
        benefits: ["Daily nutrition", "Variety", "Convenience"],
        benefitDetails: [
            "Daily dose of vitamins and antioxidants",
            "Rotating menu prevents taste fatigue",
            "Delivered fresh to your door every morning",
            "Flexible - pause or modify anytime"
        ],
        price: 1099,
        unit: "month",
        duration: "30 days",
        image: "/products/tropical-punch-juice.png",
        features: ["1 juice/day", "30 day supply", "Free delivery", "Flexible pause"],
    },
    {
        id: "pkg-detox-7day",
        name: "7-Day Detox Plan",
        category: "juice-packages",
        type: "subscription",
        description: "Curated detox juice cleanse for a week. Reset your system.",
        longDescription: "Give your body a reset! This carefully designed 7-day program features detox-focused juices like wheatgrass, cucumber-mint, and lemon-ginger to cleanse your system naturally.",
        benefits: ["Body detox", "Weight management", "Skin glow"],
        benefitDetails: [
            "Structured cleanse program with daily guidance",
            "Typical results: 2-3 kg water weight reduction",
            "Clearer skin visible by day 5",
            "Includes diet guide for enhanced results"
        ],
        price: 599,
        unit: "week",
        duration: "7 days",
        image: "/products/green-detox-juice.png",
        features: ["Curated detox juices", "Daily delivery", "Diet guide included"],
    },
    {
        id: "pkg-immunity-boost",
        name: "Immunity Boost Plan",
        category: "juice-packages",
        type: "subscription",
        description: "15-day immunity program with Amla, citrus & ginger juices.",
        longDescription: "Fortify your immune system! This 15-day intensive features amla shots, citrus blends, and ginger combinations designed to strengthen your body's natural defenses.",
        benefits: ["Immunity boost", "Vitamin C rich", "Disease prevention"],
        benefitDetails: [
            "Focus on Vitamin C rich juices",
            "Amla shots for concentrated immunity",
            "Ginger & turmeric for anti-inflammatory benefits",
            "Noticeable energy improvement by day 7"
        ],
        price: 799,
        unit: "15 days",
        duration: "15 days",
        image: "/products/immunity-booster-juice.png",
        features: ["Amla & citrus focus", "Ginger shots", "Immunity tracking"],
    },
    {
        id: "pkg-weight-management",
        name: "Weight Management Plan",
        category: "juice-packages",
        type: "subscription",
        description: "30-day low sugar, fiber-rich juice plan for healthy weight loss.",
        longDescription: "Support your weight loss journey naturally! This 30-day plan features metabolism-boosting juices low in sugar and high in fiber. Paired with our nutrition guide for best results.",
        benefits: ["Weight loss", "Metabolism boost", "Low calorie"],
        benefitDetails: [
            "Average 50% fewer calories than regular juices",
            "Metabolism-boosting ginger and amla combinations",
            "High fiber options to increase satiety",
            "Nutrition guide and meal planning support"
        ],
        price: 999,
        unit: "month",
        duration: "30 days",
        image: "/products/green-detox-juice.png",
        features: ["Low sugar juices", "Fiber rich", "Nutrition guide"],
    },
]

// ============================================
// FRESH FRUIT BOXES (Subscription Only)
// ============================================

export const fruitBoxes: Product[] = [
    {
        id: "box-daily",
        name: "Daily Fresh Fruit Box",
        category: "fresh-fruit-boxes",
        type: "subscription",
        description: "A curated box of 100% fresh, hand-picked fruits for individuals. Balanced for taste, nutrition, and daily health needs.",
        longDescription: "Your personal daily fruit supply! Each day, receive a perfectly portioned selection of seasonal fruits chosen for balanced nutrition. We rotate varieties to ensure you get diverse vitamins and minerals throughout the month.",
        benefits: ["Daily nutrition", "Personal portion", "Variety"],
        benefitDetails: [
            "Balanced mix of vitamins, minerals, and fiber daily",
            "Portion-controlled for one person's daily needs",
            "Seasonal variety for diverse nutrition",
            "Quality checked and hand-picked each morning"
        ],
        price: 2899,
        unit: "month",
        duration: "30 days",
        features: ["Seasonal fruits", "Premium selection", "1-person portion", "Daily delivery"],
        image: "/daily_fruit_box.png",
    },
    {
        id: "box-couple",
        name: "Couple Fruit Box",
        category: "fresh-fruit-boxes",
        type: "subscription",
        description: "Double-portion fruit box designed for couples. Seasonal & premium fruits with smart packaging.",
        longDescription: "Share health with your partner! This double-portion box provides enough fruits for two people daily. Mix of everyday favorites and premium seasonal specials to enjoy together.",
        benefits: ["Couple nutrition", "Premium mix", "Freshness"],
        benefitDetails: [
            "Exactly double the portions of Daily Box",
            "Premium fruits rotation (alphonso mango, imported berries, etc.)",
            "Smart packaging keeps fruits fresh longer",
            "Perfect for couples building healthy habits together"
        ],
        price: 4999,
        unit: "month",
        duration: "30 days",
        features: ["Double quantity", "Seasonal & premium mix", "Smart packaging", "Daily delivery"],
        image: "/couple_fruit_box.png",
    },
    {
        id: "box-family",
        name: "Family Fruit Box",
        category: "fresh-fruit-boxes",
        type: "subscription",
        description: "Family-sized fruit box for 3-5 members. Large portions with diverse fruit mix.",
        longDescription: "Fuel your whole family! This large box includes kid-friendly favorites and adult preferences. Weekly variety rotation means nobody gets bored, and every family member gets their vitamins.",
        benefits: ["Family nutrition", "Variety", "Value"],
        benefitDetails: [
            "Sized for family of 3-5 members",
            "Kid-friendly fruits included (bananas, apples, grapes)",
            "Weekly rotation ensures variety",
            "Best value per person"
        ],
        price: 8999,
        unit: "month",
        duration: "30 days",
        features: ["3-5 member portions", "Weekly rotation", "Mixed basket", "Daily delivery"],
        image: "/family_fruit_box.png",
    },
]

// ============================================
// FRESH SPROUTS
// ============================================

// A. Single Sprout Products (4)
export const singleSprouts: Product[] = [
    {
        id: "sprout-moong",
        name: "Moong Sprouts",
        category: "sprouts",
        type: "single",
        description: "Fresh green moong sprouts. High protein, easy to digest.",
        longDescription: "The classic Indian sprout! Moong dal sprouts are incredibly versatile - add to salads, stir-fry, or eat as-is. Easy to digest yet packed with plant protein and B-vitamins.",
        benefits: ["Protein", "Digestion", "Light meal"],
        benefitDetails: [
            "Contains 24g protein per 100g",
            "Sprouting increases digestibility by 60%",
            "Rich in B-vitamins essential for energy",
            "Low calorie, high satiety"
        ],
        price: 49,
        unit: "100g",
        image: "/products/moong-sprouts.png",
        features: ["Fresh daily", "Hygienic packaging", "Ready to eat"],
        howToConsume: "Eat raw, add to salads, or lightly stir-fry",
        bestTime: "Breakfast or as a snack"
    },
    {
        id: "sprout-kala-chana",
        name: "Kala Chana Sprouts",
        category: "sprouts",
        type: "single",
        description: "Black chickpea sprouts for strength and energy.",
        longDescription: "Power food for the active! Kala Chana (black chickpea) sprouts are favored by athletes and fitness enthusiasts for their high protein and complex carb content that provides sustained energy.",
        benefits: ["Strength", "Energy", "Muscle building"],
        benefitDetails: [
            "Complete protein with all essential amino acids",
            "Complex carbs provide sustained energy",
            "High iron content - ideal for vegetarians",
            "Traditionally used for strength building in India"
        ],
        price: 59,
        unit: "100g",
        image: "/products/chana-sprouts.png",
        features: ["Fresh daily", "Hygienic packaging", "High fiber"],
        howToConsume: "Best enjoyed with a squeeze of lemon and spices",
        bestTime: "Morning or post-workout"
    },
    {
        id: "sprout-mixed-lentil",
        name: "Mixed Lentil Sprouts",
        category: "sprouts",
        type: "single",
        description: "Balanced mix of different lentil sprouts for complete nutrition.",
        longDescription: "Why choose one when you can have them all? Our mixed lentil sprouts combine moong, chana, masoor, and moth beans for a complete amino acid profile and diverse nutrition.",
        benefits: ["Balanced nutrition", "Variety", "Complete protein"],
        benefitDetails: [
            "Complete amino acid profile from diverse lentils",
            "Each lentil contributes unique micronutrients",
            "More interesting texture and flavor",
            "Maximum nutritional diversity in one serving"
        ],
        price: 69,
        unit: "100g",
        image: "/products/mixed-sprouts.png",
        features: ["Fresh daily", "Hygienic packaging", "Multi-lentil mix"],
        howToConsume: "Great in salads, chaats, or with rice",
        bestTime: "Lunch or dinner"
    },
    {
        id: "sprout-peanut",
        name: "Peanut Sprouts",
        category: "sprouts",
        type: "single",
        description: "Nutrient-rich peanut sprouts for natural energy.",
        longDescription: "Unique and powerful! Peanut sprouts contain resveratrol (the compound in red wine) and healthy fats. Sprouting makes peanuts more digestible while enhancing their nutritional profile.",
        benefits: ["Natural energy", "Healthy fats", "Protein"],
        benefitDetails: [
            "Resveratrol content increases 100x during sprouting",
            "Healthy monounsaturated fats for heart health",
            "High in Vitamin E for skin health",
            "Sustained energy from protein + fats combo"
        ],
        price: 79,
        unit: "100g",
        image: "/products/moong-sprouts.png",
        features: ["Fresh daily", "Hygienic packaging", "Energy booster"],
        howToConsume: "Eat as snack or add to salads",
        bestTime: "Mid-morning or afternoon snack"
    },
]

// B. Sprout Mixes (3)
export const sproutMixes: Product[] = [
    {
        id: "sprout-classic-mix",
        name: "Classic Mixed Sprouts",
        category: "sprouts",
        type: "combo",
        description: "Daily diet support with our classic sprout combination.",
        longDescription: "A daily health habit made easy! This balanced mix is designed for everyday consumption - not too heavy, perfectly nutritious. The sprouts your body needs for consistent wellness.",
        benefits: ["Daily diet support", "Balanced nutrition", "Easy breakfast"],
        benefitDetails: [
            "Balanced ratio of different sprouts for daily nutrition",
            "Easy to incorporate into any meal",
            "Light enough for daily consumption",
            "Foundation of a healthy lifestyle"
        ],
        price: 79,
        unit: "150g",
        image: "/products/mixed-sprouts.png",
        features: ["Fresh daily", "Hygienic packaging", "Ready to eat"],
        howToConsume: "As breakfast bowl with chutney or in salads",
        bestTime: "Breakfast or lunch"
    },
    {
        id: "sprout-protein-mix",
        name: "High Protein Sprout Mix",
        category: "sprouts",
        type: "combo",
        description: "Fitness-focused sprout mix for muscle support and recovery.",
        longDescription: "For serious fitness goals! This mix prioritizes the highest-protein sprouts - kala chana, peanut, and horse gram. Perfect post-workout meal for muscle recovery and growth.",
        benefits: ["Fitness support", "Muscle recovery", "High protein"],
        benefitDetails: [
            "30g+ protein per serving",
            "Complete amino acid profile for muscle synthesis",
            "Natural alternative to protein powders",
            "BCAA content supports muscle recovery"
        ],
        price: 99,
        unit: "150g",
        image: "/products/chana-sprouts.png",
        features: ["Fresh daily", "Hygienic packaging", "Gym favorite"],
        howToConsume: "Within 30 minutes post-workout",
        bestTime: "Post-workout or morning"
    },
    {
        id: "sprout-diabetic-mix",
        name: "Diabetic-Friendly Sprout Mix",
        category: "sprouts",
        type: "combo",
        description: "Low glycemic sprout mix for blood sugar management.",
        longDescription: "Specially crafted for blood sugar control! This mix features sprouts with the lowest glycemic index - green moong, fenugreek, and horsegram. Slow-digesting carbs prevent sugar spikes.",
        benefits: ["Blood sugar management", "Low GI", "Fiber rich"],
        benefitDetails: [
            "Glycemic index under 30",
            "Fiber slows down sugar absorption",
            "Fenugreek has proven blood sugar lowering properties",
            "Safe for daily consumption for diabetics"
        ],
        price: 89,
        unit: "150g",
        image: "/products/moong-sprouts.png",
        features: ["Fresh daily", "Hygienic packaging", "Diabetic safe"],
        howToConsume: "As part of main meal to manage blood sugar",
        bestTime: "With lunch or dinner"
    },
]

// ============================================
// SPROUT PACKAGES (Subscription)
// ============================================

export const sproutPackages: Product[] = [
    {
        id: "pkg-sprout-daily",
        name: "Daily Sprout Pack",
        category: "sprout-packages",
        type: "subscription",
        description: "100-150g fresh sprouts delivered daily for a month.",
        longDescription: "Make sprouts a daily habit! Fresh sprouts delivered to your doorstep every morning. Mix of classic and specialty sprouts throughout the month for nutritional variety.",
        benefits: ["Daily protein", "Convenience", "Fresh quality"],
        benefitDetails: [
            "Fresh batch prepared and delivered daily",
            "Rotating varieties for nutritional completeness",
            "Perfect portion for one person",
            "Most convenient way to eat sprouts daily"
        ],
        price: 999,
        unit: "month",
        duration: "30 days",
        image: "/products/mixed-sprouts.png",
        features: ["100-150g daily", "Monthly subscription", "Free delivery"],
    },
    {
        id: "pkg-sprout-fitness",
        name: "Fitness Sprout Plan",
        category: "sprout-packages",
        type: "subscription",
        description: "High protein sprout mix for fitness enthusiasts.",
        longDescription: "Fuel your fitness naturally! Higher portions of protein-focused sprouts designed for athletes and gym-goers. Natural protein source that's easier to absorb than supplements.",
        benefits: ["Muscle building", "Recovery", "Athletic performance"],
        benefitDetails: [
            "200g daily - larger fitness-focused portions",
            "Emphasis on high-protein sprout varieties",
            "Natural BCAAs for muscle recovery",
            "Designed with nutritionists for athletes"
        ],
        price: 1299,
        unit: "month",
        duration: "30 days",
        image: "/products/chana-sprouts.png",
        features: ["High protein mix", "Larger portions", "Fitness focused"],
    },
    {
        id: "pkg-sprout-family",
        name: "Family Sprout Pack",
        category: "sprout-packages",
        type: "subscription",
        description: "Larger portions for the entire family's daily sprout needs.",
        longDescription: "Healthy family, happy family! Enough sprouts for the whole family to enjoy daily. Mix of mild and flavorful options to suit both adult and children's palates.",
        benefits: ["Family nutrition", "Value pack", "Daily health"],
        benefitDetails: [
            "300g+ daily for family of 4",
            "Mix of mild and flavorful varieties",
            "Kid-friendly options included",
            "Best value per person"
        ],
        price: 1799,
        unit: "month",
        duration: "30 days",
        image: "/products/mixed-sprouts.png",
        features: ["Family portions", "Mixed variety", "Daily delivery"],
    },
]

// ============================================
// COMBINED EXPORTS
// ============================================

export const allJuices = [...singleJuices, ...comboJuices, ...wellnessJuices]
export const allSprouts = [...singleSprouts, ...sproutMixes]

export const allProducts: Product[] = [
    ...allJuices,
    ...juicePackages,
    ...fruitBoxes,
    ...allSprouts,
    ...sproutPackages,
]

// Main products are Fruit Boxes, others are Add-ons
export const mainProducts = fruitBoxes
export const addonCategories = [
    { id: 'fresh-juices', name: 'Fresh Juices', count: allJuices.length, isAddon: true },
    { id: 'juice-packages', name: 'Juice Packages', count: juicePackages.length, isAddon: true },
    { id: 'sprouts', name: 'Sprouts', count: allSprouts.length, isAddon: true },
    { id: 'sprout-packages', name: 'Sprout Packages', count: sproutPackages.length, isAddon: true },
]

export const categories = [
    { id: 'fresh-fruit-boxes', name: 'Fresh Fruit Boxes', count: fruitBoxes.length, isMain: true },
    { id: 'fresh-juices', name: 'Fresh Juices', count: allJuices.length, isAddon: true },
    { id: 'juice-packages', name: 'Juice Packages', count: juicePackages.length, isAddon: true },
    { id: 'sprouts', name: 'Sprouts', count: allSprouts.length, isAddon: true },
    { id: 'sprout-packages', name: 'Sprout Packages', count: sproutPackages.length, isAddon: true },
]

export function getProductsByCategory(category: ProductCategory): Product[] {
    return allProducts.filter(p => p.category === category)
}

export function getProductById(id: string): Product | undefined {
    return allProducts.find(p => p.id === id)
}
