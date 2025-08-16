import React from 'react'
import About_Hero from './components/About-hero'
import About_Objective from './components/About-Objective'
import About_Activities from './components/About_Activite'
import ActionPlanSection from './components/About_ActionPlan'
import SMESectorSection from './components/About_SME_Sector_India'
import ScopeSection from './components/About_ScopeInSME'
import ChallengesSection from './components/About_ChallengesSME'

function page() {
  return (
    <div>
      <About_Hero/>
      <About_Objective/>
      <About_Activities/>
      <ActionPlanSection/>
      <SMESectorSection/>
      <ScopeSection/>
      <ChallengesSection/>
    </div>
  )
}

export default page
