"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LocationOption from '@/app/_utils/LocationOption'
import Image from 'next/image'
import Link from 'next/link'
import ThemesOptions from '@/app/_utils/ThemesOptions'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { app } from '@/config/FirebaseConfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
  

function MeetingForm({setFormValue}) {

    const [location, setLocation] = useState();
    const [themeColor, setThemeColor] = useState('');
    const [eventName, setEventName] = useState();
    const [duration, setDuration] = useState(30);
    const [locationType, setLocationType] = useState();
    const [locationUrl, setLocationUrl] = useState();
    const router = useRouter();
    const {user} = useKindeBrowserClient();
    const db = getFirestore(app);

    useEffect(() =>{
        setFormValue({
            eventName: eventName,
            duration: duration,
            locationType: locationType,
            locationUrl: locationUrl,
            themeColor: themeColor,
        })
    },[eventName,duration,locationType,locationUrl,themeColor])

    const onCreateClick = async() =>{
        const id = Date.now().toString();
        await setDoc(doc(db, 'MeetingEvent', id),{
            id: id,
            eventName: eventName,
            duration: duration,
            locationType: locationType,
            locationUrl: locationUrl,
            themeColor: themeColor,
            businessId: doc(db, 'Business', user?.email),
            createdBy: user?.email
        })
        toast('Nouvel événement créé avec succès');
        router.replace('/dashboard/meeting-type')
    }

  return (
    <div className='p-8'>
        <Link href={'/dashboard'}>
            <h2 className='flex gap-2'>
                <ChevronLeft/>Annuler
            </h2>
        </Link>
        
        <div className='mt-3'>
            <h2 className='font-bold text-2xl my-4'>Créer un nouvel événement</h2>
            <hr />
        </div>
        <div className='flex flex-col gap-3 my-4'>
            <h2 className='font-bold'>Nom de l'événement *</h2>
            <Input 
                placeholder="Exemple: Comment devenir riche?"
                onChange={(event) => setEventName(event.target.value)}
            />
            <h2 className='font-bold'>Durée *</h2>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="max-w-40">{duration} Minutes</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setDuration(15)}>15 Minutes</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDuration(30)}>30 Minutes</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDuration(45)}>45 Minutes</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDuration(60)}>60 Minutes</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <h2 className='font-bold'>Emplacement *</h2>
            <div className='grid grid-cols-4 gap-3'>
                {LocationOption.map((option, index) => (
                    <div key={index} className={`border flex flex-col justify-center items-center p-3 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-primary ${locationType == option.name && 'bg-blue-100 border-primary'}`} onClick={() => setLocationType(option.name)}>
                        <Image
                            src={option.icon}
                            width={30}
                            height={30}
                            alt={option.name}
                        />
                        <h2>{option.name}</h2>
                    </div>
                ))}
            </div>
             {locationType && <>
                <h2 className='font-bold'>Ajoutez le lien {location} *</h2>
                <Input 
                    placeholder="Ajoutez le lien ici"
                    onChange={(event) => setLocationUrl(event.target.value)}
                />
            </>}
            <h2 className='font-bold'> Sélectionner la couleur du thème *</h2>
            <div className='flex justify-evenly'>
                {ThemesOptions.map((color, index) => (
                    <div className={`h-5 w-5 rounded-full ${themeColor==color&&' border-3 border-black'}`} key={index} style={{backgroundColor:color}} onClick={() => setThemeColor(color)}>

                    </div>
                ))}
            </div>
        </div>
        <Button className="w-full mt-4" disabled={(!eventName || !duration || !locationType || !locationUrl )} onClick={() => onCreateClick()}>Créer</Button>
    </div>
  )
}

export default MeetingForm