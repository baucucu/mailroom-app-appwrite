import { createClient } from '@supabase/supabase-js'

const supabase = async (supabaseAccessToken) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey, {
        global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
    })
    return supabase
}
console.log("supabase from supabase.js: ", { supabase })
export default supabase