import './App.css'
import Navbar from './components/Navbar'
interface AppProps {
  children: React.ReactNode
}

function App({children}: AppProps) {

  return (
    <>
      <Navbar/>
      <main>
        {children}
      </main>
    </>
  )
}

export default App
