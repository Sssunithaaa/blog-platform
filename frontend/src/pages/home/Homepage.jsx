import React from 'react'
import MainLayout from '../../Components/MainLayout'
import Hero from './Hero'
import Articles from '../container/Articles'
import CTA from '../container/CTA'

const Homepage = () => {
  return (
    <MainLayout>
      <Hero />
      <Articles />
      <CTA />
    </MainLayout>
  )
}

export default Homepage
