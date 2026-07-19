import {BrowserRouter, Routes, Route, useParams, Link} from "react-router-dom"

const todos = [ 
    {
        id: 1,
        text: "Learn React"
    },
    {
        id: 2,
        text: "Learn Router"
    },
    {
        id: 3,
        text: "Build App"
    }
]

const HomePage = () => {
    return(
        <div>
            {todos.map(item =>(
        <div key={item.id}>
           <h2>{item.text}</h2>
           <Link to={`/todo/${item.id}`}>Details</Link> 
        </div>
            ))}
        </div>
    )
}

const Component = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/todo/:id" element={<Details />} />
            </Routes>
        </BrowserRouter>
    )
}

const Details = () => {
  const {id} = useParams();
  const todo = todos.find(item => item.id === Number(id))
    return(
        <div>
            <h1>To do list</h1>
            <p>{todo?.text}</p>
            <Link to="/">Home</Link>
        </div>
    )
}

export default Component
