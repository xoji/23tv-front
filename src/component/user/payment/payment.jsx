import styles from './payment.module.css'
import uz from '../../../assets/img/uz.png'
import {useEffect, useState} from "react";
import {Axios} from "../../../services";
import React from 'react'
import Language from "../../../languages";
import {useLang} from "../../../context/lanuage";
import Loader from "../../loader/loader";
import axios from "axios";

export default function Payment ({data}) {
    const [ til ] = useLang()
    const [uzcard, setUzcard] = useState('true')
    const [cardId, setCardId] = useState()
    const [cardNum, setCardNum] = useState()
    const [date, setDate] = useState()
    const [modal, setModal] = useState(false)
    const [smsSubmit, setSmsSubmit] = useState(false)
    const [phone, setPhone] = useState()
    const [sms, setSms] = useState('')
    const [card, setCard] = useState({})
    const [user, setUser] = useState()
    const [amount, setAmount] = useState()
    const [message, setMessage] = useState()
    const [isMessage, setIsMessage] = useState(false)
    const [isError, setIsError] = useState(false)
    const [loading, isLoading] = useState(false)

    useEffect(() => {
        setUser(data)
        isLoading(true)
        Axios.get('/get-cards').then(res => {
            setCard(res.data.data)
            isLoading(false)
        })
    }, [])


    const typeHandler = (event) => {
        setUzcard(event.target.value)
        console.log(uzcard)
    }
    const cardHandler = (event) => {
        setCardNum(event.target.value.replace(/ /g, ''))
    }

    const dateChangeHandler = (event) => {
        setDate(event.target.value.replace('/', ''))
    }

    const numberFunc = (event) => {
        if (event.nativeEvent.data >= 0 &&
            event.nativeEvent.data <= 9 &&
            event.nativeEvent.data !== ' ' &&
            event.nativeEvent.inputType !== 'deleteContentBackward'
        ) {
            if (event.target.value.length >= 4) {
                if (event.target.value.slice(4, 5) !== ' ') {
                    event.target.value = `${event.target.value.slice(0, 4)} ${event.target.value.slice(4)}`
                }
            }
            if (event.target.value.length >= 9) {
                if (event.target.value.slice(9, 10) !== ' ') {
                    event.target.value = `${event.target.value.slice(0, 9)} ${event.target.value.slice(9)}`
                }
            }
            if (event.target.value.length >= 14) {
                if (event.target.value.slice(14, 15) !== ' ') {
                    event.target.value = `${event.target.value.slice(0, 14)} ${event.target.value.slice(14)}`
                }
            }
            if (event.target.value.length > 19) {
                event.target.value = event.target.value.slice(0, 19)
            }
        } else if (event.nativeEvent.inputType !== 'deleteContentBackward') {
            event.target.value = event.target.value.slice(0, event.target.value.length - 1)
        }
    }

    const dateHandler = (event) => {
        if (event.nativeEvent.data >= 0 &&
            event.nativeEvent.data <= 9 &&
            event.nativeEvent.data !== ' ' &&
            event.nativeEvent.inputType !== 'deleteContentBackward'
        ) {
            if (event.target.value.length >= 2) {
                if (event.target.value.slice(2, 3) !== '/') {
                    event.target.value = `${event.target.value.slice(0, 2)}/${event.target.value.slice(2)}`
                }
            }
            if (event.target.value.length > 5) {
                event.target.value = event.target.value.slice(0, 5)
            }
        } else if (event.nativeEvent.inputType !== 'deleteContentBackward') {
            event.target.value = event.target.value.slice(0, event.target.value.length - 1)
        }
    }

    const submitHandler = async () => {
        isLoading(true)
        const language_header = axios.defaults.headers.common['Language'];
        const auth_header = axios.defaults.headers.common['Authorization'];
        const user_token = localStorage.getItem('Authorization')
        const res = await Axios.post('https://aapi.23tv.uz/add-card', {
            user_token
        })
        if (res.status === 200) {
            setPhone(res.data.phone_number)
            setCardId(res.data.card_id)
            setSmsSubmit(true)
        }
        isLoading(false)
    }

    function modalHandler(event) {
        if (event.target.classList.contains('payment_addCardModal__qeI2n')) {
            setModal(false)
        }
    }

    const smsSubmitHandler = async () => {
        if (sms.trim()) {
            isLoading(true)
            const back_res = await Axios.post('https://aapi.23tv.uz/submit-card', {
                code: sms,
                card_id: cardId
            })
            if (back_res.status === 200) {
                setSmsSubmit(false)
                setModal(false)
            }
            isLoading(false)
            window.location.reload()
        }
    }

    const payHandler = async () => {
        try {
            isLoading(true)
            const res = await Axios.post('https://aapi.23tv.uz/pay-balance', {
                card_id: card.card_id,
                amount, payment_id: user.balance_id
            })
            if (res.status === 200) {
                isLoading(false)
                setMessage(res.data.message)
                setIsMessage(true)
                setTimeout(() => {
                    setIsMessage(false)
                    window.location.reload()
                }, 3000)
            }
        } catch (e) {
            isLoading(false)
            setMessage(e.message)
            setIsMessage(true)
            setIsError(true)
            setTimeout(() => {
                setIsMessage(false)
                setIsError(false)
            })
        }
    }

    function smsHandler(event) {
        setSms(event.target.value)
    }

    function amountHandler(event) {
        setAmount(event.target.value)
    }

    return (
        <>
            <div className={styles.container}>
                <div>
                    {card ?
                        <div className={styles.defaultCard}>
                            <div className={styles.card}>
                                <div className={styles.cardDetails}>
                                    <div><img src={uz} alt="" className={styles.innerImg}/></div>
                                    <span className={styles.cardNumber}>{card.card_number}</span>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={styles.cardMessage}>
                            <p className={styles.errorCardMessage}>У вас еще нет карты. Сначала нужно
                                <span className={styles.addCardLink} onClick={() => setModal(true)}> добавить карту</span>
                            </p>
                        </div>
                    }
                    <h4 className={styles.heading}>Выберите систему и введите сумму для пополнения счета</h4>
                    <div className={styles.paymentBlock}>
                        <div className={styles.typeBlock}>
                            <div className={styles.typesDiv}>
                                <input
                                    type="radio"
                                    value="true"
                                    name="payType"
                                    id="uzpay"
                                    className={styles.checkbox}
                                    onChange={typeHandler}
                                    defaultChecked={true}
                                />
                                <label htmlFor="uzpay" className={styles.label}>
                                    <div className={styles.imgDiv}><img src={uz} alt="" className={styles.img}/></div>
                                </label>
                            </div>
                            <div className={styles.typesDiv}>
                                <input disabled type="radio" value="false" name="payType" id="pay" className={styles.checkbox} onChange={typeHandler}/>
                                <label htmlFor="pay" className={styles.label} onClick={() => alert('Извините способ Visa / MasterCard сейчас не работает!')}>
                                    <div className={styles.svgBlock}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className={styles.paymentSvg}>
                                            <path d="M470.1 231.3s7.6 37.2 9.3 45H446c3.3-8.9 16-43.5
                                        16-43.5-.2.3 3.3-9.1 5.3-14.9l2.8 13.4zM576 80v352c0 26.5-21.5 48-48
                                        48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5
                                        48 48zM152.5 331.2L215.7 176h-42.5l-39.3
                                        106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1H32.7l-.7
                                        3.1c15.8 4 29.9 9.8 42.2 17.1l35.8 135h42.5zm94.4.2L272.1
                                        176h-40.2l-25.1
                                        155.4h40.1zm139.9-50.8c.2-17.7-10.6-31.2-33.7-42.3-14.1-7.1-22.7-11.9-22.7-19.2.2-6.6 7.3-13.4
                                        23.1-13.4 13.1-.3 22.7 2.8 29.9 5.9l3.6 1.7 5.5-33.6c-7.9-3.1-20.5-6.6-36-6.6-39.7
                                        0-67.6 21.2-67.8 51.4-.3 22.3 20 34.7 35.2 42.2 15.5 7.6 20.8 12.6 20.8 19.3-.2
                                        10.4-12.6 15.2-24.1 15.2-16 0-24.6-2.5-37.7-8.3l-5.3-2.5-5.6 34.9c9.4 4.3 26.8
                                        8.1 44.8 8.3 42.2.1 69.7-20.8 70-53zM528 331.4L495.6 176h-31.1c-9.6 0-16.9
                                        2.8-21 12.9l-59.7 142.5H426s6.9-19.2 8.4-23.3H486c1.2 5.5 4.8 23.3 4.8 23.3H528z"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className={styles.paymentSvg}>
                                            <path d="M482.9 410.3c0 6.8-4.6 11.7-11.2 11.7-6.8 0-11.2-5.2-11.2-11.7
                                        0-6.5 4.4-11.7 11.2-11.7 6.6 0 11.2 5.2 11.2 11.7zm-310.8-11.7c-7.1 0-11.2
                                        5.2-11.2 11.7 0 6.5 4.1 11.7 11.2 11.7 6.5 0
                                        10.9-4.9 10.9-11.7-.1-6.5-4.4-11.7-10.9-11.7zm117.5-.3c-5.4 0-8.7
                                        3.5-9.5 8.7h19.1c-.9-5.7-4.4-8.7-9.6-8.7zm107.8.3c-6.8 0-10.9 5.2-10.9
                                        11.7 0 6.5 4.1 11.7 10.9 11.7 6.8 0 11.2-4.9 11.2-11.7
                                        0-6.5-4.4-11.7-11.2-11.7zm105.9 26.1c0 .3.3.5.3 1.1 0
                                        .3-.3.5-.3 1.1-.3.3-.3.5-.5.8-.3.3-.5.5-1.1.5-.3.3-.5.3-1.1.3-.3
                                        0-.5 0-1.1-.3-.3 0-.5-.3-.8-.5-.3-.3-.5-.5-.5-.8-.3-.5-.3-.8-.3-1.1
                                        0-.5 0-.8.3-1.1 0-.5.3-.8.5-1.1.3-.3.5-.3.8-.5.5-.3.8-.3 1.1-.3.5 0
                                        .8 0 1.1.3.5.3.8.3 1.1.5s.2.6.5 1.1zm-2.2 1.4c.5 0
                                        .5-.3.8-.3.3-.3.3-.5.3-.8 0-.3 0-.5-.3-.8-.3 0-.5-.3-1.1-.3h-1.6v3.5h.8V426h.3l1.1
                                        1.4h.8l-1.1-1.3zM576 81v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V81c0-26.5
                                        21.5-48 48-48h480c26.5 0 48 21.5 48 48zM64 220.6c0 76.5 62.1 138.5 138.5 138.5 27.2
                                        0 53.9-8.2 76.5-23.1-72.9-59.3-72.4-171.2 0-230.5-22.6-15-49.3-23.1-76.5-23.1-76.4-.1-138.5
                                        62-138.5 138.2zm224 108.8c70.5-55 70.2-162.2 0-217.5-70.2 55.3-70.5 162.6 0
                                        217.5zm-142.3 76.3c0-8.7-5.7-14.4-14.7-14.7-4.6 0-9.5 1.4-12.8
                                        6.5-2.4-4.1-6.5-6.5-12.2-6.5-3.8 0-7.6 1.4-10.6 5.4V392h-8.2v36.7h8.2c0-18.9-2.5-30.2
                                        9-30.2 10.2 0 8.2 10.2 8.2 30.2h7.9c0-18.3-2.5-30.2 9-30.2 10.2 0 8.2 10 8.2
                                        30.2h8.2v-23zm44.9-13.7h-7.9v4.4c-2.7-3.3-6.5-5.4-11.7-5.4-10.3 0-18.2 8.2-18.2
                                        19.3 0 11.2 7.9 19.3 18.2 19.3 5.2 0 9-1.9 11.7-5.4v4.6h7.9V392zm40.5
                                        25.6c0-15-22.9-8.2-22.9-15.2 0-5.7
                                        11.9-4.8 18.5-1.1l3.3-6.5c-9.4-6.1-30.2-6-30.2 8.2 0
                                        14.3 22.9 8.3 22.9 15 0 6.3-13.5 5.8-20.7.8l-3.5 6.3c11.2 7.6
                                        32.6 6 32.6-7.5zm35.4 9.3l-2.2-6.8c-3.8 2.1-12.2 4.4-12.2-4.1v-16.6h13.1V392h-13.1v-11.2h-8.2V392h-7.6v7.3h7.6V416c0
                                        17.6 17.3 14.4 22.6 10.9zm13.3-13.4h27.5c0-16.2-7.4-22.6-17.4-22.6-10.6 0-18.2
                                        7.9-18.2 19.3 0 20.5 22.6 23.9 33.8 14.2l-3.8-6c-7.8 6.4-19.6
                                        5.8-21.9-4.9zm59.1-21.5c-4.6-2-11.6-1.8-15.2 4.4V392h-8.2v36.7h8.2V408c0-11.6
                                        9.5-10.1 12.8-8.4l2.4-7.6zm10.6 18.3c0-11.4 11.6-15.1 20.7-8.4l3.8-6.5c-11.6-9.1-32.7-4.1-32.7
                                        15 0 19.8 22.4 23.8 32.7 15l-3.8-6.5c-9.2 6.5-20.7 2.6-20.7-8.6zm66.7-18.3H408v4.4c-8.3-11-29.9-4.8-29.9
                                        13.9 0 19.2 22.4 24.7 29.9 13.9v4.6h8.2V392zm33.7 0c-2.4-1.2-11-2.9-15.2 4.4V392h-7.9v36.7h7.9V408c0-11
                                        9-10.3 12.8-8.4l2.4-7.6zm40.3-14.9h-7.9v19.3c-8.2-10.9-29.9-5.1-29.9 13.9 0 19.4
                                        22.5 24.6 29.9 13.9v4.6h7.9v-51.7zm7.6-75.1v4.6h.8V302h1.9v-.8h-4.6v.8h1.9zm6.6
                                        123.8c0-.5 0-1.1-.3-1.6-.3-.3-.5-.8-.8-1.1-.3-.3-.8-.5-1.1-.8-.5 0-1.1-.3-1.6-.3-.3
                                        0-.8.3-1.4.3-.5.3-.8.5-1.1.8-.5.3-.8.8-.8 1.1-.3.5-.3 1.1-.3 1.6 0 .3 0 .8.3 1.4 0
                                        .3.3.8.8 1.1.3.3.5.5 1.1.8.5.3 1.1.3 1.4.3.5 0 1.1 0 1.6-.3.3-.3.8-.5
                                        1.1-.8.3-.3.5-.8.8-1.1.3-.6.3-1.1.3-1.4zm3.2-124.7h-1.4l-1.6 3.5-1.6-3.5h-1.4v5.4h.8v-4.1l1.6
                                        3.5h1.1l1.4-3.5v4.1h1.1v-5.4zm4.4-80.5c0-76.2-62.1-138.3-138.5-138.3-27.2 0-53.9 8.2-76.5 23.1
                                        72.1 59.3 73.2 171.5 0 230.5 22.6 15 49.5 23.1 76.5 23.1 76.4.1 138.5-61.9 138.5-138.4z"/>
                                        </svg>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className={styles.cardBlock}>
                            <span className={styles.cardTitle}>Введите сумму</span>
                            <input
                                type="number"
                                className={styles.cardInput}
                                onChange={(event) => amountHandler(event)}
                            />
                            <div className={styles.cardAction}>
                                <button className={styles.cardBtn} onClick={payHandler}>Пополнить счет</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.details}>
                    <span className={styles.balanceTxt}>Баланс: </span>
                    <span className={styles.summ}>{user ? user.balance : 0} {Language[til].user.profile.price}</span>
                </div>
            </div>
            {modal ?
            <div className={styles.addCardModal} onClick={(event) => modalHandler(event)}>
                {!smsSubmit ?
                    <div className={styles.modalBody}>
                        <div className={styles.card}>
                            <div className={styles.cardForm}>
                                <div className={styles.inputDiv}>
                                    <input
                                        type="text"
                                        className={styles.cardNumberInput}
                                        placeholder="8600 5678 8909 8765"
                                        onInput={(event) => numberFunc(event)}
                                        onChange={(event) => cardHandler(event)}
                                    />
                                    <span className={styles.inputSpan}/>
                                </div>
                                <div className={styles.inputDiv}>
                                    <div className={styles.miniInputDiv}>
                                        <input
                                            type="text"
                                            className={styles.cardDateInput}
                                            placeholder="06/25"
                                            onInput={(event) => dateHandler(event)}
                                            onChange={(event) => dateChangeHandler(event)}
                                        />
                                        <span className={styles.inputSpan}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={submitHandler} className={styles.submitBtn}>Добавить</button>
                    </div>
                    :
                    <div className={styles.submitDiv}>
                        <span className={styles.smsText}>Код подтверждение отправлен на номер {phone} <br/> пожалуйста потдвердите карту!</span>
                        <input
                            type="number"
                            onChange={(event) => smsHandler(event)}
                            className={styles.cardInput}
                        />
                        <button className={styles.smsButton} onClick={smsSubmitHandler}>Подтвердить</button>
                    </div>
                }
            </div> : ''}
            <div className={isMessage ? (isError ? `${styles.messageBlock} ${styles.messageActive} ${styles.errorBlock}`: `${styles.messageBlock} ${styles.messageActive}`) : styles.messageBlock}>
                <span className={styles.messageText}>{message}</span>
            </div>
            {loading ? <Loader /> : <></>}
        </>
    )
}