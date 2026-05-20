const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.name}: {props.exerciseCount}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} exerciseCount={props.parts[0].exerciseCount} />
      <Part name={props.parts[1].name} exerciseCount={props.parts[1].exerciseCount} />
      <Part name={props.parts[2].name} exerciseCount={props.parts[2].exerciseCount} />
    </div>
  )
}

const Total = (props) => {
  let sum = 0;
  for (const n of props.counts) {
    sum += Number.parseInt(n);
  }

  return (
    <p>Number of exercises: {sum}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content parts={[
        { name: part1, exerciseCount: exercises1 },
        { name: part2, exerciseCount: exercises2 },
        { name: part3, exerciseCount: exercises3 }
      ]} />
      <Total counts={[exercises1, exercises2, exercises3]} />
    </div>
  )
}
export default App
