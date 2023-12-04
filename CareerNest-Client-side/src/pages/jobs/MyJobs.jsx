import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import usePageTitle from '../shared/usePageTitle';

const MyJobs = () => {
    usePageTitle('CareerNest');
    const { user, loading } = useContext(AuthContext);
    const [myJobs, setMyJobs] = useState([]);

    useEffect(() => {
        if (!loading && user) {
            const email = user.email;
            
            fetch(`https://career-nest-server.vercel.app/user/${email}`)
                .then(res => res.json())
                .then(userData => setMyJobs(userData.myJobs))
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [user, loading]);

    return (
        <div>
            <h2 className="text-3xl font-extrabold text-center mb-10 md:mt-10">My Jobs</h2>
            <div className="overflow-x-auto text-center">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Job Title
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Job Category
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Posting Date
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Application Deadline
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Salary
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {myJobs.map((jobId) => (
                            <MyJobRow key={jobId} jobId={jobId} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const MyJobRow = ({ jobId }) => {
    const [jobData, setJobData] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        
        fetch(`https://career-nest-server.vercel.app/job/${jobId}`)
            .then(res => res.json())
            .then(data => setJobData(data))
            .catch(error => console.error('Error fetching job data:', error));

    }, [jobId]);

    const handleDeleteJob = (jobId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        })
        .then( (result) =>{
            if (result.isConfirmed) {
                const email = user.email;
                console.log(jobId);
                
                fetch(`https://career-nest-server.vercel.app/user/${email}`)
                .then(res => res.json())
                .then(data => {
                    const myJobs = data.myJobs;
                    const updatedMyJobs = myJobs.filter(id => id !== jobId);
                    console.log(updatedMyJobs);
                    
                    fetch(`https://career-nest-server.vercel.app/user/${email}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ myJobs: updatedMyJobs })
                    })
                        .then(res => res.json())
                        .then(data => {
                            
                        })
                        .catch(error => console.error('Error updating user data:', error));
                });

                

                fetch(`https://career-nest-server.vercel.app/job/${jobId}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        window.location.reload();
                    })
                    .catch(error => console.error('Error deleting job:', error));

                    
            }

        })

    };

    if (!jobData) {
        return null; 
    }

    return (
        <tr>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {jobData.title}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {jobData.jobCategory}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {new Date(jobData.postingDate).toLocaleDateString()}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {new Date(jobData.applicationDeadline).toLocaleDateString()}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                ${jobData.salaryRange}
            </td>
            <td className="whitespace-nowrap px-4 py-2">
                <Link to={`/updateJob/${jobId}`} className="inline-block rounded bg-blue-500 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 mr-2">
                    Update
                </Link>
                <button className="inline-block rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-700" onClick={() => handleDeleteJob(jobId)}>
                    Delete
                </button>
            </td>
        </tr>
    );
};



export default MyJobs;
