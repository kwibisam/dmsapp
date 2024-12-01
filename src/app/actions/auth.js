"use server";
import { createSession } from '@/app/lib/session'
import { redirect } from 'next/navigation'

export async function signup(formData) {
  // 1. Validate form fields

  console.log('validation check',formData)

  // 2. Prepare data for insertion into database
  const { name, email, password } = formData

  // You would usually interact with a database here or call an API to create the user
  // For the purpose of this test, we'll simulate that the user is created successfully
  const user = { name, email }  // Normally, you'd insert the user data into a database

  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    }
  }

  // 3. Create user session (simulate session creation)
  await createSession(user)

  // 4. Redirect user to the home page after successful signup
  redirect('/home')
}
