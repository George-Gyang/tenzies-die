import { FifthFace, FirstFace, FourthFace, SecondFace, SixFace, ThirdFace } from "./DieFaces"

const TenziesDie = ({ number, index, hold }) => {

    // const check = { backgroundColor: number.isHeld ? "#59e391" : "" }
    // console.log(number)
    const getDieFunc = () => {
        if (number.value === 1) {
            return <FirstFace />
        } else if (number.value === 2) {
            return <SecondFace />
        } else if (number.value === 3) {
            return <ThirdFace />
        } else if (number.value === 4) {
            return <FourthFace />
        } else if (number.value === 5) {
            return <FifthFace />
        } else {
            return <SixFace />
        }
    }
    // console.log(dot)
    return (
        <div onClick={() => hold(index)} className={number.isHeld ? 'is_held rounded' : 'rounded'}>
            <button className=" border-0 inherit_bg tenzies p-2 w-100 h-100 rounded">{getDieFunc()} </button>
        </div>
    )
}

export default TenziesDie