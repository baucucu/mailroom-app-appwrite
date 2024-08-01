import { createClient } from '@supabase/supabase-js'

const supabaseClient = async (supabaseAccessToken) => {
    const supabase = createClient(
        import.meta.env.NEXT_PUBLIC_SUPABASE_URL,
        import.meta.env.NEXT_PUBLIC_SUPABASE_KEY,
        {
            global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
        },
    )

    return supabase
}

export default supabaseClient