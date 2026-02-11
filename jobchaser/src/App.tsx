import './App.css';
import JobList from "./components/JobList"; 
import { jobs } from './data'; // here we are importing the job data from data.ts

function App () {
  return (
    <div className="app-container">
      <h1>JobChaser</h1>
      <JobList jobs={jobs} /> {/* Here we pass the jobs data to the JobList component */}
    </div>
  );
}

export default App;