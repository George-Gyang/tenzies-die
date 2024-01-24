
const TenziesDie = ({ number, index, hold }) => {

    const check = { backgroundColor: number.isHeld ? "#59e391" : "" }
    // console.log(check)

    return (
        <div onClick={()=> hold(index)} className={number.isHeld ? 'is_held rounded': 'rounded'}>
            <button className="d-flex border-0 inherit_bg tenzies justify-content-center align-items-center p-3 fs-1 fw-bold rounded">{number.value} </button>
        </div>
    )
}

export default TenziesDie