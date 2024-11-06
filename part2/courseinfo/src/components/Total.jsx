const Total = ({ exercises }) => {
    let total = 0

    total = exercises.reduce((sum, part) => {
        return part.exercises + sum
    }, 0);
  
    return <h4>total of exercises {total}</h4>;
  };
  
  export default Total;