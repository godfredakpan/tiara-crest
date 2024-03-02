'use client';

import { Card, Flex, Grid, Text, Title } from '@tremor/react';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import './style.css';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import ReserveButton from '../elements/FeedBackLink';


export default function CourseDetails() {
  const [apartmentData, setCourseData] = React.useState({} as any);


  React.useEffect(() => {
    // Retrieve the data from local storage
    const storedData = localStorage.getItem('apartmentData');

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setCourseData(parsedData);
    }
  }, []);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">

      <ReserveButton apartment={apartmentData}/>
      <div style={{ marginBottom: 20 }}>
        <div className="bg-white-200">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="bg-white rounded-md shadow px-3 py-2 flex space-x-2">
              <li>
                <a href="/" className="text-gray-500 hover:underline">Apartments</a>
              </li>

              <li>
                <span className="text-gray-500">/</span>
              </li>
              <li>
                <a href="#" className="text-gray-900 font-medium">{apartmentData.title}</a>
              </li>
            </ol>
          </nav>
        </div>

      </div>
      <Card className="mt-8 border-l-4" style={{borderColor: '#191F59'}}>

        {apartmentData && (
          <><div className="flex mt-4">
            {apartmentData.images?.map((imageUrl: string | StaticImport, index: React.Key | null | undefined) => (
              <div key={index} className="p-2 mx-auto">
                <Image
                  src={imageUrl}
                  alt={`${apartmentData.title}-image-${index}`}
                  height={400}
                  width={500}
                  className="rounded cottage-image" />
              </div>
            ))}
          </div>
            <div className="mt-8 mx-auto max-w-full text-left ">
              <div className="mx-auto max-w-full text-left">
                <p className="text-1xl font-bold text-gray-500 mb-2">{apartmentData.title}
                <span style={{opacity:0.2}} className={apartmentData.status === 'enabled' ? 'text-green-500' : 'text-gray-200'}>
                    {apartmentData.status === 'enabled' ? ' Available' : ' Unavailable'}
                  </span>
                 </p>
                

                <p className="text-base text-gray-700 mb-4">4 guests · 2 bedroom · 2 beds · 1 bath</p>


                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2">Details</h4>
                  <p className="text-base text-gray-700 mb-4 cottage-details">{apartmentData.description}</p>
                  <h4 className="text-lg font-semibold mb-2">What this Place Offers</h4>
                  <ul className="flex items-center cottage-details">
                    <li className="flex items-center mr-4">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Swimming Pool
                    </li>
                    <li className="flex items-center mr-4">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Wifi
                    </li>
                    <li className="flex items-center mr-4">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Lounge
                    </li>

                    <li className="flex items-center mr-4">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Grill
                    </li>

                    <li className="flex items-center mr-4">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      First aid kit
                    </li>



                  </ul>
                </div>

                <div className="mb-4 " style={{lineHeight: 2}} >
                  <h4 className="text-lg font-semibold mb-2">Apartment Policy</h4>
                  <ul className="flex items-center cottage-details">
                    <li className="flex items-center mr-4">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Checkin time is 2pm and Check-out time is 12pm.
                    </li>
                    <li className="flex items-center mr-4">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Caution Fee is to be refunded 24-48 hours after check-out
                    </li>
                    <li className="flex items-center mr-4">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Smoking is not allowed (except stated otherwise)
                    </li>

                    <li className="flex items-center mr-4">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      No parties in the apartment (excluding apartments that accepts parties)
                    </li>

                    <li className="flex items-center mr-4">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      1 bedroom - 2 guests, 2 bedrooms - 4 guests, 3 bedrooms - 6 guests, 4 bedrooms - 8 guests e.tc - Each room has 2 guests Max
                    </li>

                  </ul>
                </div>


              </div>

            </div>
          </>

        )}
      </Card>
    </main>
  );
}
