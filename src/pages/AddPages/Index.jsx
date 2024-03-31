import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Navigation from "../../components/layout/Navigation/Index";
import Footer from "../../components/layout/Footer";
import { useGetAll } from "../../Hooks";
import { useParams } from "react-router-dom";

function KnowingFairseed({ title, content, navbar, footer }) {
  const { slug } = useParams();
  const { data: contentData } = useGetAll({
    key: `/admin-dashboard/slug/${slug}`,
    select: (data) => data?.data?.data,
  });
  console.log(contentData?.show_navbar, "<====contentData.navbar");

  return (
    <div className="flex flex-col justify-center items-center">
      {contentData?.show_navbar && <Navbar />}
      <div className="w-full pb-4">
        <Navigation label={contentData?.title} heading={contentData?.title} />
      </div>

      {/* <div>
        <img
          className="max-w-[550px] w-full max-h-[400px] h-full"
          style={imageStyle}
          src={img}
          alt="img"
        ></img>
      </div> */}

      <div
        className="pt-8 flex-row text-left  max-w:[1920px] max-desktop:w-[718px] max-tablet:w-[400px] gap-[10px] px-10 max-desktop:px-2 max-tablet:px-6"
        style={{ whiteSpace: "pre-line", fontFamily: "satoshi" }}
        dangerouslySetInnerHTML={{ __html: contentData?.content }}
      ></div>
      {contentData?.show_footer && <Footer />}
    </div>
  );
}

export default KnowingFairseed;
