//import { useFormState, useFormStatus } from 'react-dom'
import { signup } from '@/app/actions/auth'
 
export function SignupForm() {
  //const [state, action] = useFormState(signup, undefined)
 
  return (
    <form action={signup}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="John Doe" />
      </div>
 
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="john@example.com" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <SubmitButton />
    </form>
  )
}
 
function SubmitButton() {
  return (
    <button type="submit">
      Sign Up
    </button>
  )
}