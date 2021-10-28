
import React, { memo, useContext, } from "react";
import AppContext from "../contexts/AppContext.jsx";
import Loader from "./Loader.jsx";
import Call from "./Call.jsx"


const ActivityFeed = ({ activities }) => {

    const { loading } = useContext(AppContext)


    return <div className="activities">
        {
            activities.map((activity, index) => <Call key={activity.id} activity={activity} />)
        }
        {loading
            ? <Loader />
            : activities.length === 0 && <h1>There are no activities</h1>}
    </div>
}

export default memo(ActivityFeed)