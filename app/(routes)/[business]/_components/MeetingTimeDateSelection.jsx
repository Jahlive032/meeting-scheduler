import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { Clock, MapPin, CalendarCheck, Timer } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import TimeDateSelection from './TimeDateSelection'
import UserFormInfo from './UserFormInfo'
import { doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore'
import { app } from '@/config/FirebaseConfig'
import { toast } from 'sonner';
import Plunk from '@plunk/node'
import { render } from '@react-email/render';
import { Email } from '@/emails';
import { useRouter } from 'next/navigation'



function MeetingTimeDateSelection({eventInfo, businessInfo}) {

  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState();
  const [enabledTimeSlot, setEnabledTimeSlot] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userNote, setUserNote] = useState('');
  const [prevBooking, setPrevBooking] = useState([]);
  const [step, setStep] = useState(1);
  const router = useRouter();

  const db = getFirestore(app);

  const plunk = new Plunk(process.env.NEXT_PUBLIC_PLUNK_API_KEY);

  useEffect(() =>{
      eventInfo?.duration && createTimeSlot(eventInfo?.duration);
  }, [eventInfo])

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

  const handleDateChange = (date) =>{
    setDate(date);
    const day = format(date, 'EEEE');
    if (businessInfo?.daysAvailbale?.[day]){
      getPrevEventBooking(date);
      setEnabledTimeSlot(true);
    } else{
      setEnabledTimeSlot(false);
    }
  }

  const handleScheduleEvent = async() =>{

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(regex.test(userEmail) == false){
      toast('Entrez une adresse email valide');
      return;
    } 

    const docId = Date.now().toString();
    await setDoc(doc(db, 'ScheduledMeetings', docId),{
      businessName: businessInfo.businessName,
      businessEmail: businessInfo.email,
      selectedTime: selectedTime,
      selectedDate: date,
      formatedDate: format(date, 'PPP'),
      formatedTimeStamp: format(date, 't'),
      duration: eventInfo.duration,
      locationUrl: eventInfo.locationUrl,
      eventId: eventInfo.id,
      id: docId,
      userEmail: userEmail,
      userName: userName,
      userNote: userNote,
    }).then(resp =>{
      toast('Réunion planifiée avec succès !');
      sendEmail(userName);
    })
  }

  const sendEmail = (user) =>{
    const emailHtml = render(
    <Email
      businessName={businessInfo?.businessName}
      date={format(date,'PPP').toString()}
      duration={eventInfo?.duration}
      meetingTime={selectedTime}
      meetingUrl={eventInfo.locationUrl}
      userFirstName={user}
    />);

    plunk.emails.send({
      to: userEmail,
      subject: "Détails du calendrier des réunions",
      body: emailHtml,
    }).then(resp =>{
      console.log(resp);
      router.replace('/confirmation');
    });
  }

  const getPrevEventBooking = async(date_) =>{
    const q = query(collection(db, 'ScheduledMeetings'), where('selectedDate', '==', date_), where('eventId', '==', eventInfo.id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>{
      console.log("--", doc.data());
      setPrevBooking(prev =>[...prev, doc.data()]);
    })
  }

  return (
    <div className='p-5 py-10 shadow-lg m-5 border-t-8 mx-10 md:mx-26 lg:mx-56 my-10' style={{borderTopColor: eventInfo?.themeColor}}>
      <Image
          src='/logo.svg'
          alt='logo'
          width={150}
          height={150}
      />
      <div className='grid grid-cols-1 md:grid-cols-3 mt-4'>
          {/* Information sur la réunion */}
          <div className='p-3 border-r'>
              <h2 className='text-xl'>{businessInfo?.businessName}</h2>
              <h2 className='font-bold text-2xl'>{eventInfo?.eventName?eventInfo?.eventName:'Nom de la réunion'}</h2>
              <div className='mt-4 flex flex-col gap-4'>
                <h2 className='flex gap-2'><Clock/>{eventInfo?.duration} Minutes</h2>
                <h2 className='flex gap-2'><MapPin/>{eventInfo?.locationType} Réunion</h2>
                <h2 className='flex gap-2'><CalendarCheck/> {format(date, 'PPP')} </h2>
                {selectedTime && <h2 className='flex gap-2'><Timer/> {selectedTime} </h2> }
                <Link href={eventInfo?.locationUrl?eventInfo?.locationUrl:'#'} className='text-primary'>{eventInfo?.locationUrl}</Link>
              </div>
          </div>
          {/* Sélectionner la date et l'heure */}
          {step == 1 ? <TimeDateSelection
            date={date}
            enabledTimeSlot={enabledTimeSlot}
            handleDateChange={handleDateChange}
            setSelectedTime={setSelectedTime}
            timeSlots={timeSlots}
            selectedTime={selectedTime}
            prevBooking={prevBooking}
          /> 
            : 
          <UserFormInfo
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            setUserNote={setUserNote}
          />}
      </div>
      <div className='flex gap-3 justify-end'>
        { step == 2 && <Button variant="outline" onClick={() => setStep(1)}>Précédent</Button>}
        { step == 1 ? <Button className="mt-10 float-right" disabled={!selectedTime || !date} onClick={() => setStep(step + 1)}>Suivant</Button> : <Button disabled={!userEmail || !userName} onClick={handleScheduleEvent}>Calendrier</Button>}
      </div>
    </div>
  )
}

export default MeetingTimeDateSelection