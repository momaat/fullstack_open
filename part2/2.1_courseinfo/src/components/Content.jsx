import Part from "./Part"



const Content = ({parts}) => {

    var totalAmount = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <div>
            <ul>
                {parts.map(part => 
                    <Part key={part.id} part={part.name} exercises={part.exercises} />
                )}
            </ul>
            <p><strong>Total of {totalAmount} exercises</strong></p>
            
        </div>
    )
}

export default Content