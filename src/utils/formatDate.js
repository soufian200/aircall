import { monthNames } from "../services/config"



function formatDate(createdAt) {

    const date = new Date(createdAt)

    const monthName = monthNames[date.getMonth()]

    return ` ${date.getHours()}:${date.getMinutes()} - ${monthName} ${date.getDay()}`
}

export default formatDate