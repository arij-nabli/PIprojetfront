import React from 'react'
import Navbar from 'components/Navbars/AuthNavbar.js'
import Footer from 'components/Footers/Footer.js'

export default function LandingPage() {
  return (
    <>
      <Navbar transparent />
      <main>
        <div className='relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75'>
          {/* Top skewed background in red-600 */}
          <div
            className='absolute top-0 w-full h-1/2 bg-red-600  transform skewY(-3deg)'
            style={{
              zIndex: '-1',
            }}></div>

          {/* Bottom skewed background in blueGray-500 */}
          <div
            className='absolute bottom-0 w-full h-1/2 bg-red-600 transform skewY(3deg)'
            style={{
              zIndex: '-1',
            }}></div>

          {/* Background image */}
          <div
            className='absolute top-0 w-full h-full bg-center bg-cover'
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
              transform: 'skewX(-3deg) skewY(-1deg)',
            }}>
            <span
              id='blackOverlay'
              className='w-full h-full absolute opacity-75 bg-black'></span>
          </div>

          <div className='container relative mx-auto'>
            <div className='items-center flex flex-wrap'>
              <div className='w-full lg:w-6/12 px-4 ml-auto mr-auto text-center'>
                <div className='pr-12'>
                  <h1 className='text-white font-semibold text-5xl'>
                    Esprit Compass.
                  </h1>
                  <p className='mt-4 text-lg text-blueGray-200'>
                    Welcome to Esprit Compass, where job seekers and companies
                    converge for unparalleled opportunities. Seamlessly
                    connecting talent with potential, We empower job seekers to
                    discover their ideal career paths while enabling companies
                    to effortlessly showcase their opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section
          className='pb-10 -mt-24' // Reduced paddingBottom to pb-10
          style={{
            background: 'linear-gradient(to bottom, #800000 0%, #ffffff 80%)',
          }}>
          <div
            className='container mx-auto px-4'
            style={{ transform: 'skewY(0deg)' }}>
            <div className='flex flex-wrap'>
              <div className='lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center'>
                <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg'>
                  <div className='px-4 py-5 flex-auto'>
                    <div className='text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400'>
                      <i class='fa-solid fa-book-open-reader'></i>
                    </div>
                    <h6 className='text-xl font-semibold'>student</h6>
                    <p className='mt-2 mb-4 text-blueGray-500'>
                      Unleash your career potential! Discover endless job
                      opportunities tailored just for students. Join now and
                      take the first step towards a brighter future!
                    </p>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-4/12 px-4 text-center'>
                <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg'>
                  <div className='px-4 py-5 flex-auto'>
                    <div className='text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400'>
                      <i class='fa-solid fa-user-graduate'></i>
                    </div>
                    <h6 className='text-xl font-semibold'>Graduated</h6>
                    <p className='mt-2 mb-4 text-blueGray-500'>
                      Seize the moment and explore abundant job opportunities
                      that await you as a new graduate. Embrace the journey of
                      finding job opportunities and unleash your potential in
                      the professional world.
                    </p>
                  </div>
                </div>
              </div>
              <div className='pt-6 w-full md:w-4/12 px-4 text-center'>
                <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg'>
                  <div className='px-4 py-5 flex-auto'>
                    <div className='text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400'>
                      <i class='fa-solid fa-city'></i>
                    </div>
                    <h6 className='text-xl font-semibold'>Verified Company</h6>
                    <p className='mt-2 mb-4 text-blueGray-500'>
                      Tap into a talent goldmine - post job opportunities and
                      discover high-skilled individuals. Streamline your hiring
                      process and find top-notch talent
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className='relative py-20 mt-0 '
          style={{ background: 'linear-gradient(to bottom, white, #E5E8E8)' }}>
          {' '}
          {/* Adjusted marginTop to mt-0 */}
          <div className='bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20'>
            <svg
              className=' bottom-0 overflow-hidden'
              xmlns='http://www.w3.org/2000/svg'
              preserveAspectRatio='none'
              version='1.1'
              viewBox='0 0 2560 100'
              x='0'
              y='0'>
              <polygon
                className='text-white fill-current'
                points='2560 0 2560 100 0 100'></polygon>
            </svg>
          </div>
          <h1 style={{ fontSize: '3rem', textAlign: 'center' }}>
            Our Services for Students & Graduated ones.
          </h1>
          <div className='container mx-auto px-4'>
            <div className='items-center flex flex-wrap'>
              <div className='w-full md:w-4/12 ml-auto mr-auto px-4'>
                <img
                  alt='...'
                  className='max-w-full rounded-lg shadow-lg'
                  src='https://scontent.ftun2-2.fna.fbcdn.net/v/t1.15752-9/423472538_1121470842377439_6870367757892080989_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=RXeeHQOXvmkAX9r5Rt7&_nc_ht=scontent.ftun2-2.fna&oh=03_AdS9BRK-wVzpst1X00MpuiLmgUlcm_uqnWfYqarkh93s0g&oe=6609D232'
                />
              </div>
              <div className='w-full md:w-5/12 ml-auto mr-auto px-4'>
                <div className='md:pr-12 flex items-center'>
                  <div class='text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-300'>
                    <i
                      className='fas fa-rocket text-xl'
                      style={{ color: '#bb072b' }}></i>
                  </div>
                </div>
                <h3 className='text-3xl font-semibold'>
                  The best way to predict the future is to create it.
                </h3>
                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-4'>
                  <div className='flex items-center justify-center bg-white p-4 rounded-lg shadow-md'>
                    <div className='mr-2'>
                      <i
                        className='fa-solid fa-filter fa-xl'
                        style={{ color: '#bb072b' }}></i>
                    </div>
                    <div>
                      <h4 className='text-blueGray-500'>Filtread Feed.</h4>
                    </div>
                  </div>
                  <div className='flex items-center justify-center bg-white p-4 rounded-lg shadow-md'>
                    <div className='mr-2'>
                      <i
                        className='fa-solid fa-upload fa-xl'
                        style={{ color: '#bb072b' }}></i>
                    </div>
                    <div>
                      <h4 className='text-blueGray-500'>Video Resume.</h4>
                    </div>
                  </div>
                  <div className='flex items-center justify-center bg-white p-4 rounded-lg shadow-md'>
                    <div className='mr-2'>
                      <i
                        class='fa-solid fa-heart fa-xl'
                        style={{ color: '#bb072b' }}></i>
                    </div>
                    <div>
                      <h4 className='text-blueGray-500'>
                        Candidate Recommendation.
                      </h4>
                    </div>
                  </div>

                  <div className='flex items-center justify-center bg-white p-4 rounded-lg shadow-md'>
                    <div className='mr-2'>
                      <i
                        class='fa-solid fa-microchip fa-xl'
                        style={{ color: '#bb072b' }}></i>
                      {/* Replace "fa-icons" with your desired icon class */}
                    </div>
                    <div>
                      <h4 className='text-blueGray-500'>
                        Analyze professional opportunities using an AI mode
                      </h4>{' '}
                      {/* Add your text for the fourth item here */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className='relative py-20 mt-0'
          style={{ background: 'linear-gradient(to bottom, #E5E8E8, white)' }}>
          <div
            className='bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20'
            style={{ transform: 'translateZ(0)' }}>
            <svg
              className='bottom-0 overflow-hidden'
              xmlns='http://www.w3.org/2000/svg'
              preserveAspectRatio='none'
              version='1.1'
              viewBox='0 0 2560 100'
              x='0'
              y='0'>
              <polygon
                className='text-white fill-current'
                points='2560 0 2560 100 0 100'
                fill='#E5E8E8'></polygon>
            </svg>
          </div>
          <h1 style={{ fontSize: '3rem', textAlign: 'center' }}>
            Our Services for companies
          </h1>
          <div className='container mx-auto px-4'>
            <div className='items-center flex flex-wrap'>
              <div className='w-full md:w-5/12 ml-auto mr-auto px-4'>
                <div className='md:pl-12 flex items-center'>
                  <div class='text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-300'>
                    <i
                      className='fas fa-rocket text-xl'
                      style={{ color: '#bb072b' }}></i>
                  </div>
                </div>
                <h3 className='text-3xl font-semibold'>
                  Attract, Retain and Develop the right talent.
                </h3>
                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-4'>
                  <div className='flex items-center justify-center bg-white p-4 rounded-lg shadow-md'>
                    <div className='mr-2'>
                      <i
                        class='fa-solid fa-share-from-square fa-xl'
                        style={{ color: '#bb072b' }}></i>
                    </div>
                    <div>
                      <h4 className='text-blueGray-500'>
                        Direct access to post opportunities.
                      </h4>
                    </div>
                  </div>
                  <div className='flex items-center justify-center bg-white p-4 rounded-lg shadow-md'>
                    <div className='mr-2'>
                      <i
                        class='fa-solid fa-hands fa-xl'
                        style={{ color: '#bb072b' }}></i>
                    </div>
                    <div>
                      <h4 className='text-blueGray-500'>
                        Cut out the middleman
                      </h4>
                    </div>
                  </div>
                  <div className='flex items-center justify-center bg-white p-4 rounded-lg shadow-md'>
                    <div className='mr-2'>
                      <i
                        class='fa-solid fa-database fa-xl'
                        style={{ color: '#bb072b' }}></i>
                    </div>
                    <div>
                      <h4 className='text-blueGray-500'>
                        Automated data collection
                      </h4>
                    </div>
                  </div>

                  <div className='flex items-center justify-center bg-white p-4 rounded-lg shadow-md'>
                    <div className='mr-2'>
                      <i
                        class='fa-solid fa-microchip fa-xl'
                        style={{ color: '#bb072b' }}></i>
                      {/* Replace "fa-icons" with your desired icon class */}
                    </div>
                    <div>
                      <h4 className='text-blueGray-500'>AI data extraction</h4>{' '}
                      {/* Add your text for the fourth item here */}
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-4/12 ml-auto mr-auto px-4 mt-12'>
                <img
                  alt='...'
                  className='max-w-full rounded-lg shadow-lg'
                  src='https://scontent.ftun2-2.fna.fbcdn.net/v/t1.15752-9/423472538_1121470842377439_6870367757892080989_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=RXeeHQOXvmkAX9r5Rt7&_nc_ht=scontent.ftun2-2.fna&oh=03_AdS9BRK-wVzpst1X00MpuiLmgUlcm_uqnWfYqarkh93s0g&oe=6609D232'
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className='pt-20 pb-48 text-center '
          style={{
            background: 'linear-gradient(to bottom, #ffffff 0%, #800000 100%)',
          }}>
          <div className='container mx-auto px-4 text-center  '>
            <div className='mb-24 justify-center text-center'>
              <h2 className='text-4xl font-semibold text-center '>
                Our Partners
              </h2>
              <p className='text-lg leading-relaxed m-4 text-blueGray-500 text-center'>
                We are proud to collaborate with a diverse range of partners who
                share our commitment to excellence and innovation.
              </p>
            </div>
          </div>
          <div>
            <div className='flex items-center ml-8 mr-8'>
              <div className='w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4'>
                <div className='flex flex-col items-center'>
                  <img
                    alt='...'
                    src='https://i.postimg.cc/yY3V8Y5M/Logo-ESPRIT-Ariana-removebg-preview.png'
                    className='shadow-lg rounded-full mx-auto max-w-120-px'
                  />
                  <div className='pt-6 text-center'>
                    <h5 className='text-xl font-bold'>Esprit</h5>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4'>
                <div className='flex flex-col items-center'>
                  <img
                    alt='...'
                    src='https://i.postimg.cc/gjSnFSx3/420px-Honoris-United-Universities-Logo-removebg-preview.png'
                    className='shadow-lg rounded-full mx-auto max-w-120-px'
                  />
                  <div className='pt-6 text-center'>
                    <h5 className='text-xl font-bold'>Honoris</h5>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4'>
                <div className='flex flex-col items-center'>
                  <img
                    alt='...'
                    src='https://i.postimg.cc/fWGbX9xz/layout-set-logo-removebg-preview.png'
                    className='shadow-lg rounded-full mx-auto max-w-120-px'
                  />
                  <div className='pt-6 text-center'>
                    <h5 className='text-xl font-bold'>Cdio</h5>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4'>
                <div className='flex flex-col items-center'>
                  <img
                    alt='...'
                    src='https://www.spg.com.tn/wp-content/uploads/2019/04/Logo-SPG-new.png'
                    className='shadow-lg rounded-full mx-auto max-w-120-px'
                  />
                  <div className='pt-6 text-center'>
                    <h5 className='text-xl font-bold'>SPG</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='py-16 bg-gray-100'>
          <div>
            <h2 className='text-4xl font-semibold mb-8 text-center'>
              Meet Our Team
            </h2>
          </div>
          <div className='container mx-auto text-center'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-center'>
              <div className='bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 ml-6'>
                <img
                  src='https://via.placeholder.com/150'
                  alt='Team Member 1'
                  className='rounded-full w-32 h-32 mx-auto mb-4'
                />
                <p className='text-lg font-semibold mb-2'>Arij Nabli</p>
                <div className='flex justify-center space-x-4'>
                  <a
                    href='https://www.linkedin.com'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <i className='fab fa-linkedin text-blue-500 text-2xl hover:text-blue-700'></i>
                  </a>
                  <a
                    href='https://github.com'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <i className='fab fa-github text-gray-800 text-2xl hover:text-gray-600'></i>
                  </a>
                </div>
              </div>
              <div className='bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1'>
                <img
                  src='https://via.placeholder.com/150'
                  alt='Team Member 2'
                  className='rounded-full w-32 h-32 mx-auto mb-4'
                />
                <p className='text-lg font-semibold mb-2'>
                  Feriel Bel Haj Kacem
                </p>
                <div className='flex justify-center space-x-4'>
                  <a
                    href='https://www.linkedin.com'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <i className='fab fa-linkedin text-blue-500 text-2xl hover:text-blue-700'></i>
                  </a>
                  <a
                    href='https://github.com'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <i className='fab fa-github text-gray-800 text-2xl hover:text-gray-600'></i>
                  </a>
                </div>
              </div>
              <div className='bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1'>
                <img
                  src='https://via.placeholder.com/150'
                  alt='Team Member 3'
                  className='rounded-full w-32 h-32 mx-auto mb-4'
                />
                <p className='text-lg font-semibold mb-2'>Chaima Idoudi</p>
                <div className='flex justify-center space-x-4'>
                  <a
                    href='https://www.linkedin.com'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <i className='fab fa-linkedin text-blue-500 text-2xl hover:text-blue-700'></i>
                  </a>
                  <a
                    href='https://github.com'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <i className='fab fa-github text-gray-800 text-2xl hover:text-gray-600'></i>
                  </a>
                </div>
              </div>
              <div className='bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1'>
                <img
                  src='https://via.placeholder.com/150'
                  alt='Team Member 4'
                  className='rounded-full w-32 h-32 mx-auto mb-4'
                />
                <p className='text-lg font-semibold mb-2'>Anas Dai</p>
                <div className='flex justify-center space-x-4'>
                  <a
                    href='https://www.linkedin.com'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <i className='fab fa-linkedin text-blue-500 text-2xl hover:text-blue-700'></i>
                  </a>
                  <a
                    href='https://github.com'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <i className='fab fa-github text-gray-800 text-2xl hover:text-gray-600'></i>
                  </a>
                </div>
              </div>
              <div className='bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1'>
                <img
                  src='https://via.placeholder.com/150'
                  alt='Team Member 5'
                  className='rounded-full w-32 h-32 mx-auto mb-4'
                />
                <p className='text-lg font-semibold mb-2'>Oubaid Mezni</p>
                <div className='flex justify-center space-x-4'>
                  <a
                    href='https://www.linkedin.com'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <i className='fab fa-linkedin text-blue-500 text-2xl hover:text-blue-700'></i>
                  </a>
                  <a
                    href='https://github.com'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <i className='fab fa-github text-gray-800 text-2xl hover:text-gray-600'></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='bg-gradient-to-b from-white to-yellow-300 py-12'>
          <div className='max-w-4xl mx-auto px-4 flex flex-col items-center'>
            <h2 className='text-3xl font-bold mb-4'>Contact Us</h2>
            <p className='text-lg text-gray-700 mb-8'>
              Feel free to reach out to us with any questions or inquiries.
              We're here to help!
            </p>
            <a href='/Contactus'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
                Contact Us
              </button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

{
  /*'https://upload.wikimedia.org/wikipedia/commons/f/ff/Logo_ESPRIT_Ariana.jpg'
'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Honoris_United_Universities%27_Logo.jpg/420px-Honoris_United_Universities%27_Logo.jpg'
'https://www.ntnu.edu/image/layout_set_logo?img_id=1319068055&t=1662020223042'
'https://www.spg.com.tn/wp-content/uploads/2019/04/Logo-SPG-new.png' */
}
