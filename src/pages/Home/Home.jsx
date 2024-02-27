import React from "react";
import "./Home.css";

import button from "../../constants/button";
import Card from "../../components/layout/Card";
import ScrollableTabsButtonForce from "../../components/layout/ScrollableTabsButtonAuto";
import Coursal from "../../components/layout/Coursal";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import DashBoard from "../../components/layout/DashBoard";
import PrimaryButton from "../../components/inputs/PrimaryButton";
import { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from '../login/UserNavbar'

import images from "../../constants/images";
import { color } from "@mui/system";
import { Link } from "react-router-dom";



import BottomSlider from "../../components/layout/BottomSlider/Index";


import FilterField from "../../components/inputs/FilterField/Index";
import UserLogin from "../login/Login_page/Index";
import { toast } from "react-toastify";




function Home() {
  const [userList, setUserList] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [campaignCount, setCampaignCount] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [perPage, setPerPage] = useState(100);

  const [categoryDataFromChild, setCategoryDataFromChild] = useState('');
  const [locationDataFromChild, setLocationDataFromChild] = useState('');


  const [visibleCards, setVisibleCards] = useState(8);



  const receiveCategoryFromChild = (categoryData) => {



    console.log("DATA FROM CHILD Category ", categoryData);
    setCategoryDataFromChild(categoryData);


  };

  const receiveLocationFromChild = (locationData) => {



    console.log("DATA FROM CHILD Location ", locationData);
    setLocationDataFromChild(locationData);


  };



  const filteredUserList = Array.from(
    new Set(
      userList.filter((item) => {







        const isDataMatch = (((categoryDataFromChild.length === 0) && (locationDataFromChild.length === 0)) || ((categoryDataFromChild.includes(item.category.name)) && (locationDataFromChild.length === 0))) || (((locationDataFromChild.includes(item.location)) && (categoryDataFromChild.length === 0))) || ((categoryDataFromChild.includes(item.category.name)) && (locationDataFromChild.includes(item.location)));

        return isDataMatch;
      }).map((item) => item.id)
    )
  ).map((id) => userList.find((item) => item.id === id));

  const filteredCardCount = filteredUserList.length;




  useEffect(() => {

    //console.log("DATA FROM CHILD ", dataFromChild)

    if (filteredCardCount <= 8) {
      console.log("Less than 8");
      //setPerPage([perPage+12]);
      // fetchUserList();


    }
    //  else{
    //   setPerPage(8);
    //  }


  }, [categoryDataFromChild, locationDataFromChild]);


  const filterToggle = () => {

    setShowOptions(!showOptions);
  };

  const loadMore = () => {


    console.log("LOAD MORE CLICKED");

    setVisibleCards((prevVisibleCards) => prevVisibleCards + 4);

    if (page < totalPages) {
      setPage(page + 1);
    }

    if (visibleCards >= perPage) {
      setPerPage(perPage + 100)
    }

    


  };

  const fetchUserList = async () => {
    try {
      // const perPage = 100;
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/campaign/campaign?page=${page}&limit=${perPage}`,
        // {
        //   headers:{
        //     "x-access-token":localStorage.getItem('token')
        //   }
        // }
      );
      const res = response.data;
      console.log(localStorage.getItem() , "<================");
      console.log(res.rows);
      // `${process.env.REACT_APP_API_URL}/campaign/campaign?page=${page}&limit=${perPage}`
      if (Array.isArray(res.rows)) {
        setTotalPages(res.pages_count);
        setUserList([...userList, ...res.rows]);
        setCampaignCount(res.count);




      } else {
        console.error("Invalid data structure. Expected an array:", res.data);
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
  useEffect(() => {
    fetchUserList();

  }, [page]);
  let bnk = [
    {
      title: "Help me fund my College Fees for Harvard University",
      img: "https://deih43ym53wif.cloudfront.net/large_blue-mosque-glorius-sunset-istanbul-sultan-ahmed-turkey-shutterstock_174067919.jpg_1404e76369.jpg",
      actualMoney: 6700,
      totalMoney: 64000,
      userCount: "1003",
      daysLeft: "10 Days Left",
    },
  ];
  return (
    <>
      <div className="">


        <Navbar />

      </div>
      <div>
        <Coursal />
      </div>
      <div
        className="bg-[#FFF6F5] desktop:justify-between max-desktop:flex-wrap max-desktop:justify-center max-desktop:gap-y-[64px] desktop:px-[48px] desktop:py-[48px] max-desktop:py-[80px] max-tablet:py-[60px] max-tablet:gap-y-[32px]"
        style={{
          width: "100%",
          height: "100%",


          alignItems: "flex-start",
          display: "flex",
        }}
      >
        <DashBoard />
      </div>
      <div className="flex pt-[128px] ">
        <div className="w-full flex-wrap flex flex-col items-center mx-10">
          <h1
            className="font-extrabold pb-[24px] desktop:text-[48px] max-desktop:text-[36px] max-tablet:text-[24px] max-tablet:pb-[20px]"
            style={{ fontFamily: "Satoshi" }}
          >
            Ongoing Campaigns
          </h1>
          <div className="flex flex-col  text-center text-black/100 mb-[64px] max-tablet:mb-[52px]">
            <Link
              style={{

                width: "100%",
                textAlign: "center",
                fontSize: 24,
                fontFamily: "Satoshi",
                fontWeight: "500",
                wordWrap: "break-word",
                background:
                  "linear-gradient(to right, #FF9F0A 0%, #FF375F 62.9%)",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
                textDecoration: "underline",
                position: "relative",
              }}
            >
              <p className="gradient-button mb-0 underline max-tablet:text-[16px]">
                See all {campaignCount} active campaigns
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-wrap w-full mb-[128px] items-center max-tablet:mb-[48px]">
        <div className="flex  desktop:ml-[-30px] desktop:max-w-[1760px] desktop:w-full desktop:justify-end max-desktop:w-[90%] max-desktop:flex-col max-desktop:items-end max-desktop:gap-y-[48px] max-tablet:mb-[50px] max-tablet:gap-y-[20px] scrollable-tabs-class ">
          <ScrollableTabsButtonForce />
          <button
            className="flex items-center ml-2 px-3 py-1.5 max-w-[115px] gap-x-[12px] max-desktop:px-[20px] max-desktop:py-[17px] max-tablet:py-[6px]"
            style={{ backgroundColor: "rgba(255, 246, 245, 1)" }}

            onClick={filterToggle}

          >
            <img src={images.Funnel} />
            {/* <img src={images.Filter} /> */}
            <p className="text-[18px]" style={{
              background:
                "linear-gradient(to right, #FF9F0A 0%, #FF375F 62.9%)",
              "-webkit-background-clip": "text",
              "-webkit-text-fill-color": "transparent",
              "font-family": 'Satoshi',
              "font-weight": "700",
            }
            }>Filter</p>
          </button>

        </div>
        {showOptions && (

          <FilterField sendCategoryToParent={receiveCategoryFromChild} sendLocationToParent={receiveLocationFromChild} />


        )}



        <div className="desktop:gap-x-[36px] desktop:gap-y-[48px] mt-[48px]  flex flex-wrap w-full justify-center desktop:max-w-[1740px] max-desktop:gap-x-[16px]  max-desktop:gap-y-[24px] max-tablet:gap-y-[48px]">
          {filteredUserList?.slice(0, visibleCards).map((item) => {
            return (
              <Card
                key={item.id}
                username={item.user.username}
                title={item.title}
                og_id={item.id}
                cardImage={item.campaign_image}
                goalAmount={item.goal_amount}
                fundRaised={item.fund_raised}
                daysLeft={item.days_left}
                userCount={item.donor_count}
                location={item.location}
              />
            );
          })}
        </div>
        <button
          className="pt-[64px] max-tablet:pt-[24px]"
          onClick={() => loadMore()}
          disabled={visibleCards >= campaignCount}
          id="loadmorebutton"
          style={{
            width: "fit-content",
            textAlign: "center",
            color: "#FF9F0A",
            fontSize: 24,
            fontFamily: "Satoshi",
            fontWeight: "500",
            textDecoration: "underline",
            wordWrap: "break-word",
            background: "linear-gradient(to right, #FF9F0A 0%, #FF375F 62.9%)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
            textDecoration: "underline",
            display: ((visibleCards >= campaignCount) || (filteredCardCount < 8) ? "none" : "block"),
            position: "relative",

          }}
        >
          <p className="gradient-button mb-0">Load More</p>
        </button>

      </div>
      <section className="bg-[#FFF6F5]">
        <div
          className="flex flex-col flex-wrap w-full   desktop:py-[128px] px-7  items-center max-desktop:py-[80px] max-tablet:py-[64px]"
          style={{ backgroundColor: "rgba(255, 246, 245, 1)" }}
        >
          <h1
            className="font-bold pb-[96px] text-[48px] max-desktop:pb-[48px] max-tablet:pb-[28px] max-tablet:text-[24px]"
            style={{ fontFamily: "Satoshi", fontWeight: 900 }}
          >
            How it Works
          </h1>
          <div className="flex desktop:max-w-[94%] desktop:justify-between mt-0 place-items-center w-full max-desktop:flex-col max-desktop:gap-y-[40px] desktop:mb-[96px] max-desktop:mb-[48px]">
            <div className="place-items-center">
              <div className="max-w-[120px] mx-auto max-tablet:max-w-[75px]">
                <img className="" src={images.person} alt="" />
              </div>
              {/* <div className="grid grid-cols-12 mt-4"> */}
              <div className="flex justify-between mt-[48px] gap-x-[20px]">
                <div>
                  <img className="mr-3 col-span-2" src={images.one} alt="" />
                </div>
                <div className=" ml-2 col-span-10">
                  <h1
                    className="text-[28px] font-black max-tablet:text-[24px] max-tablet:font-bold"
                    style={{
                      color: "#4A4E5A",

                      fontFamily: "Satoshi",

                      wordWrap: "break-word",
                    }}
                  >
                    Create your Profile
                  </h1>
                  <p
                    className="text-[24px] max-tablet:text-[18px] max-tablet:font-normal"
                    style={{
                      width: "100%",
                      color: "#6B7280",

                      fontFamily: "Satoshi",

                      wordWrap: "break-word",
                      marginTop: 6,
                    }}
                  >
                    Start with the basics
                    <br /> Kick things off with your
                    <br /> name and location.
                  </p>
                </div>
              </div>
            </div>
            <img className="col-span-1 max-desktop:rotate-90" src={images.Arrow} />
            <div className="col-span-3 grid grid-cols-1 place-items-center">
              <div className="desktop:max-w-[120px] max-tablet:max-w-[75px]">
                <img className="" src={images.pencicon} alt="" />
              </div>
              {/* <div className="grid grid-cols-12 mt-4"> */}
              <div className="flex justify-between grid-cols-12 mt-[48px] gap-x-[20px]">
                <div>
                  <img className=" mr-3 col-span-2" src={images.two} alt="" />
                </div>
                <div className=" ml-2 col-span-10">
                  <h1 className="text-[28px] font-black max-tablet:text-[24px] max-tablet:font-bold"

                    style={{
                      color: "#4A4E5A",

                      fontFamily: "Satoshi ",

                      wordWrap: "break-word",
                    }}
                  >
                    Fill Cause Information
                  </h1>
                  <p
                    className="text-[24px] max-tablet:text-[18px] max-tablet:font-normal"
                    style={{
                      width: "100%",
                      color: "#6B7280",

                      fontFamily: "Satoshi",

                      wordWrap: "break-word",
                      marginTop: 6,
                    }}
                  >
                    Tell your story
                    <br /> We'll guide you with tips
                    <br /> along the way.
                  </p>
                </div>
              </div>
            </div>
            <img className="col-span-1 max-desktop:rotate-90" src={images.Arrow} />
            <div className="col-span-3 grid grid-cols-1  place-items-center">
              <div className="desktop:max-w-[120px] max-tablet:max-w-[75px]">
                <img className="" src={images.Home} alt="" />
              </div>
              {/* <div className="grid grid-cols-12 mt-4"> */}
              <div className="flex justify-between grid-cols-12 mt-[48px] gap-x-[20px]">
                <div className="desktop:max-w-[120px]">
                  <img className="" src={images.three} alt="" />
                </div>
                <div className=" ml-2 col-span-10">
                  <h1
                    className="text-[28px] font-black max-tablet:text-[24px] max-tablet:font-bold"
                    style={{
                      color: "#4A4E5A",

                      fontFamily: "Satoshi",

                      wordWrap: "break-word",
                    }}
                  >
                    Update Acc details
                  </h1>
                  <p
                    className="text-[24px] max-tablet:text-[18px] max-tablet:font-normal"
                    style={{
                      width: "100%",
                      color: "#6B7280",

                      fontFamily: "Satoshi",

                      wordWrap: "break-word",
                      marginTop: 4,
                    }}
                  >
                    Upload ID and a valid
                    <br /> account number. Our team
                    <br /> will verify the same.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {
            localStorage.getItem('token') ? (
              <Link to="/Home/Create-Campaign">
              <PrimaryButton
                sx={{
                  borderRadius: "var(--Pixels-8, 8px)",
                  fontSize: 20,
                  fontWeight: "900",
                  padding: "15px 28px 15px 28px",
  
                }}
                className="py-[15px] px-[28px] my-10"
              >
                <div className="mr-2" style={{ width: 32, height: 32, position: "relative" }}>
                  <img src={images.RocketLaunch} alt="" />
                </div>
                <div className="max-tablet:text-[16px]">Launch a Campaign Now !</div>
              </PrimaryButton>
            </Link>
            ) : (
             
              <PrimaryButton
                sx={{
                  borderRadius: "var(--Pixels-8, 8px)",
                  fontSize: 20,
                  fontWeight: "900",
                  padding: "15px 28px 15px 28px",
  
                }}
                onClick ={ ()=>toast.error("Please Login !!! ", {
                  position:'top-center'
                })  
                }
                className="py-[15px] px-[28px] my-10"
              >
                <div className="mr-2" style={{ width: 32, height: 32, position: "relative" }}>
                  <img src={images.RocketLaunch} alt="" />
                </div>
                <div className="max-tablet:text-[16px]">Launch a Campaign Now !</div>
              </PrimaryButton>
           
            )
          }
      
         
        </div>
      </section>
      <div className="flex-col pt-[60px] pb-[50px] flex-wrap container flex w-full text-center items-center max-tablet:pb-[24px]">
        <h1
          className="desktop:text-[48px] font-bold max-desktop:text-[36px] max-tablet:text-[24px]"
          style={{ fontFamily: "Satoshi", fontWeight: 900 }}
        >
          Causes by Category
        </h1>
        <p
          className="text-black/60 font-medium mt-3 max-w-[974px] desktop:text-[24px] desktop:font-bold capitalize text-[#8E95A2] max-desktop:text-[20px] max-tablet:text-[16px] max-tablet:mt-[24px] max-tablet:font-normal"
          style={{ fontFamily: "Satoshi" }}
        >
          Be it for a personal need, social cause or a creative idea - you can
          count on us for the project that you want to raise funds for.
        </p>
      </div>
      <div className="flexDirection:'row' w-full justify-center items-center flex mt-[80px] gap-5 px-[50px] max-desktop:px-0 max-tablet:mt-0">
        <div className="bottom-slider-div">
          <BottomSlider />

          <i className="icon-arrow-long-right review-swiper-button-next"></i>
          <i className="icon-arrow-long-left review-swiper-button-prev"></i>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>





    </>
  );
}

export default Home;