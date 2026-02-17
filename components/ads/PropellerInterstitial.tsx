'use client'

import { useEffect } from 'react'
import { PROPELLER_ADS_CONFIG, canShowInterstitial, updateInterstitialTime } from '@/lib/propeller-config'

interface PropellerInterstitialProps {
  trigger?: boolean // Set to true when you want to show the ad
  onAdShown?: () => void
}

export function PropellerInterstitial({ trigger = false, onAdShown }: PropellerInterstitialProps) {
  useEffect(() => {
    if (!trigger || !PROPELLER_ADS_CONFIG.enableInterstitial) return
    if (!canShowInterstitial()) {
      console.log('Propeller: Too soon to show another interstitial')
      return
    }

    // Load and show interstitial ad
    const script = document.createElement('script')
    script.innerHTML = `
      (function(d,z,s){
        s.src='https://'+d+'/400/'+z;
        try{(document.body||document.documentElement).appendChild(s)}
        catch(e){}
      })('propellerads.com','${PROPELLER_ADS_CONFIG.interstitialZoneId}',document.createElement('script'))
    `
    document.body.appendChild(script)
    
    updateInterstitialTime()
    onAdShown?.()

    return () => {
      // Cleanup
      document.body.removeChild(script)
    }
  }, [trigger, onAdShown])

  return null // This component doesn't render anything
}
