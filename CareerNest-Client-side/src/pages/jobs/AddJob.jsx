import React, { useContext, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../../provider/AuthProvider';
import usePageTitle from '../shared/usePageTitle';

const AddJob = () => {
    usePageTitle('CareerNest');
    const {user, logOut} = useContext(AuthContext);
    const username = user?.displayName;
    const email = user?.email;

    const [applicationDeadline, setApplicationDeadline] = useState(new Date().toISOString().split('T')[0]);

    const handleDateChange = (e) => {
        setApplicationDeadline(e.target.value);
    };

    const [salaryRange, setSalaryRange] = useState(0);

    const handleSalaryChange = (e) => {
        setSalaryRange(e.target.value);
    };

    const handleAddJob = event => {
        event.preventDefault();
        const form = event.target;

        const title = form.title.value;
        const jobCategory = form.jobCategory.value;
        const image = form.image.value;
        const postedBy = form.postedBy.value;
        const description = form.description.value;
        const postingDate = new Date().toISOString(); // Current date and time
        const applicationDeadline = form.applicationDeadline.value;
        const applicantsNumber = 0; // Default value
        const salaryRange = form.salaryRange.value;

        const newJob = {
            title,
            jobCategory,
            image,
            postedBy,
            description,
            postingDate,
            applicationDeadline,
            applicantsNumber,
            salaryRange,
            applicants: [],
        };
        // console.log(newJob);

        fetch('https://career-nest-server.vercel.app/job', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newJob),
        })
            .then(res => res.json())
            .then(data => {
                // show toast
                if (data.insertedId) {
                    // console.log(data.insertedId)
                    toast.success('Job Added Successfully');
                }

                // add data.insertedId to user's myJobs array
                fetch(`https://career-nest-server.vercel.app/user/${email}`)
                    .then(res => res.json())
                    .then(usr => {
                        const myJobs = usr.myJobs;
                        myJobs.push(data.insertedId);
                        const updatedUser = {...usr, myJobs: myJobs};

                        // update user data
                        fetch(`https://career-nest-server.vercel.app/user/${email}`,{
                            method: 'PUT',
                            headers:{
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(updatedUser)
                        
                        })
                            .then(res => res.json())
                            .then(data => {
                                
                            })
                    })
            });
    };

    return (
        <div className="bg-[#F4F3F0] p-10 md:p-24 w-full">
            <Toaster />
            <h2 className="text-3xl font-extrabold text-center mb-10 md:-mt-10">Add Job</h2>
            <form onSubmit={handleAddJob}>
                {/* Job Title & Job Category */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2 mx-2">
                        <label className="label">
                            <span className="label-text">Job Title</span>
                        </label>
                        <label className="input-group">
                            <input type="text" placeholder="Job Title" name="title" className="w-full input input-bordered " />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 mx-2">
                        <label className="label">
                            <span className="label-text">Job Category</span>
                        </label>
                        <label className="input-group">
                            <select className="select select-bordered w-full " name="jobCategory">
                                <option disabled selected>Select Job Category</option>
                                <option>On Site</option>
                                <option>Remote</option>
                                <option>Part-Time</option>
                                <option>Hybrid</option>
                            </select>
                        </label>
                    </div>
                </div>

                {/* img & Job Posted by */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2 mx-2">
                        <label className="label">
                            <span className="label-text">Image Link</span>
                        </label>
                        <label className="input-group">
                            <input type="text" placeholder="Image Link" name="image" className="w-full input input-bordered " />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 mx-2">
                        <label className="label">
                            <span className="label-text">Job Posted By</span>
                        </label>
                        <label className="input-group">
                            <input type="text" value={username} placeholder="Job Posted By" name="postedBy" className="w-full input input-bordered "  />
                        </label>
                    </div>
                </div>


                {/* Job Posting Date & Application Deadline */}
            <div className="md:flex mb-8">
                <div className="form-control md:w-1/2 mx-2">
                    <label className="label">
                        <span className="label-text">Job Posting Date</span>
                    </label>
                    <label className="input-group">
                        <input type="text" value={new Date().toLocaleDateString()} className="w-full input input-bordered" readOnly />
                    </label>
                </div>
                <div className="form-control md:w-1/2 mx-2">
                    <label className="label">
                        <span className="label-text">Application Deadline</span>
                    </label>
                    <label className="input-group">
                        <input
                            type="date"
                            value={applicationDeadline}
                            onChange={handleDateChange}
                            className="w-full input input-bordered"
                            name="applicationDeadline"
                        />
                    </label>
                </div>
            </div>

            {/* Job Applicants Number */}
            <div className="md:flex mb-8">
                <div className="form-control w-1/2 mx-2">
                    <label className="label">
                        <span className="label-text">Job Applicants Number</span>
                    </label>
                    <label className="input-group">
                        <input type="number" value="0" className="w-full input input-bordered" />
                    </label>
                </div>
                {/* Salary Range */}
                <div className="form-control md:w-1/2 mx-2">
                    <div className="form-control w-full mx-2">
                    <label className="label">
                        <span className="label-text">Salary Range</span>
                    </label>
                    <label className="input-group">
                        <input
                            type="range"
                            min={0}
                            max={1000}
                            value={salaryRange}
                            onChange={handleSalaryChange}
                            className="range"
                            name="salaryRange"
                        />
                        <span className="text-lg text-gray-500 items-center">{salaryRange}$</span>
                    </label>
                        
                    </div>
                </div>
            </div>

                {/*Job Description */}
                <div className="md:flex mb-8">
                    <div className="form-control w-full mx-2">
                        <label className="label">
                            <span className="label-text">Job Description</span>
                        </label>
                        <label className="input-group">
                            <textarea className="textarea textarea-bordered h-24 w-full" placeholder="Add short description" name="description"></textarea>
                        </label>
                    </div>
                </div>
                
                            <input type="submit" value="Add Job" className="btn btn-block btn-neutral" />
                        </form>
        </div>
    );
};

export default AddJob;
