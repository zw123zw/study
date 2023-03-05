const number = [1, 2, 3, 4, 5]
const listItems = number.map(number => {
  return <li key={number.toString()}>{number}</li>
})

const titles = ['11', '12', '13']

function List(props) {
  return (
    <div>
      <ul>{listItems}</ul>
      <ul>
        {titles.map(titles => (
          <li key={titles}>{titles}</li>
        ))}
      </ul>
    </div>
  )
}

export default List
