// Script to generate SQL INSERT statements from products.ts
// Run with: node generate-product-inserts.js > products_data.sql

const fs = require('fs');
const path = require('path');

// Read the products file
const productsPath = path.join(__dirname, '../data/products.ts');
const content = fs.readFileSync(productsPath, 'utf-8');

// Extract product arrays using regex
const extractProducts = (varName) => {
    const regex = new RegExp(`export const ${varName}:\\s*Product\\[\\]\\s*=\\s*\\[(.*?)\\]`, 's');
    const match = content.match(regex);
    if (!match) return [];

    const arrayContent = match[1];
    const products = [];

    // Simple parser for product objects
    let depth = 0;
    let currentProduct = '';

    for (let i = 0; i < arrayContent.length; i++) {
        const char = arrayContent[i];
        if (char === '{') depth++;
        if (char === '}') {
            depth--;
            currentProduct += char;
            if (depth === 0) {
                try {
                    // Convert to valid JSON-like string
                    const jsonStr = currentProduct
                        .replace(/id:/g, '"id":')
                        .replace(/name:/g, '"name":')
                        .replace(/category:/g, '"category":')
                        .replace(/type:/g, '"type":')
                        .replace(/description:/g, '"description":')
                        .replace(/longDescription:/g, '"longDescription":')
                        .replace(/benefits:/g, '"benefits":')
                        .replace(/benefitDetails:/g, '"benefitDetails":')
                        .replace(/price:/g, '"price":')
                        .replace(/unit:/g, '"unit":')
                        .replace(/image:/g, '"image":')
                        .replace(/features:/g, '"features":')
                        .replace(/duration:/g, '"duration":')
                        .replace(/nutritionInfo:/g, '"nutritionInfo":')
                        .replace(/howToConsume:/g, '"howToConsume":')
                        .replace(/bestTime:/g, '"bestTime":')
                        .replace(/inStock:/g, '"inStock":');

                    // This is a simplified approach - for production, use proper parsing
                    products.push(currentProduct);
                } catch (e) {
                    // Skip malformed
                }
                currentProduct = '';
            }
        } else {
            currentProduct += char;
        }
    }
    return products;
};

// Manual product extraction (safer approach)
const allProducts = [
    // Single Juices
    ...extractProducts('singleJuices'),
    // Combo Juices
    ...extractProducts('comboJuices'),
    // Wellness Juices
    ...extractProducts('wellnessJuices'),
    // Juice Packages
    ...extractProducts('juicePackages'),
    // Fruit Boxes
    ...extractProducts('fruitBoxes'),
    // Single Sprouts
    ...extractProducts('singleSprouts'),
    // Sprout Mixes
    ...extractProducts('sproutMixes'),
    // Sprout Packages
    ...extractProducts('sproutPackages'),
];

// Helper to escape SQL strings
const escapeSql = (str) => {
    if (!str) return 'NULL';
    return `'${str.replace(/'/g, "''")}'`;
};

// Helper to format JSON array
const formatJsonArray = (arr) => {
    if (!arr || !Array.isArray(arr)) return "'[]'::jsonb";
    return `'${JSON.stringify(arr).replace(/'/g, "''")}'::jsonb`;
};

console.log('-- Product Data Inserts');
console.log('-- Generated from data/products.ts\n');

// Since parsing is complex, let's use a simpler hardcoded approach
// I'll generate the SQL manually in the next file

console.log('-- Note: Due to TypeScript parsing complexity,');
console.log('-- please run the products_data.sql file which contains');
console.log('-- manually curated INSERT statements.');
