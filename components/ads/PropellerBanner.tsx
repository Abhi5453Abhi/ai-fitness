'use client'

import { useEffect, useRef } from 'react'
import { PROPELLER_ADS_CONFIG } from '@/lib/propeller-config'

interface PropellerBannerProps {
  zoneId?: string
  className?: string
}

export function PropellerBanner({ 
  zoneId = PROPELLER_ADS_CONFIG.bannerZoneId, 
  className = '' 
}: PropellerBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!PROPELLER_ADS_CONFIG.enableBanner || !containerRef.current) return

    const script = document.createElement('script')
    script.async = true
    script.innerHTML = `
      (function(d,z,s){
        s.src='https://'+d+'/400/'+z;
        try{(document.body||document.documentElement).appendChild(s)}
        catch(e){}
      })('propellerads.com','${zoneId}',document.createElement('script'))
    `
    
    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current && script.parentNode === containerRef.current) {
        containerRef.current.removeChild(script)
      }
    }
  }, [zoneId])

  if (!PROPELLER_ADS_CONFIG.enableBanner) return null

  return (
    <div 
      ref={containerRef} 
      className={`propeller-banner-ad ${className}`}
      style={{ minHeight: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    />
  )
}
