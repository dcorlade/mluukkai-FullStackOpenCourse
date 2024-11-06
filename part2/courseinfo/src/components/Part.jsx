const Part = ({name, exercises}) => {
    console.log("name", name, "exercises", exercises)
    return (
        <p>
            {name} {exercises}
        </p>
    )
}
    
export default Part