import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function PreviewMeeting({formValue}) {

    const [date, setDate] = useState(new Date());
    const [timeSlots, setTimeSlots] = useState();

    useEffect(() =>{
        formValue?.duration && createTimeSlot(formValue?.duration);
    }, [formValue])
    const createTimeSlot=(interval)=>{
        const startTime = 8 * 60; 
        const endTime = 22 * 60; 
        const totalSlots = (endTime - startTime) / interval;
        const slots = Array.from({ length: totalSlots }, (_, i) => {
            const totalMinutes = startTime + i * interval;
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            const formattedHours = hours > 12 ? hours - 12 : hours; 
            const period = hours >= 12 ? 'PM' : 'AM';
            return `${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
        });
        setTimeSlots(slots); 
        console.log(slots);
    }

  return (
    <div className='p-5 py-10 shadow-lg m-5 border-t-8' style={{borderTopColor: formValue?.themeColor}}>
        <Image
            src='/logo.svg'
            alt='logo'
            width={150}
            height={150}
        />
        <div className='grid grid-cols-1 md:grid-cols-3 mt-4'>
            {/* Information sur la réunion */}
            <div className='p-3 border-r'>
                <h2>Nom du business</h2>
                <h2 className='font-bold text-2xl'>{formValue?.eventName?formValue?.eventName:'Nom de la réunion'}</h2>
                <div className='mt-4 flex flex-col gap-4'>
                    <h2 className='flex gap-2'><Clock/>{formValue?.duration} Minutes</h2>
                    <h2 className='flex gap-2'><MapPin/>{formValue?.locationType} Réunion</h2>
                    <Link href={formValue?.locationUrl?formValue?.locationUrl:'#'} className='text-primary'>{formValue?.locationUrl}</Link>
                </div>
            </div>
            {/* Sélectionner la date et l'heure */}
            <div className='md:col-span-2 flex px-3'>
                <div className='flex flex-col'>
                    <h2 className='font-bold text-lg'>Sélectionnez la date et l'heure</h2>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border mt-4"
                        disabled={(date) => date <= new Date()}
                    />
                </div>
                <div className='flex flex-col w-full overflow-auto gap-4 p-4' style={{maxHeight:'400px'}}>
                    {timeSlots?.map((time, index) => (
                        <Button className="border-primary text-primary" variant="outline">{time}</Button>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default PreviewMeeting