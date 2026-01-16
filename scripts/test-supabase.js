const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')
const path = require('path')

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_URL or keys are missing in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
    console.log('--- Supabase Backend Test ---')
    console.log('URL:', supabaseUrl)

    // 1. Test Auth Connection
    const { data: authData, error: authError } = await supabase.auth.getSession()
    if (authError) {
        console.error('❌ Auth Connection Failed:', authError.message)
    } else {
        console.log('✅ Auth Connection: OK')
    }

    // 2. Test Tables
    const tables = ['profiles', 'addresses', 'orders', 'order_items']

    for (const table of tables) {
        const { data, error } = await supabase.from(table).select('*').limit(1)
        if (error) {
            console.error(`❌ Table "${table}" access failed:`, error.message)
        } else {
            console.log(`✅ Table "${table}" access: OK`)
        }
    }

    console.log('--- Test Complete ---')
}

testConnection()
