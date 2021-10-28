import { colors } from "../services/config"


const getRandColor = () => {
    const randomNumber = Math.floor(Math.random() * colors.length)
    return colors[randomNumber]
}

export default getRandColor