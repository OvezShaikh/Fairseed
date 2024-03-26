import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../../components/layout/Footer";
import Navbar from "../../../components/layout/Navbar";
import images from "../../../constants/images";
import Card from "../../../components/layout/Card";
import Navigation from "../../../components/layout/Navigation/Index";
import axios from "axios";

import NoCampaign from "../../Campaigns/CampaignsByCategory/NoCampaign";
import FilterField from "../../../components/inputs/FilterField/Index";
// import "./CampaignsByCategory.css";
import ScrollableTabsButtonForce from "../../../components/layout/ScrollableTabsButtonAuto";

function Index() {
  const { name } = useParams();
  const [categoryCampaignList, setCategoryCampaignList] = useState([]);
  const [categoryDetail, setCategoryDetail] = useState(null);

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [showOptions, setShowOptions] = useState(false);

  const [categoryDataFromChild, setCategoryDataFromChild] = useState("");
  const [locationDataFromChild, setLocationDataFromChild] = useState("");

  const filterToggle = () => {
    setShowOptions(!showOptions);
  };

  const receiveCategoryFromChild = (categoryData) => {
    setCategoryDataFromChild(categoryData);
  };

  const receiveLocationFromChild = (locationData) => {
    setLocationDataFromChild(locationData);
  };

  const filteredUserList = Array.from(
    new Set(
      categoryCampaignList
        .filter((item) => {
          const isDataMatch =
            (categoryDataFromChild.length === 0 &&
              locationDataFromChild.length === 0) ||
            (categoryDataFromChild.includes(item.category.name) &&
              locationDataFromChild.length === 0) ||
            (locationDataFromChild.includes(item.location) &&
              categoryDataFromChild.length === 0) ||
            (categoryDataFromChild.includes(item.category.name) &&
              locationDataFromChild.includes(item.location));

          return isDataMatch;
        })
        .map((item) => item.id)
    )
  ).map((id) => categoryCampaignList.find((item) => item.id === id));

  const fetchCategoryDetail = async () => {
    const perPage = 4;
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/campaign/successful-campaign?page=${page}&limit=${perPage}`
    );
    if (Array.isArray(res.data.rows)) {
      setTotalPages(res.data.pages_count);
      setCategoryCampaignList([...categoryCampaignList, ...res.data.rows]);
      setCategoryDetail(res.data.rows[0]);
      console.log("FETCH CATEGORY DETAIL =================>", res.data.rows[0]);
    } else {
      // console.error("Invalid data structure. Expected an array:", res.data.category_data);
    }
    console.log(res.data.rows);
    setCategoryCampaignList(res.data.rows);
  };
  useEffect(() => {
    fetchCategoryDetail();
  }, [page]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col ">
        <Navigation
          label={"Successful Campaign"}
          heading={"Successful Campaign"}
        />
        {console.log(categoryDetail, "===========category")}

        <div className="flex flex-col justify-center  pt-[50px] px-[10px] items-center max-desktop:pt-[20px]">
          {categoryCampaignList?.length > 0 ? (
            <div className="flex flex-col justify-center items-center ">
              <div id="filter-location">
                <FilterField
                  sendCategoryToParent={receiveCategoryFromChild}
                  sendLocationToParent={receiveLocationFromChild}
                />
              </div>
              <div className="gap-4 pt-[2rem] flex flex-wrap justify-center desktop:w-[100%]">
                {filteredUserList?.map((item) => {
                  return (
                    <Card
                      key={item?.id}
                      username={item?.user?.username}
                      title={item?.title}
                      og_id={item?.id}
                      cardImage={item?.campaign_image}
                      goalAmount={item?.goal_amount}
                      fundRaised={item?.fund_raised}
                      daysLeft={item?.days_left}
                      userCount={item?.donor_count}
                      location={item?.location}
                    />
                  );
                })}
              </div>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                className="pt-[68px]"
                style={{
                  width: "fit-content",
                  textAlign: "center",
                  color: "#FF9F0A",
                  fontSize: 24,
                  fontFamily: "Satoshi",
                  fontWeight: "500",
                  textDecoration: "underline",
                  wordWrap: "break-word",
                  background:
                    "linear-gradient(to right, #FF9F0A 0%, #FF375F 62.9%)",
                  "-webkit-background-clip": "text",
                  "-webkit-text-fill-color": "transparent",
                  textDecoration: "underline",
                  position: "relative",
                  display: page >= totalPages ? "none" : "block",
                }}
              >
                <p className="gradient-button mb-0 align-middle">Load More</p>
              </button>
            </div>
          ) : (
            <div>{<NoCampaign />}</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Index;
