import React, {useState, useEffect, useContext} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/Calender.css';
import axios from 'axios';
import {UserContext} from "../components/UserProvider";
const Calendar = ({ data, totalData, closeModal }) => {

    const {user, setUser, logout} = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState(null);
    const [open, setOpen] = useState(true);
    const [displayTimeButton, setDisplayTimeButton] = useState(false);
    const [selectedTime, setSelectedTime] = useState({start: null, end: null});
    const [ReservationView, setReservationView] = useState(false);

    const [reservation, setReservation] = useState({
        userId: user.userId,
        trainerId: data.trainerId,
        date: null,
        startTime: null,
        endTime: null,
    });

    const [bookedTimeSlots, setBookedTimeSlots] = useState([]);

    const [timeSlots, setTimeSlots] = useState([
        '09:00 ~ 10:00',
        '10:00 ~ 11:00',
        '11:00 ~ 12:00',
        '12:00 ~ 13:00',
        '13:00 ~ 14:00',
        '14:00 ~ 15:00',
        '15:00 ~ 16:00',
        '16:00 ~ 17:00',
        '17:00 ~ 18:00',
        '18:00 ~ 19:00',
        '19:00 ~ 20:00',
        '20:00 ~ 21:00',
        '21:00 ~ 22:00'
    ]);

    useEffect(() => {
        console.log(' test reservation ::', reservation)
    }, [reservation]);


    const submitReservation = () => {
        // axios.post('http://localhost:8080/api/v1/reservation', reservation)
        axios.post('/api/v1/reservation', reservation)
            .then(response => {
                console.log(response);
                alert('예약요청이 되었습니다. 트레이너가 확인 후 예약완료가 된다면 완료안내가 될 예정입니다.');
                setOpen(true);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };
    const utcToKst = (date) => {
        date.setHours(date.getHours() + 9);
        return date;
    };


    const handleDateChange = (date) => {
        const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const kstDate = utcToKst(utcDate);  // Convert UTC to KST
        setSelectedDate(kstDate);
        setReservation(prevState => ({...prevState, date: kstDate}));
        setOpen(false);
        setDisplayTimeButton(true);
    };

    const handleReturn = () => {
        setSelectedTime({start: null, end: null});
        setReservation(prevState => ({...prevState, startTime: null, endTime: null}));
        setDisplayTimeButton(false);
        setSelectedDate(null);
        setOpen(true);
    };

    const handleReservation = () => {
        if (!selectedTime.start || !selectedTime.end) {
            alert('시간을 선택해주세요!');
            return;
        }
        if (selectedTime.start && selectedTime.end) {
            const [startHours, startMinutes] = selectedTime.start.split(':');
            const [endHours, endMinutes] = selectedTime.end.split(':');
            setReservation(prevState => ({
                ...prevState,
                startTime: `${startHours}:${startMinutes}`,
                endTime: `${endHours}:${endMinutes}`
            }));
        }
        setReservationView(true);
    };
    useEffect(() => {
        if (selectedDate) {
            const formattedDate = formatDate(selectedDate);
            axios.get('http://localhost:8080/api/v1/reservation', {
                params: {
                    // date: formattedDate,
                    date: selectedDate,
                    trainerId: data.trainerId
                }
            })
                .then(response => {
                    const reservedTimes = response.data.map(reservation => {
                        return `${reservation.startTime} ~ ${reservation.endTime}`;
                    });
                    setBookedTimeSlots(reservedTimes);
                })
                .catch(error => {
                    console.error('There was an error fetching the reservations!', error);
                });
        }
    }, [selectedDate, data.trainerId]);

    const handleCloseAndCancel = () => {
        closeModal(); // 부모 컴포넌트의 closeModal 함수를 호출하여 모달을 닫습니다.
    }

    useEffect(() =>{

    },[reservation])
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${year}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}`;
    };


    return (
        <div>
            {!ReservationView ? (
                <>
                    <DatePicker
                        className="my-custom-datepicker"
                        selected={selectedDate}
                        onChange={handleDateChange}
                        onInputClick={() => setOpen(true)}
                        open={open}
                        onCalendarClose={() => setOpen(false)}
                        onCalendarOpen={() => setOpen(true)}
                        minDate={new Date()}
                        dateFormat="yyyy/MM/dd"
                        isClearable
                        showYearDropdown
                        showPopperArrow={false}
                    />
                    {displayTimeButton && (
                        <div className="time-container">
                            <div className="time-list">
                                {timeSlots.map((timeSlot, index) => {
                                    const [start, end] = timeSlot.split('~').map(time => time.trim());
                                    const isBooked = bookedTimeSlots.includes(timeSlot); // 해당 시간 슬롯이 예약되었는지 확인
                                    return (
                                        <button
                                            key={index}
                                            className={`time-button ${selectedTime.start === start && selectedTime.end === end ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
                                            onClick={() => !isBooked && setSelectedTime({start, end})}
                                            disabled={isBooked} // 예약된 경우 버튼 비활성화
                                        >
                                            {start} ~ {end}
                                        </button>
                                    )
                                })}
                            </div>
                            <div className="time-button-check">
                                <button className="returnDate" onClick={handleReturn}>날짜 다시고르기</button>
                                <button className="notificationCheck" onClick={handleReservation}>예약하러가기</button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div>
                    <div className="input-container">
                        <div className = "check-name">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" defaultValue={user.name} readOnly/>
                        </div>
                        <div>
                            <label htmlFor="gymName">Gym Name</label>
                            <input type="text" id="gymName" name="gymName" defaultValue={totalData.data.pointName}
                                   readOnly/>
                        </div>
                        <div>
                            <label htmlFor="trainerName">Trainer Name</label>
                            <input type="text" id="trainerName" name="trainerName" defaultValue={data.name}
                                   readOnly/>
                        </div>
                        <div>
                            <label htmlFor="date">Date</label>
                            <input type="text" id="date" name="date"
                                   defaultValue={selectedDate ? formatDate(selectedDate) : ''} readOnly/>
                        </div>
                        <div>
                            <label htmlFor="hour">Hour</label>
                            <input type="text" id="hour" name="hour"
                                   defaultValue={`${selectedTime.start} ~ ${selectedTime.end}`} readOnly/>
                        </div>
                    </div>
                    <div className="button-container-notification">
                        <button className="reservationComplete" onClick={submitReservation}>예약완료</button>
                        <button className="reservationCancel " onClick={handleCloseAndCancel}>예약취소</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
