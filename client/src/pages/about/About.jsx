import React from 'react'
import Mission from './mission/Mission'
import WhoAreWe from './whoarewe/WhoAreWe'
import UserAgreement from './agreement/UserAgreement'
import Policy from './policies/Policy'
import PopularQuestions from './questions/PopularQuestions'

export default function About() {
  return (
    <main className=' w-full min-h-screen bg-white'>
      <Mission/>
      <WhoAreWe/>
      <UserAgreement/>
      <Policy/>
      <PopularQuestions/>
    </main>
  )
}
