import React from "react";
import newimage from "../assets/images/new.png";
import { reasons, testimonials } from "../utils/properties";
import line from "../assets/images/v.png";
import bg from "../assets/images/newest.jpg";
const HomeComponents = () => {
  return (
    <main className="bg-[#f5f5f1]">
      <div className="layout">
        <div className="flex flex-col justify-between gap-20 ">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-[73px] ">
            <img
              src={newimage}
              alt=""
              className="w-full lg:w-[458px] h-[301px] rounded-2xl object-cover"
            />
            <div className="flex flex-col gap-11 text-center lg:text-left ">
              <div className="flex flex-col gap-2">
                <p className="text-orange-400 text-[18px] ">About Us </p>
                <h1 className=" text-[24px] md:text-[32px] font-semibold ">
                  Where Property Meets Simplicity
                </h1>
                <p className=" text-[14px] md:text-[18px] text-[#605E5E] font-light">
                  We are a modern real estate platform built to simplify the way
                  people buy, rent, and sell properties. Our goal is to remove
                  the stress, confusion, and unnecessary costs often associated
                  with property transactions by creating a seamless and
                  transparent experience for everyone.
                </p>
              </div>
              <button className="rounded-lg mx-auto lg:mx-0 bg-purple-500 px-6 py-3 w-[143px] cursor-pointer text-white">
                Learn More
              </button>
            </div>
          </div>
          <div>
            <p className="text-orange-400 text-[18px] text-center ">
              {" "}
              Why choose us
            </p>
            <h1 className="text-[32px] text-center mb-10 ">
              {" "}
              Why Choose Estatery
            </h1>
            <div className="w-full grid lg:grid-cols-3  gap-4">
              {reasons.map((reason) => {
                const { id, icons: Icon, title, text } = reason;
                return (
                  <div
                    key={id}
                    className="flex flex-col gap-4 items-center text-center w-full h-[225px] rounded-2xl bg-white shadow-md border border-gray-300 py-[26px] px-[23px] "
                  >
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#F1F0FE]">
                      <Icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <h2 className="text-[18px] font-semibold">{title}</h2>
                    <p className="text-[14px] text-[#605E5E]">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-orange-400 text-[18px] text-center ">
              {" "}
              Testimonials
            </p>
            <h1 className=" text-[24px] md:text-[32px] text-center mb-10 ">
              {" "}
              What Our Satisfied Clients Says
            </h1>
            <div className="grid lg:grid-cols-3 justify-center gap-7">
              {testimonials.map((testimonial) => {
                const { id, position, image, title, text, line } = testimonial;
                return (
                  <div
                    key={id}
                    className="flex flex-col gap-4   w-full   text-[#403F3F] rounded-[10px] bg-[#EEEDED] shadow-md border border-gray-300 py-[10px] px-[18px] "
                  >
                    <p className="text-[14px] text-[#605E5E]">{text}</p>
                    <img src={line} alt="Line" />
                    <div className="flex gap-3 ">
                      <img
                        src={image}
                        alt={title}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h2 className="text-[18px] font-semibold ">{title}</h2>
                        <p className="text-[14px] text-[#605E5E]">{position}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${bg})` }}
            className=" bg-cover bg-center bg-no-repeat h-129.5 rounded-[10px] w-full flex items-center justify-center"
          >
            <div className="flex py-10 px-4 text-center text-white flex-col items-center w-[70%] h-[70%] md:w-[573px] md:h-[342px] gap-[31px]   backdrop-blur-2xl border border-white/30 rounded-2xl shadow-lg md:p-[80px] ">
              <div>
                <h1 className=" text-[24px] md:text-[32px] text-center ">
                  {" "}
                  No Spam Promise
                </h1>
                <p className=" text-[14px] md:text-[18px] text-center mt-5 ">
                  Are you a landlord? Discover ways to increase your home's
                  value and get listed.
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-[23px]">
                <input
                  type="search"
                  name=""
                  id="search"
                  className="text-white border border-white px-6 py-3 w-full md:w-[313px] placeholder-white outline-none  rounded-lg "
                  placeholder="Enter your email "
                />
                <button
                  id="search"
                  className="rounded-lg bg-purple-500 px-6 py-3 w-full md:w-[143px] cursor-pointer text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeComponents;
