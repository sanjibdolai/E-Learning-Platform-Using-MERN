import { memo, useEffect, useState } from "react";
import {  Row,  Carousel,Col } from "react-bootstrap";
import MultiCarousel from 'react-elastic-carousel';
import CourseCard from "./CourseCard";

function Home (){
  console.log("Home");
  const items = [
    { id: 1, title: 'item #1' },
    { id: 2, title: 'item #2' },
    { id: 3, title: 'item #3' },
    { id: 4, title: 'item #4' },
    { id: 5, title: 'item #5' },
    { id: 1, title: 'item #1' },
    { id: 2, title: 'item #2' },
    { id: 3, title: 'item #3' },
    { id: 4, title: 'item #4' },
    { id: 5, title: 'item #5' }
  ];
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];
  const [courses, setCourses] = useState([]);

    const getCourses = async () => {
        try {
            const res = await fetch("/courses", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });

            if (!res.status === 200) {
                throw new Error(res.error)
            }
            const data = await res.json();
            console.log(data);
            setCourses([ ...data ]);

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getCourses();
    }, []);


  return (
    <>
      <Row>
        <Carousel variant="dark">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.upgrad.com/_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fupgrad1%2Fmarketing-platform-assets%2Fsprites%252Fimages%2FdataScience__1644555732575.png&w=1920&q=75"
              alt="First slide"
            />

          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.upgrad.com/_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fupgrad1%2Fmarketing-platform-assets%2Fsprites%252Fimages%2FdataScience__1644555732575.png&w=1920&q=75"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.upgrad.com/_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fupgrad1%2Fmarketing-platform-assets%2Fsprites%252Fimages%2FdataScience__1644555732575.png&w=1920&q=75"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </Row>


      <Row className="mt-4">
        <MultiCarousel breakPoints={breakPoints}>
          {courses.map((item,index) => <CourseCard key={index} item={item}/>)}
        </MultiCarousel>
      </Row>
      <Row className="mt-4">
          {courses.map((item,index) => <Col lg="3"><CourseCard key={index} item={item}/></Col>)}
      </Row>
    </>
  );
}

export default memo(Home);