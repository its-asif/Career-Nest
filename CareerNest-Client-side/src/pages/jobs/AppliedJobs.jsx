import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import usePageTitle from '../shared/usePageTitle';
import { usePDF } from 'react-to-pdf';

const AppliedJobs = () => {
    usePageTitle('CareerNest');
  const { user, loading } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]); 
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('select');
  const { toPDF, targetRef } = usePDF({ filename: 'applied-jobs.pdf' });

  useEffect(() => {
    if (!loading && user) {
      const email = user.email;

      fetch('https://career-nest-server.vercel.app/job')
      .then((res) => res.json())
      .then((data) => {
          setJobs(data);
      });      

      fetch(`https://career-nest-server.vercel.app/user/${email}`)
        .then((res) => res.json())
        .then((userData) => {
            setAppliedJobs(userData.appliedJobs);
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [user, loading]);
 
  


  
   const myJobs = jobs.filter(job => appliedJobs.includes(job._id));
    console.log(filteredJobs);


    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
    
        if(category === 'select') {
            // put empty array
            setFilteredJobs([]);
        }
        else if (category === 'All') {
          setFilteredJobs(myJobs);
        } else {
          const filtered = myJobs.filter((job) => job.jobCategory === category);
          setFilteredJobs(filtered);
        }
      };

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-center mb-6">Applied Jobs</h2>
      <div className="mb-4">
        <label htmlFor="category" className="text-gray-700">
          Filter by Job Category:
        </label>
        <select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="ml-2 p-2 border rounded-md"
        >
          <option value="select" disabled selected>Select Category</option>
          <option value="All" >All</option>
          <option value="On Site">On Site</option>
          <option value="Remote">Remote</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>
      <div className="overflow-x-auto">
       <div ref={targetRef}>
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            
            <thead className="ltr:text-left rtl:text-right">
            <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Job Title</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Job Category</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Posted By</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Posting Date</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Application Deadline</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Salary Range</th>
                
            </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200 text-center">
            {filteredJobs.map((job) => (
                <tr key={job._id}>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{job.title}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{job.jobCategory}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{job.postedBy}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{job.postingDate}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{job.applicationDeadline}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{job.salaryRange}</td>
                </tr>
            ))}
            </tbody>
        </table>
       </div>
      </div>
      <button 
      className="block w-full mx-auto mt-10 rounded bg-[#ffa00d] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#cc990a] focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
        onClick={() => toPDF()}>Download PDF</button>

    </div>
  );
};

export default AppliedJobs;
