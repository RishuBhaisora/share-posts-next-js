'use client'
import { useEffect, useState } from 'react'

export default function About() {
    const [user, setUser] = useState<any | null>(null)

    useEffect(() => {

        setUser('a.user')
    }, [])

    console.log(user)
  return <div>About page</div>;
}