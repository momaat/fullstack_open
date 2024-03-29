import Header from "./Header"
import Content from "./Content"

const Course = (props) => {
    return (
        <div>
            <Header title={props.course.name} />
            <Content parts={props.course.parts}/>
        </div>
    )
}

export default Course