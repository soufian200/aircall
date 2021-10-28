import React from "react";
import { RiUser6Line } from "react-icons/ri";
import getRandColor from "../utils/getRandColor";

function Profile() {

    return <div className="profile center" style={{ background: getRandColor() }}>
        <RiUser6Line size={30} />
    </div>
}
export default Profile