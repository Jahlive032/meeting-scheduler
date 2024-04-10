import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import React from 'react'

function TimeDateSelection( {date, handleDateChange, timeSlots, setSelectedTime, enabledTimeSlot, selectedTime, prevBooking} ){

    const chechTimeSlot = (time) =>{
        return (prevBooking.filter(item => item.selectedTime == time)).length > 0;
    }

    return (
        <div className='md:col-span-2 flex px-3'>
            <div className='flex flex-col'>
                <h2 className='font-bold text-lg'>Sélectionnez la date et l'heure</h2>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => handleDateChange(d)}
                    className="rounded-md border mt-4"
                    disabled={(date) => date <= new Date()}
                />
            </div>
            <div className='flex flex-col w-full overflow-auto gap-4 p-4' style={ {maxHeight:'400px'} }>
                {timeSlots?.map((time, index) => (
                    <Button 
                        disabled={enabledTimeSlot || chechTimeSlot(time)} 
                        onClick={() =>setSelectedTime(time)}
                        className={`border-primary text-primary ${time == selectedTime && 'bg-primary text-white'}`} 
                        variant="outline"
                    >
                        {time}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default TimeDateSelection