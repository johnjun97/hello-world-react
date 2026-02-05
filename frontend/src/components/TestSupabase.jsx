// frontend/src/components/TestSupabase.jsx
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function TestSupabase() {
  const [status, setStatus] = useState('Checking Supabase key...')

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase.from('users_test').select('*')
        if (error) {
          console.error('Supabase key invalid or connection failed:', error)
          setStatus('Supabase key invalid or connection failed. Check console.')
        } else {
          console.log('Supabase test table data:', data)
          setStatus('Supabase key is valid! Connected.')
        }
      } catch (err) {
        console.error('Unexpected error:', err)
        setStatus('Unexpected error. Check console.')
      }
    }

    testConnection()
  }, [])

  return (
    <div>
      <h2>Supabase Key Test</h2>
      <p>{status}</p>
    </div>
  )
}
