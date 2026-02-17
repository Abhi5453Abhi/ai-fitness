'use client'

import { useEffect, useRef } from 'react'
import { PROPELLER_ADS_CONFIG } from '@/lib/propeller-config'

interface PropellerNativeBannerProps {
  className?: string
}

export function PropellerNativeBanner({ className = '' }: PropellerNativeBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!PROPELLER_ADS_CONFIG.enableNativeBanner || !containerRef.current) return

    const script = document.createElement('script')
    script.async = true
    script.innerHTML = `
      (function(d,z,s){
        s.src='https://'+d+'/400/'+z;
        try{(document.body||document.documentElement).appendChild(s)}
        catch(e){}
      })('propellerads.com','${PROPELLER_ADS_CONFIG.nativeBannerZoneId}',document.createElement('script'))
    `
    
    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current && script.parentNode === containerRef.current) {
        containerRef.current.removeChild(script)
      }
    }
  }, [])

  if (!PROPELLER_ADS_CONFIG.enableNativeBanner) return null

  return (
    <div 
      ref={containerRef} 
      className={`propeller-native-banner ${className}`}
      style={{ minHeight: '80px' }}
    />
  )
}
