const postgres = require('postgres')
const dotenv = require('dotenv')
const path = require('path')

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
    console.error('Error: DATABASE_URL is missing in .env.local')
    process.exit(1)
}

const sql = postgres(connectionString)

async function testPostgres() {
    console.log('--- Postgres Connection Test ---')
    try {
        const result = await sql`SELECT version()`
        console.log('✅ Postgres Connection: OK')
        console.log('Database Version:', result[0].version)

        // Test table accessibility
        const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      AND table_name IN ('profiles', 'addresses', 'orders', 'order_items')
    `
        console.log('✅ Tables detected:', tables.map(t => t.table_name).join(', '))

    } catch (error) {
        console.error('❌ Postgres Connection Failed:', error.message)
    } finally {
        await sql.end()
        process.exit(0)
    }
}

testPostgres()
