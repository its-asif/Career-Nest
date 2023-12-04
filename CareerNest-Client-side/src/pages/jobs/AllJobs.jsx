import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePageTitle from '../shared/usePageTitle';

const AllJobs = () => {
    usePageTitle('CareerNest');
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch all jobs from the API
        fetch('https://career-nest-server.vercel.app/job')
            .then(response => response.json())
            .then(data => setJobs(data))
            .catch(error => console.error('Error fetching jobs:', error));
    }, []);

    // Filter jobs based on the search term
    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="my-10 w-1/3 mx-auto">
                {/* <label className="block text-gray-700 text-sm font-bold mb-2">
                    Search by Job Title
                </label> */}
                <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    placeholder="Search by Job Title"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto text=center">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Created By
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Job Title
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Posting Date
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Application Deadline
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Salary Range
                            </th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {filteredJobs.map((job) => (
                            <tr key={job._id} className='text-center'>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">
                                    {job.postedBy}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    {job.title}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    {new Date(job.postingDate).toLocaleDateString()}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    {new Date(job.applicationDeadline).toLocaleDateString()}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    {job.salaryRange || 'N/A'}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2">
                                    <Link
                                        to={`/singleJob/${job._id}`}
                                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                    >
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllJobs;
