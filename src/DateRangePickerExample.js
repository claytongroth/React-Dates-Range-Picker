import React, {useReducer} from 'react'
import 'react-dates/initialize';
import moment from 'moment';
import { DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';


const initialState = {
    focusedInput:null,
    startDate: moment(),
    endDate: moment(),
    trips:[
        {
            id: 1,
            start: moment('2019-09-20'),
            end: moment('2019-09-25')
        },
        {
            id: 2,
            start: moment('2019-09-20'),
            end: moment('2019-09-26')
        },
        {
            id: 3,
            start: moment('2019-10-01'),
            end: moment('2019-10-05')
        }
    ]
        
}

const Example = () => {
    const [state, dispatch] = useReducer(pickerReducer, initialState);
    const { focusedInput, startDate, endDate, trips } = state;

    const onDatesChange = ({ startDate, endDate }) => {
        dispatch({ type: 'change_date', startDate, endDate })
    }
    const onFocusChange = (focus) => {
        dispatch({ type: 'change_focus', focus})
    }
    
    const renderDayContents = (day) => {
        for (let i = 0; i < trips.length; i++) {
            if(moment(day).isBetween(trips[i].start, trips[i].end, null, '[]')){
                return <div style={{color: 'red'}}>{day.format('D')}</div> 
                //console.log(destinations[i].id, moment(day).isBetween(destinations[i].dtArrive, destinations[i].dtDepart, null, '[]'))
            } else {
                //console.log(destinations[i].id, day.format('MM DD'), " is not between ", destinations[i].dtArrive, destinations[i].dtDepart)
                return day.format('D')
            }
        }
        // if (moment(day).isBetween(trips[1].start, trips[1].end, null, '[]')){
        //     return <div style={{color: 'red'}}>{day.format('D')}</div>
        // } else if (moment(day).isBetween(trips[2].start, trips[2].end, null, '[]')){
        //     return <div style={{color: 'orange'}}>{day.format('D')}</div>
        // }
        // return day.format('D')
    } 
    
    return (
        <DateRangePicker
            onDatesChange={onDatesChange}
            onFocusChange={onFocusChange}
            focusedInput={focusedInput}
            renderDayContents={renderDayContents}
            date={startDate}
            startDate={startDate}
            endDate={endDate}                                     
            startDateId="datepicker_start_home"
            endDateId="datepicker_end_home"                    
            startDatePlaceholderText="Check In"
            endDatePlaceholderText="Check Out"
        />
    );
}
 
export default Example;

const pickerReducer = (state, action) => {
    switch (action.type) {
        case 'change_date':
            return { 
                ...state,
                startDate: action.startDate,
                endDate: action.endDate
             }
        case 'change_focus':
            return { ...state, focusedInput: action.focus}
        default:
            return state;
    }
}


// for (let i = 0; i < trips.length; i++) {
//     console.log(trips[i].id)
//     //return day.format('D')
//     // if(moment(day).isBetween(trips[i].start, trips[i].end, null, '[]')){
//     //     return <div style={{color: 'red'}}>{day.format('D')}</div> 
//     //     //console.log(destinations[i].id, moment(day).isBetween(destinations[i].dtArrive, destinations[i].dtDepart, null, '[]'))
//     // } else {
//     //     //console.log(destinations[i].id, day.format('MM DD'), " is not between ", destinations[i].dtArrive, destinations[i].dtDepart)
//     //     return day.format('D')
//     // }
// }