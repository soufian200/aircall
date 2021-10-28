import React, { useContext, useState } from "react";
import { BsTelephoneInbound, BsTelephoneOutbound } from "react-icons/bs"
import { MdCallMissed } from "react-icons/md"
import { BiArchiveIn, BiArchiveOut, } from "react-icons/bi";
import axios from "axios";
import Profile from "./Profile.jsx";
import formatDate from "../utils/formatDate.js";
import Loader from "./Loader.jsx";
import AppContext from "../contexts/AppContext.jsx";
import { tabsTitles } from "../services/config.js";


function Call({ activity, index }) {


    const [loading, setLoading] = useState(false)

    const { setCallId, crrPage, setCrrPage, activities, setActivities, } = useContext(AppContext)

    const { id, created_at, direction, call_type, from, to, via, } = activity;



    const handleCallPressed = () => {

        setCallId(id)
        setCrrPage(tabsTitles.detail)

    }


    /**
     * When user try to archive | unarchive
     * */
    const handleArchive = (e) => {

        e.stopPropagation()

        let data;

        if (crrPage === tabsTitles.feed) {

            // archive call
            data = {
                is_archived: true
            }
        } else {

            // unarchive call
            data = {
                is_archived: false
            }

        }

        // when start send post request show loader
        setLoading(true);

        // send post request to archive or unarchive
        axios.post(`/activities/${id}`, data).then(({ data: updatedCall }) => {

            // remove old call from activities
            const filteredActivities = activities.filter(activity => activity.id !== id)

            // combine old activities with the new updated one
            setActivities([...filteredActivities, updatedCall])

            // hide loder after updating call
            setLoading(false)
        })
    }


    return <div className="call" onClick={handleCallPressed}>
        <div className="account center">
            <Profile index={index} />
        </div>
        <div className="info">
            <h2 className="number">{to === null ? "Anonymous" : to}</h2>
            <div className="call_info">
                <div className="center">
                    {call_type === "missed"
                        ? <MdCallMissed color="red" size={20} />
                        : direction === "outbound" ? <BsTelephoneOutbound size={15} /> : <BsTelephoneInbound size={15} />
                    }
                </div>
                <h3 className="date">
                    {formatDate(created_at)}
                </h3>
                <h3 className="via">{via}</h3>
            </div>

        </div>
        <div className="recall center">
            <div
                className="vertical-dots center"
                onClick={handleArchive}
                title={crrPage === tabsTitles.feed ? "archive" : "unarchive"}
            >

                {loading
                    ? <Loader size={24} />
                    : crrPage === tabsTitles.feed
                        ? <BiArchiveIn size={24} />
                        : <BiArchiveOut size={24} />}
            </div>

        </div>
    </div>

}

export default Call