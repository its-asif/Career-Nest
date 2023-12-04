import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import usePageTitle from '../shared/usePageTitle';

const SingleJob = () => {
    usePageTitle('CareerNest');
    const { user, loading } = useContext(AuthContext);
    const username = user?.displayName;
    const email = user?.email;

    const { id } = useParams(); // Get the job ID from the URL
    const [job, setJob] = useState(null);

    if (loading) {
        return <div>Loading...</div>;
      }

    useEffect(() => {
        // Fetch the job details based on the ID
        fetch(`https://career-nest-server.vercel.app/job/${id}`)
            .then((response) => response.json())
            .then((data) => setJob(data))
            .catch((error) => console.error('Error fetching job details:', error));
    }, [id]);

    if (!job) {
        return <div>Loading...</div>;
    }

    const isDeadlineOver = new Date() > new Date(job.applicationDeadline);

    // Check if the user is the employer
    const isEmployer = username === job.postedBy;
    // console.log(username, job.postedBy)

    const handleApplyClick = () => {
        
        if (isDeadlineOver) {
            toast.error('Application deadline has passed. Cannot apply.');
        } else if (isEmployer) {
            toast.error('Employers cannot apply for their own jobs.');
        } else {
            document.getElementById('applyModal').showModal();
        }
    };


const handleApplicationSubmission = async (e) => {
  e.preventDefault();

  try {
    // Fetch user data
    const userDataResponse = await fetch('https://career-nest-server.vercel.app/user');
    const userData = await userDataResponse.json();

    const user = userData.find((user) => user.email === email);

    if (!user) {
      toast.error('User not found. Unable to submit application.');
      return;
    }

    const appliedJobs = user.appliedJobs || [];

    if (appliedJobs.includes(id)) {
      toast.error('You have already applied for this job');
      document.getElementById('applyModal').close();
      return;
    }

    appliedJobs.push(id);
    const updatedUser = { ...user, appliedJobs };

    // Update user data on the server
    const userUpdateResponse = await fetch(`https://career-nest-server.vercel.app/user/${email}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    const userUpdateData = await userUpdateResponse.json();

    if (userUpdateData.modifiedCount > 0) {
      

      // Fetch job data
      const jobDataResponse = await fetch(`https://career-nest-server.vercel.app/job/${id}`);
      const jobData = await jobDataResponse.json();

      const appliedUsers = jobData.appliedUsers || [];
      const newApplicant = { email, resumeLink: document.getElementById('resumeLink').value };

      appliedUsers.push(newApplicant);
      const updatedJob = { ...jobData, appliedUsers };

      // Update job data on the server
      const jobUpdateResponse = await fetch(`https://career-nest-server.vercel.app/job/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(updatedJob),
      });

      const jobUpdateData = await jobUpdateResponse.json();

      if (jobUpdateData.modifiedCount > 0) {
        toast.success('Applied Successfully');
        document.getElementById('applyModal').close();
      }
    }
  } catch (error) {
    console.error('Error submitting application:', error);
    toast.error('An error occurred while processing your application.');
  }
};

    

    return (
        <div className="p-4">
            <Toaster />
            <div className="max-w-sm mx-auto bg-white rounded-md overflow-hidden shadow-md">
                <img
                    src={job.image}
                    alt="Job Banner"
                    className="w-full h-56 object-cover"
                />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{job.title}</div>
                    <p className="text-gray-700 text-base">{job.description}</p>
                    <div className="mt-4 flex items-center gap-8 text-xs">
                        <div>
                            <p className="text-gray-500">Posting Date</p>
                            <p className="font-medium">{new Date(job.postingDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Application Deadline</p>
                            <p className="font-medium">{new Date(job.applicationDeadline).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Salary Range</p>
                            <p className="font-medium">{job.salaryRange || 'N/A'}</p>
                        </div>
                    </div>
                </div>
                <div className="px-6 py-4">
                    <button
                        onClick={handleApplyClick}
                        className={`bg-indigo-500 text-white py-2 px-4 rounded-full ${
                            isDeadlineOver || isEmployer ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                    >
                        Apply
                    </button>
                </div>
            </div>

            {/* Apply Modal */}
            <dialog id="applyModal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Apply for {job.title}</h3>
                    <form method="dialog">
                        <div className="mt-4">
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                className="input input-bordered w-full"
                                value={username}
                                readOnly
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="input input-bordered w-full"
                                value={email}
                                readOnly
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-700">
                                Resume Link
                            </label>
                            <input
                                type="text"
                                id="resumeLink"
                                className="input input-bordered w-full"
                                placeholder="Enter your resume link"
                            />
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button type="submit" onClick={handleApplicationSubmission} className="btn btn-primary">
                                Submit Application
                            </button>
                        </div>
                    </form>
                    <button
                        className="btn btn-link mt-4"
                        onClick={() => document.getElementById('applyModal').close()}
                    >
                        Close
                    </button>
                </div>
            </dialog>
        </div>
    );
};

export default SingleJob;
