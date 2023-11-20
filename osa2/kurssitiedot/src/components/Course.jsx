

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>

    )

}

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}


const Content = ({parts}) => {
    return (
        <div>
            <ul>
                {parts.map((part) =>
                    <li key={part.id}>
                        <Part part={part.name} exercises={part.exercises}/>
                    </li>
                )}
            </ul>
        </div>
    )
}


const Part = (props) => {
    return (
        <div>
            <p>{props.part} {props.exercises} </p>
        </div>
    )
}

const Total = ({parts}) => {

    const addParts = () => {
        const sum = parts.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.exercises
        }, 0)
        return sum
    }

    return (
        <div>
            <p>Number of exercises {addParts()}</p>
        </div>
    )
}

export default Course
