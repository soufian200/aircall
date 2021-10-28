
import React, { memo, useContext, useEffect, useState } from "react";
import AppContext from "../contexts/AppContext.jsx";
import Call from "./Call.jsx";
import Loader from "./Loader.jsx";


const Archived = ({ archivedActivities }) => {

    const { loading } = useContext(AppContext)


    return <div className="archived">
        {archivedActivities.map((activity, index) => <Call key={activity.id} activity={activity} index={index} />)}
        {archivedActivities.length === 0 && <h1>There are no archived activities</h1>}
        {loading && <Loader />}
    </div>
}

export default memo(Archived)