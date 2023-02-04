import logo from './logo.svg'
import './App.css'
import { useGlobalContext } from './context'
import { useState, useRef, useEffect } from 'react'

function App() {
  const [listElement, setListElement] = useState('')
  const { list, setList, sortedList, setSortedList } = useGlobalContext()
  const listContainerRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (typeof listElement === 'string') {
      return console.log('Can not add empty string to list')
    }
    const newList = [...list, listElement]
    setList(newList)
    setListElement('')
  }

  const handleClear = () => {
    setList([])
    setSortedList([])
  }

  const handleSort = () => {
    const tempList = list

    function sortList(arr) {
      const newArr = [...arr]
      for (let o = arr.length; o >= 2; o--) {
        for (let i = 0; i < o - 1; i++) {
          const first = newArr[i]
          const second = newArr[i + 1]
          if (first > second) {
            newArr[i] = second
            newArr[i + 1] = first
          }
        }
        setSortedList(newArr)
      }
    }
    sortList(tempList)
  }

  const getRelativeHeight = (integer) => {
    const maxElement = Math.max(...list)
    if (listContainerRef.current) {
      const listContainerHeight = listContainerRef.current.clientHeight
      return (integer / maxElement) * listContainerHeight
    }
    return null
  }

  useEffect(() => {
    console.log('Only list or sorted list updated')
  }, [list, sortedList])

  return (
    <section className="section">
      <h2>Sorting</h2>
      <div className="unsorted-container">
        <h3>List: </h3>
        <div className="list-container" ref={listContainerRef}>
          {list.map((item, index) => {
            return (
              <span
                key={index}
                className="list-item"
                style={{
                  height: getRelativeHeight(item)
                    ? getRelativeHeight(item)
                    : item * 2 + 'px',
                }}
              >
                {item}
              </span>
            )
          })}
        </div>
      </div>
      <div className="sorted-container">
        <h3>Sorted List: </h3>
        <div className="list-container">
          {sortedList.map((item, index) => {
            return (
              <span
                key={index}
                className="list-item"
                style={{
                  height: getRelativeHeight(item)
                    ? getRelativeHeight(item)
                    : item * 2 + 'px',
                }}
              >
                {item}
              </span>
            )
          })}
        </div>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="element">List Element</label>
        <input
          type="number"
          id="element"
          value={listElement}
          onChange={(e) => setListElement(parseInt(e.target.value))}
        />
        <button type="submit">Enter</button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
        <button type="button" onClick={handleSort}>
          Sort
        </button>
      </form>
    </section>
  )
}

export default App
