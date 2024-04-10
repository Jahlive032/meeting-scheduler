"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { app } from '@/config/FirebaseConfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

function CreateBusiness() {

    const [businessName, setBusinessName] = useState();
    const db = getFirestore(app);
    const {user} = useKindeBrowserClient();
    const router = useRouter();

    const onCreateBusiness= async()=>{
        console.log("Button click", businessName);
        await setDoc(doc(db, 'Business', user.email),{
            businessName:businessName,
            email:user.email,
            userName:user.given_name + " " + user.family_name
        }).then(resp=>{
            console.log("Document enregistré");
            toast('Nouveau business créé avec succès.');
            router.replace('/dashboard'); 
        })
    }

  return (
    <div className='p-14 items-center flex flex-col justify-start gap-20 my-10'>
        <Image
            src='/logo.svg'
            width={200}
            height={200}
        />
        <div className='flex flex-col items-center gap-4 max-w-2xl'>
            <h2 className='text-3xl font-bold'>Comment devrions-nous appeler votre entreprise?</h2>
            <p className='text-slate-500'>Vous pourriez toujours le modifier plus tard</p>
            <div className='w-full'>
                <label className='text-slate-400'>Nom de l'équipe</label>
                <Input
                    placeholder="Exemple: Red Moon Devs"
                    className="mt-2"
                    onChange={(event) => setBusinessName(event.target.value)}
                />
            </div>
            <Button 
                className="w-full" 
                disabled={!businessName}
                onClick={onCreateBusiness} 
            >
                Créer votre business
            </Button>
        </div>
    </div>
  )
}

export default CreateBusiness