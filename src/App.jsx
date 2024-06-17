import { Canvas } from './components/Canvas/Canvas.jsx'
import { AddedNode } from './components/AddedNode/AddedNode.jsx'
import { ShowData } from './components/ShowData/ShowData.jsx'

import './App.css'

function App() {
  return (<><Canvas />
    <div className='box-btns'>
      <AddedNode /><ShowData />
    </div>
  </>)
}



export default App