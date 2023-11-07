import React from 'react';

const UserReview = () => {
  return (
    <div className="max-w-7xl mx-auto mt-20 mb-16">
      <div className="w-[286px] text-center mx-auto h-[56px] bg-no-repeat flex bg-hero-pattern">
        <h3 className="text-white text-2xl ml-[70px] mt-3 font-bold">
          Client Review
        </h3>
      </div>
      <p className="lg:w-[700px] text-center mx-auto mt-10   text-lg">
        Discover the positive impact we've made on our clients by reading through their testimonials. Our clients have experienced our service and results, and they're eager to share their positive experiences with you.
      </p>

      <div className="relative overflow-hidden border-2 my-16 border-main rounded-3xl">
        {/* Background pattern */}
        <div className="flex absolute start-0 -z-[1]">
          <div className="bg-purple-200 opacity-20 blur-3xl w-[1280px] h-[300px] dark:bg-purple-900 dark:opacity-20"></div>
        </div>

        <div className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16 mx-auto">
          <div className="lg:grid lg:grid-cols-6 lg:gap-8 lg:items-center">
            <div className="hidden lg:block lg:col-span-2">
              <img className="rounded-xl w-[340px]" src="https://i.ibb.co/ngL8mMM/0df361ce-42da-4709-b4e7-e07619f15bc8.webp" alt="Image Description" />
            </div>

            <div className="lg:col-span-4">
              <blockquote>
               <img src="https://i.ibb.co/0h8nt3p/icons8-logo-240.png" className='w-16 mb-1' alt="" />

                <p className="text-xl font-medium text-gray-800 lg:text-2xl lg:leading-normal dark:text-gray-200">
                 Using Skill-Exchange For About A user Now I usually Hire People for My Company Job It Was A Great Experience Using Skill-Exchange..
                </p>

                <footer className="mt-6">
                  <div className="flex items-center">
                    <div className="ms-4 lg:ms-0">
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Jon Abraham
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Head of Type-Chart.io
                      </p>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden border-2 my-16 border-main rounded-3xl">
        {/* Background pattern */}
        <div className="flex absolute start-0 -z-[1]">
          <div className="bg-purple-200 opacity-20 blur-3xl w-[1280px] h-[300px] dark:bg-purple-900 dark:opacity-20"></div>
        </div>

        <div className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16 mx-auto">
          <div className="lg:grid lg:grid-cols-6 lg:gap-8 lg:items-center">
            <div className="hidden lg:block lg:col-span-2">
              <img className="rounded-xl py-12"  src="https://i.ibb.co/2N8CdF3/b418c96b-7f38-451b-aa56-085ba12137cb.webp" alt="Image Description" />
            </div>

            <div className="lg:col-span-4">
              <blockquote>
               <img src="https://i.ibb.co/mC31N2Y/icons8-logo-240-1.png" className='w-16 mb-2' alt="" />

                <p className="text-xl font-medium text-gray-800 lg:text-2xl lg:leading-normal dark:text-gray-200">
                The Working Experience In Skill-Exchange is Excellent. It Makes The Job Finding Process As Relevant As Possible For Me.....
                </p>

                <footer className="mt-6">
                  <div className="flex items-center">
                    <div className="ms-4 lg:ms-0">
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Jon Abraham
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Head of Type-Chart.io
                      </p>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReview;
