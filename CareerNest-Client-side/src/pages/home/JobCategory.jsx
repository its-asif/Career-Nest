import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { AuthContext } from '../../provider/AuthProvider';
import { Link } from 'react-router-dom';

const JobCategory = () => {
    const { loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
      }

    // fetch all data
    const [jobs, setJobs] = useState([]);
    const [onSiteJobs, setOnSiteJobs] = useState([]);
    const [remoteJobs, setRemoteJobs] = useState([]);
    const [hybridJobs, setHybridJobs] = useState([]);
    const [partTimeJobs, setPartTimeJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await fetch('https://career-nest-server.vercel.app/job');
            const data = await response.json();
            setJobs(data);
        };
        fetchJobs();
    }, []);

    // filter data form jobs
    useEffect(() => {
        const onSiteJobs = jobs.filter(job => job.jobCategory === 'On Site');
        setOnSiteJobs(onSiteJobs);

        const remoteJobs = jobs.filter(job => job.jobCategory === 'Remote');
        setRemoteJobs(remoteJobs);

        const hybridJobs = jobs.filter(job => job.jobCategory === 'Hybrid');
        setHybridJobs(hybridJobs);

        const partTimeJobs = jobs.filter(job => job.jobCategory === 'Part-Time');
        setPartTimeJobs(partTimeJobs);

    }, [jobs]);




    return (
        <div className='my-10 lg:mx-10'>
            <Tabs >
                <TabList>
                    <Tab>All Jobs</Tab>
                    <Tab>On Site Job</Tab>
                    <Tab>Remote Job</Tab>
                    <Tab>Hybrid</Tab>
                    <Tab>Part Time</Tab>
                </TabList>

                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 m-10'>
                            {
                                jobs.map(job =>
                                    <div key={job._id} className={`card bg-base-100 shadow-xl h-full`}>
                                        {/* {"_id":"654a2bc8b72b9989af87ff46","title":"VIP Kajer lok","jobCategory":"On Site","image":"https://www.startech.com.bd/image/cache/catalog/laptop/microsoft/surface-pro-9/surface-pro-9-graphite-01-500x500.webp","postedBy":"EDU","description":"khub valo kaj","postingDate":"2023-11-07T12:21:28.772Z","applicationDeadline":"2023-11-13","applicantsNumber":0} */}
                                        <figure ><img src={job.image} className='h-56 ' /></figure>
                                        <div className="card-body">
                                            <h2 className="card-title">Title : {job.title}</h2>
                                            <p className="card-subtitle"><b> Job Category :</b> {job.jobCategory}</p>
                                            <p className="card-subtitle"><b> Posted By : </b>{job.postedBy}</p>
                                            <p className="card-subtitle"><b> Posting Date : </b>{ job.postingDate }</p>
                                            <p className="card-subtitle"><b> Application Deadline : </b>{job.applicationDeadline}</p>
                                            <p className="card-subtitle"><b> Applicants Number : </b>{job.applicantsNumber}</p>
                                            <p className="card-subtitle"><b> Description : </b>{job.description}</p>
                                            <Link to={`http://localhost:5173/singleJob/${job._id}`}><button className="btn btn-primary">View Details</button></Link>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 m-10'>
                            {
                                onSiteJobs.map(job =>
                                    <div key={job._id} className={`card bg-base-100 shadow-xl h-full`}>
                                        {/* {"_id":"654a2bc8b72b9989af87ff46","title":"VIP Kajer lok","jobCategory":"On Site","image":"https://www.startech.com.bd/image/cache/catalog/laptop/microsoft/surface-pro-9/surface-pro-9-graphite-01-500x500.webp","postedBy":"EDU","description":"khub valo kaj","postingDate":"2023-11-07T12:21:28.772Z","applicationDeadline":"2023-11-13","applicantsNumber":0} */}
                                        <figure ><img src={job.image} className='h-56 ' /></figure>
                                        <div className="card-body">
                                            <h2 className="card-title">Title : {job.title}</h2>
                                            <p className="card-subtitle"><b> Job Category :</b> {job.jobCategory}</p>
                                            <p className="card-subtitle"><b> Posted By : </b>{job.postedBy}</p>
                                            <p className="card-subtitle"><b> Posting Date : </b>{ job.postingDate }</p>
                                            <p className="card-subtitle"><b> Application Deadline : </b>{job.applicationDeadline}</p>
                                            <p className="card-subtitle"><b> Applicants Number : </b>{job.applicantsNumber}</p>
                                            <p className="card-subtitle"><b> Description : </b>{job.description}</p>
                                            <Link to={`http://localhost:5173/singleJob/${job._id}`}><button className="btn btn-primary">View Details</button></Link>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 m-10'>
                            {
                                remoteJobs.map(job =>
                                    <div key={job._id} className={`card bg-base-100 shadow-xl h-full`}>
                                        {/* {"_id":"654a2bc8b72b9989af87ff46","title":"VIP Kajer lok","jobCategory":"On Site","image":"https://www.startech.com.bd/image/cache/catalog/laptop/microsoft/surface-pro-9/surface-pro-9-graphite-01-500x500.webp","postedBy":"EDU","description":"khub valo kaj","postingDate":"2023-11-07T12:21:28.772Z","applicationDeadline":"2023-11-13","applicantsNumber":0} */}
                                        <figure ><img src={job.image} className='h-56 ' /></figure>
                                        <div className="card-body">
                                            <h2 className="card-title">Title : {job.title}</h2>
                                            <p className="card-subtitle"><b> Job Category :</b> {job.jobCategory}</p>
                                            <p className="card-subtitle"><b> Posted By : </b>{job.postedBy}</p>
                                            <p className="card-subtitle"><b> Posting Date : </b>{ job.postingDate }</p>
                                            <p className="card-subtitle"><b> Application Deadline : </b>{job.applicationDeadline}</p>
                                            <p className="card-subtitle"><b> Applicants Number : </b>{job.applicantsNumber}</p>
                                            <p className="card-subtitle"><b> Description : </b>{job.description}</p>
                                            <Link to={`http://localhost:5173/singleJob/${job._id}`}><button className="btn btn-primary">View Details</button></Link>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 m-10'>
                            {
                                hybridJobs.map(job =>
                                    <div key={job._id} className={`card bg-base-100 shadow-xl h-full`}>
                                        {/* {"_id":"654a2bc8b72b9989af87ff46","title":"VIP Kajer lok","jobCategory":"On Site","image":"https://www.startech.com.bd/image/cache/catalog/laptop/microsoft/surface-pro-9/surface-pro-9-graphite-01-500x500.webp","postedBy":"EDU","description":"khub valo kaj","postingDate":"2023-11-07T12:21:28.772Z","applicationDeadline":"2023-11-13","applicantsNumber":0} */}
                                        <figure ><img src={job.image} className='h-56 ' /></figure>
                                        <div className="card-body">
                                            <h2 className="card-title">Title : {job.title}</h2>
                                            <p className="card-subtitle"><b> Job Category :</b> {job.jobCategory}</p>
                                            <p className="card-subtitle"><b> Posted By : </b>{job.postedBy}</p>
                                            <p className="card-subtitle"><b> Posting Date : </b>{ job.postingDate }</p>
                                            <p className="card-subtitle"><b> Application Deadline : </b>{job.applicationDeadline}</p>
                                            <p className="card-subtitle"><b> Applicants Number : </b>{job.applicantsNumber}</p>
                                            <p className="card-subtitle"><b> Description : </b>{job.description}</p>
                                            <Link to={`http://localhost:5173/singleJob/${job._id}`}><button className="btn btn-primary">View Details</button></Link>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 m-10'>
                            {
                                partTimeJobs.map(job =>
                                    <div key={job._id} className={`card bg-base-100 shadow-xl h-full`}>
                                        {/* {"_id":"654a2bc8b72b9989af87ff46","title":"VIP Kajer lok","jobCategory":"On Site","image":"https://www.startech.com.bd/image/cache/catalog/laptop/microsoft/surface-pro-9/surface-pro-9-graphite-01-500x500.webp","postedBy":"EDU","description":"khub valo kaj","postingDate":"2023-11-07T12:21:28.772Z","applicationDeadline":"2023-11-13","applicantsNumber":0} */}
                                        <figure ><img src={job.image} className='h-56 ' /></figure>
                                        <div className="card-body">
                                            <h2 className="card-title">Title : {job.title}</h2>
                                            <p className="card-subtitle"><b> Job Category :</b> {job.jobCategory}</p>
                                            <p className="card-subtitle"><b> Posted By : </b>{job.postedBy}</p>
                                            <p className="card-subtitle"><b> Posting Date : </b>{ job.postingDate }</p>
                                            <p className="card-subtitle"><b> Application Deadline : </b>{job.applicationDeadline}</p>
                                            <p className="card-subtitle"><b> Applicants Number : </b>{job.applicantsNumber}</p>
                                            <p className="card-subtitle"><b> Description : </b>{job.description}</p>
                                            <Link to={`http://localhost:5173/singleJob/${job._id}`}><button className="btn btn-primary">View Details</button></Link>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                </TabPanel>
                
            </Tabs>
        </div>
    );
};

export default JobCategory;
