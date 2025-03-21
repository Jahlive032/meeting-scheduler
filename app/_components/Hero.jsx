import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Hero() {
  return (
    <div className='flex flex-col justify-center items-center my-10'>
      <div className='hidden lg:block'>
        <Image
          src='/profile1.png'
          width={100}
          height={100}
          className='h-[100px] object-cover rounded-full absolute right-36'
        />
        <Image
          src='/profile2.png'
          width={100}
          height={100}
          className='h-[100px] object-cover rounded-full absolute top-48 left-16'
        />
        <Image
          src='/profile3.png'
          width={100}
          height={100}
          className='h-[100px] object-cover rounded-full absolute bottom-20 left-36'
        />
        <Image
          src='/profile4.png'
          width={100}
          height={100}
          className='h-[100px] object-cover rounded-full absolute right-16 bottom-32'
        />
      </div>
        <div className='text-center max-w-3xl'>
            <h2 className='font-bold text-[60px] text-slate-700'>Planification facile à l'avance</h2>
            <h2 className='text-xl mt-5 text-slate-500'>Scheduly est votre plateforme d'automatisation de la planification pour éliminer les backs des e-mails pour trouver le moment idéal – et bien plus encore.</h2>
            <div className='flex gap-4 flex-col mt-5'>
                <h3 className='text-sm'>S'inscrire avec Google et Facebook</h3>
                <div className='flex justify-center gap-8'>
                    <Button className='p-7 flex gap-4'>
                      <Image
                        src='/google.png'
                        alt='google'
                        width={40}
                        height={40}
                      />
                      S'inscrire avec Google</Button>
                    <Button className='p-7 flex gap-4'>
                      <Image
                        src='/facebook.png'
                        alt='facebook'
                        width={40}
                        height={40}
                      />
                      S'inscrire avec Facebook</Button>
                </div>
                <hr />
                <h2><Link href='' className='text-primary'>S'inscrire avec email.</Link> Pas de carte bancaire requise</h2>
            </div>
        </div>
    </div> 
  )
}

export default Hero