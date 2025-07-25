import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from '../supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  console.log(session?.user?.email)

  const signOut = async () => {
    const { error} = await supabase.auth.signOut()
    if (error) {
      console.log(error)
    }
  }

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    return (<div>Welcome {session?.user?.email}! You are logged in! <button onClick={signOut}>Sign Out</button></div>)
  }
}

export default App