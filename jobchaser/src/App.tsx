import JobList from "./components/JobList";
import { jobs } from './data'; // Importing the job data from data.ts

function App () {
  return (
    <div>
      <h1>JobChaser</h1>
      <JobList jobs={jobs} /> {/* Here we pass the jobs data to the JobList component */}
    </div>
  );
}

export default App;