import {useState, useEffect} from 'react'
import moment from 'moment'

const MonthView = ({events, date}) => {
  const [days, setDays] = useState()
  var daysInMonth = moment(date).daysInMonth();

  let arrDays = [];

  useEffect(()=>{
    while(daysInMonth) {
      var current = moment(date).date(daysInMonth).format('ddd DD-MM-YYYY');
      arrDays.push(current);
      daysInMonth--;
    }
    setDays(arrDays.reverse())
  }, [date])

  return (
    <div>
      {days && days.map((day)=> (
        <h1>{day}</h1>
      ))}
    </div>
  )
}

export default MonthView