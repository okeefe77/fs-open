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
      {parts.map(p => <Part key={p.id} part={p} />)}
    </div>
  )
}

const Total = ({ course: { parts } }) => {
  let sum = parts.reduce((acc, p) => acc + p.exercises, 0);
  return (
    <p><strong>Total number of exercises: {sum}</strong></p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course;