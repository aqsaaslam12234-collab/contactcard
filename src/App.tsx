
import './App.css'
import ContactCard from './components/ContactCard'


function App() {
  

  return (
    <>
      <ContactCard 
      id={1} 
      name={'Aqsa'} 
      dob={'07/17/2000'} 
      grossSalary={50000}/>
    </>
  )
}

export default App