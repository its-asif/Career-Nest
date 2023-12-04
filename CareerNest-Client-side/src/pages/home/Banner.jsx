import React from 'react';

const Banner = () => {
  return (
    <div>
      <section
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg)`,
        }}
      >
        <div className="absolute inset-0  bg-gradient-to-r from-black/80 via-black/60 to-black/10"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right text-white">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Unlock Your Career Potential with{' '}
              <strong className="block font-extrabold text-[#ffa00d]">Career Nest</strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed">
              Empowering your journey to success. Explore a world of opportunities tailored just for you. Join Career Nest and take the next step in your professional growth.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center mx-auto">
            <input type="text" placeholder="Search for Opportunities" class="input input-bordered input-warning w-full max-w-xs" />
              <a
                href="#"
                className="block w-full rounded bg-[#ffa00d] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#cc990a] focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                Search
              </a>

      
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
