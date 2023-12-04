import React from 'react';
import usePageTitle from '../shared/usePageTitle';

const Blogs = () => {
    usePageTitle('CareerNest');
    return (
        <div>
            <div class="space-y-4">
            <details
                class="group border-s-4 border-green-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
                open
            >
                <summary class="flex cursor-pointer items-center justify-between gap-1.5">
                <h2 class="text-lg font-medium text-gray-900">
                    What is an access token and refresh token? How do they work and where should we store them on the client-side?
                </h2>

                <span class="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-45"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    >
                    <path
                        fill-rule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clip-rule="evenodd"
                    />
                    </svg>
                </span>
                </summary>

                <p class="mt-4 leading-relaxed text-gray-700">
                A <b>refresh token</b> just helps you re-validate a user without them having to re-enter their login credentials multiple times.  <br />
                The <b>access token</b> is re-issued, provided the refresh token is a valid one requesting permission to access confidential resources.
                <br />  
                Access tokens are short-lived keys that grant access to protected resources, issued upon user login. They're stored securely on the client side, often as HTTP-only cookies or in-memory storage. Refresh tokens, used when access tokens expire, require even more secure storage due to their sensitivity.
                </p>
            </details>

            <details
                class="group border-s-4 border-green-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
            >
                <summary class="flex cursor-pointer items-center justify-between gap-1.5">
                <h2 class="text-lg font-medium text-gray-900">
                    What is express js? What is Nest JS ?
                </h2>

                <span class="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-45"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    >
                    <path
                        fill-rule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clip-rule="evenodd"
                    />
                    </svg>
                </span>
                </summary>

                <p class="mt-4 leading-relaxed text-gray-700">

                    <b className='mr-2'>Express JS:</b> 
                        Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
                    <br />
                    <b className='mr-2'>Nest JS:</b> 
                    NestJS is a framework for building efficient, scalable Node.js web applications.
                </p>
            </details>


            <details class="group border-s-4 border-green-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary class="flex cursor-pointer items-center justify-between gap-1.5">
                    <h2 class="text-lg font-medium text-gray-900">
                        My Code Explanation
                    </h2>
                    <span class="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-45" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                        </svg>
                    </span>
                </summary>
                <p class="mt-4 leading-relaxed text-gray-700 text mx-20">
                    <br />Here's a breakdown of my code: 
                    <br />1. <b>Job Listing Page:</b>
                    <div className='ml-5'>
                    <br />    - Displays a list of jobs fetched from the server.
                    <br />    - Allows filtering jobs by category using a dropdown.
                    <br />    - Clicking on a job title navigates to the job details page.</div>
                    <br />2. <b>Job Details Page :</b>
                    <div className='ml-5'>
                    <br />    - Shows detailed information about a specific job.
                    <br />    - Users can apply for the job, and the application count is updated.
                    </div>
                    <br />3. <b>Applied Jobs Page :</b>
                    <div className='ml-5'>
                    <br />    - Displays jobs that the user has applied to.
                    <br />    - Includes a filter by job category functionality.
                    </div>
                    <br />4. <b>Authentication Context :</b>
                    <div className='ml-5'>
                    <br />    - Manages user authentication state using React Context.
                    </div>
                    <br />5. <b>API Calls:</b>
                    <div className='ml-5'>
                    <br />    - Utilizes `fetch` to communicate with the backend for job and user data.
                    </div>
                    <br />6. <b>Dynamic Page Titles:</b>
                    <div className='ml-5'>
                    <br />    - Updates the website title based on the route, enhancing user experience.
                    </div>
                    <br />7. <b>Styling:</b>
                    <div className='ml-5'>
                    <br />    - Uses Tailwind CSS for a clean and responsive design.
                    </div>
                </p>
            </details>

            </div>
        </div>
    );
};

export default Blogs;
