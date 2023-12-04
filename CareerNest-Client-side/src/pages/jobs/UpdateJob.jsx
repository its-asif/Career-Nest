import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import usePageTitle from '../shared/usePageTitle';

const UpdateJob = () => {
    usePageTitle('CareerNest');
    const { loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
      }


    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [jobCategory, setJobCategory] = useState('');
    const [image, setImage] = useState('');
    const [postedBy, setPostedBy] = useState('');
    const [description, setDescription] = useState('');
    const [postingDate, setPostingDate] = useState('');
    const [applicationDeadline, setApplicationDeadline] = useState('');
    const [applicantsNumber, setApplicantsNumber] = useState(0);
    const [salaryRange, setSalaryRange] = useState(0);
    const [applicants, setApplicants] = useState([]);
    

    const handleDateChange = (e) => {
        setApplicationDeadline(e.target.value);
    };


    const handleSalaryChange = (e) => {
        setSalaryRange(e.target.value);
    };

    useEffect(() => {
    fetch(`https://career-nest-server.vercel.app/job/${id}`)
        .then(res => res.json())
        .then(data =>{
             const {title, jobCategory, image, postedBy, description, postingDate, applicationDeadline, applicantsNumber, salaryRange, applicants} = data;
                setTitle(title);
                setJobCategory(jobCategory);
                setImage(image);
                setPostedBy(postedBy);
                setDescription(description);
                setPostingDate(postingDate.split('T')[0]);
                setApplicationDeadline(applicationDeadline);
                setApplicantsNumber(applicantsNumber);
                setSalaryRange(salaryRange);
                setApplicants(applicants);
            });
        }, []);

        // setPostingDate(new Date().toISOString().split('T')[0]);

        const handleUpdateJob = (e) => {
            // put in the database
            e.preventDefault();
            const form = e.target;
            
            const title = form.title.value;
            const jobCategory = form.jobCategory.value;
            const image = form.image.value;
            const postedBy = form.postedBy.value;
            const description = form.description.value;
            // const postingDate = form.postingDate.value;
            const applicationDeadline = form.applicationDeadline.value;
            // const applicantsNumber = form.applicantsNumber.value;
            const salaryRange = form.salaryRange.value;
            // const applicants = form.applicants.value;

            const newJob = { title, jobCategory, image, postedBy, description, postingDate, applicationDeadline, applicantsNumber, salaryRange, applicants };

            fetch(`https://career-nest-server.vercel.app/job/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newJob)
            })
                .then(res => res.json())
                .then(data => {
                    if(data.modifiedCount > 0) {
                        toast.success('Job updated successfully!');
                        form.reset();
                    }
                })
                .catch(error => console.error( error));
        }
        

    return (
        <div className="bg-[#F4F3F0] p-10 md:p-24 w-full">
            <Toaster />
            <h2 className="text-3xl font-extrabold text-center mb-10 md:-mt-10">Add Job</h2>
            <form onSubmit={handleUpdateJob}>
                {/* Job Title & Job Category */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2 mx-2">
                        <label className="label">
                            <span className="label-text">Job Title</span>
                        </label>
                        <label className="input-group">
                            <input defaultValue={title} type="text" placeholder="Job Title" name="title" className="w-full input input-bordered " />
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
                            <input defaultValue={image} type="text" placeholder="Image Link" name="image" className="w-full input input-bordered " />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 mx-2">
                        <label className="label">
                            <span className="label-text">Job Posted By</span>
                        </label>
                        <label className="input-group">
                            <input type="text" 
                            defaultValue={postedBy}
                            readOnly
                            placeholder="Job Posted By" name="postedBy" className="w-full input input-bordered "  />
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
                        <input type="text" 
                        defaultValue={ postingDate}
                        className="w-full input input-bordered" readOnly />
                    </label>
                </div>
                <div className="form-control md:w-1/2 mx-2">
                    <label className="label">
                        <span className="label-text">Application Deadline</span>
                    </label>
                    <label className="input-group">
                        <input
                            type="date"
                            defaultValue={applicationDeadline}
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
                        <input type="number" defaultValue={applicantsNumber} className="w-full input input-bordered" />
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
                            defaultValue={salaryRange}
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
                            <textarea defaultValue={description} className="textarea textarea-bordered h-24 w-full" placeholder="Add short description" name="description"></textarea>
                        </label>
                    </div>
                </div>
                
                            <input type="submit" value="Update Job" className="btn btn-block btn-neutral" />
                        </form>
        </div>
    );
};

export default UpdateJob;