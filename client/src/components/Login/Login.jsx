import React from 'react'

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=5c13decbc7e248ea811bdec12e6ce368&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

export default function Login () {
  return (
    <section className='flex items-center justify-center h-screen'>
      <a className='text-[#fff] bg-custom-green text-5xl font-bold rounded-2xl p-6' href={AUTH_URL}>Log in with Spotify</a>
    </section>
  )
}
