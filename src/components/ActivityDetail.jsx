import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsTelephoneInbound, BsTelephoneOutbound, BsVoicemail } from "react-icons/bs";
import { MdCallMissed, MdOutlinePhone, MdOutlinePhoneMissed } from "react-icons/md";
import { RiUser6Line } from "react-icons/ri";
import formatDate from "../utils/formatDate";
import getRandColor from "../utils/getRandColor";
import Loader from "./Loader.jsx";
import Profile from "./Profile.jsx";



function ActivityDetail({ callId }) {

    const [caller, setCaller] = useState()
    const [duration, setDuration] = useState()
    const [loading, setLoading] = useState()
    const [callType, setCallType] = useState()
    const [direction, setDirection] = useState()

    const [properties, setProperties] = useState([])


    useEffect(() => {

        // show loader
        setLoading(true)

        axios.get(`/activities/${callId}`).then(({ data }) => {

            // hide loader
            setLoading(false)

            const { from, to, created_at, via, duration, direction, is_archived, call_type } = data

            // direction
            setDirection(direction)

            // call type
            setCallType(call_type)

            // who calls
            setCaller(to)

            // set duration of call
            setDuration(Number(duration))

            // set some properties
            setProperties([
                {

                    key: "From",
                    value: from
                },
                {

                    key: "to",
                    value: to
                },
                {

                    key: "date",
                    value: formatDate(created_at)
                },
                {

                    key: "via",
                    value: via
                },
                {

                    key: "archived",
                    value: is_archived ? "yes" : "no"
                },
            ])


        });


    }, [])

    const formatDuration = duration => {
        const mins = Math.floor(duration / 60)
        const secs = duration - (60 * mins)

        if (mins === 0) {
            return `${secs} sec`
        }

        else if (secs === 0) {
            return `${mins} min`
        } else {

            return `${mins} min ${secs} sec`
        }

    }






    return <div>


        {loading
            ? <Loader />
            : <div>
                <div className="center call-profile" >
                    <Profile />
                    <h1 className="to">{caller}</h1>
                </div>
                <div className="info_call">
                    <div className="center info">
                        {callType === "missed" && <MdOutlinePhoneMissed size={30} color="red" />}
                        {callType === "answered" && <MdOutlinePhone size={30} color="green" />}
                        {callType === "voicemail" && <BsVoicemail size={30} color="#75b7d7" />}

                        <h2 className="label">{callType}</h2>
                    </div>
                    <div className="center info">
                        {direction === "outbound"
                            ? <BsTelephoneOutbound size={20} color="green" />
                            : <BsTelephoneInbound size={20} color="green" />}

                        <h2 className="label">{direction}</h2>
                    </div>
                    <div className="center info duration-contianer">
                        <h1 className="duration">{formatDuration(duration)}</h1>
                        <h2 className="label">duration</h2>
                    </div>
                </div>


                {
                    properties.map(({ key, value }, index) => {
                        return <div className="property" key={index}>
                            <h1 className="key"> {key}:</h1>
                            <p className="value">{value}</p>
                        </div>
                    })
                }


            </div>
        }
    </div>
}

export default ActivityDetail;