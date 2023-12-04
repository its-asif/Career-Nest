import React from 'react';
import JobCategory from './JobCategory';
import Banner from './Banner';
import Testimonial from './Testimonial';
import ClientSection from './ClientSection';
import usePageTitle from '../shared/usePageTitle';

const Home = () => {
    usePageTitle('CareerNest');
    return (
        <div>
            <Banner />
            <JobCategory />
            <ClientSection />
            <Testimonial />
        </div>
    );
};

export default Home;