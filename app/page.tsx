"use client"

import React, { useState, useEffect } from 'react'
import { Card, Title, Text, Grid, Flex, Metric } from '@tremor/react';
import Link from 'next/link';
import getAllProperties from "../fauna/getAllProperties";
import EmptyState from "./elements/EmptyState"
import { useUser } from '@auth0/nextjs-auth0/client';
import getUser from '../fauna/getUser';
import createUser from '../fauna/createUser';
import Loading from './loading';
import SocialShare from './elements/SocialShare';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';


function ApartmentPlaceholder() {
  const [apartments, setApartments] = useState([] as any);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const apartmentsPerPage = 2; // Number of apartments per page

  const { user, error, isLoading } = useUser();
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;
  React.useEffect(() => {
    async function fetchData() {
      if (!user) return;
      const myUser = await getUser(user?.email);
      localStorage.setItem('user', JSON.stringify(myUser))
      // if (!myUser) {
      //   const addUser = await createUser(user) as any;
      //   localStorage.setItem('user', JSON.stringify(addUser.data))
      // }
    }
    fetchData();
  }, [user])

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      if (typeof window !== 'undefined') {

        const user = JSON.parse(localStorage.getItem('user' || {}) as any);

        const allApartments = await getAllProperties();

        if (allApartments.length > 0) {
          const reformedCollection = allApartments.map((apartment: any) => {
            return { ...apartment.data, id: apartment.ref.id };
          });
          setApartments(reformedCollection);
        } else {
          setApartments([]);
        }
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const indexOfLastApartment = currentPage * apartmentsPerPage;
  const indexOfFirstApartment = indexOfLastApartment - apartmentsPerPage;
  const currentApartments = apartments.slice(indexOfFirstApartment, indexOfLastApartment);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  const data = [
    {
      title: 'Luzuri',
      description: 'Lekki Apartment 1',
      status: 'enabled',
      link: '/syllabus',
      location: 'Lekki Phase 1',
      images: ['https://images.surferseo.art/fdb08e2e-5d39-402c-ad0c-8a3293301d9e.png', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg']
    },
    {
      title: 'Premium Apartments',
      description: 'Lekki Apartment 2',
      status: 'disabled',
      link: '/',
      location: 'Chevron, Lekki',
      images: ['https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg', 'https://images.surferseo.art/fdb08e2e-5d39-402c-ad0c-8a3293301d9e.png']

    },
    {
      title: 'Premium Apartments',
      description: 'Coming soon',
      status: 'disabled',
      link: '/',
      location: 'Chevron, Lekki',
      images: ['https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg', 'https://images.surferseo.art/fdb08e2e-5d39-402c-ad0c-8a3293301d9e.png']

    }
  ];

  // if (loading) {
  //   return (
  //     <Loading />
  //   )
  // }


  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl" style={{marginBottom: 50}}>
      <div style={{ marginBottom: 20 }}>
        <Title>Available Apartments</Title>
      </div>
      <Grid numItemsSm={4} numItemsLg={4} className="gap-2">
        {currentApartments.map((item:any) => (
          <>
           
              <div
                key={item.title}
                className="bg-white shadow-md rounded-lg overflow-hidden sm:col-span-1 md:col-span-1 lg:col-span-1 relative"
              >
                <Slider {...settings}>
                  {item.images.map((imageUrl:string, index:any) => (
                    <div key={index} className="w-full h-52 relative">
                      <Image
                        src={imageUrl}
                        alt={`${item.title}-image-${index}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                      />
                    </div>
                  ))}
                </Slider>

                <div className="p-4">
                    <Link
                  href={{
                    pathname: 'apartmentDetails',
                  }}
                  onClick={() => {
                    localStorage.setItem('apartmentData', JSON.stringify(item));
                  }}
                >
                  <Title>{item.title}</Title>

                  <Flex justifyContent="start" alignItems="baseline" className="space-x-2">
                    
                    <Text style={{width: 80}}>{item.description}</Text>
                  </Flex>

                  <Flex className="mt-6">
                  <Text>{item.location}</Text>
                  {/* <Text className='text-gray-300'>{item.status === 'enabled' ? 'Available' : 'Unavailable'}</Text> */}
                    <button
                      style={{ backgroundColor: '#191F59' }}
                      className="bg-green-500 text-size-10 text-sm text-white px-2 py-1 rounded mr-1 text-right"
                    >
                      Book
                    </button>
                  </Flex>
                  </Link>
                </div>
              </div>
            </>


        ))}
      </Grid>

      <div className="flex  justify-center ">
        <div className="flex flex-wrap">
          {Array.from({ length: Math.ceil(apartments.length / apartmentsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              style={{
                marginTop: 50,
                backgroundColor: i + 1 === currentPage ? '#F9B11E' : '#191F59'
              }}
              className={`bg-blue-500 text-white px-4 py-2 rounded mx-1 ${i + 1 === currentPage ? 'bg-blue-700' : ''
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

    </main>
  );
}

export default ApartmentPlaceholder;
