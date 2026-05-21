const Header = ({ course: { name } }) => {
  return (
    <h1>{name}</h1>
  )
}

const Part = ({ part: { name, exercises } }) => {
  return (
    <p>{name}: {exercises}</p>
  )
}

const Content = ({ course: { parts } }) => {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  )
}

const Total = ({ course: { parts } }) => {
  let sum = 0;
  for (const p of parts) {
    sum += Number.parseInt(p.exercises);
  }

  return (
    <p>Number of exercises: {sum}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 }
    ]
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}
export default App
