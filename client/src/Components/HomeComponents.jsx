import React from "react";
import newimage from "../assets/images/new.png";
import { reasons, testimonials } from "../utils/properties";
import bg from "../assets/images/newest.jpg";

const HomeComponents = () => {
  return (
    <main className="bg-[#f5f5f1] py-16 overflow-hidden">
      <div className="layout">
        <div className="flex flex-col justify-between gap-24">
          {/* About Us Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-[73px]">
            <img
              src={newimage}
              alt="About Vista Reality"
              className="w-full lg:w-[458px] h-[320px] rounded-2xl object-cover shadow-lg"
            />
            <div className="flex flex-col gap-8 text-center lg:text-left">
              <div className="flex flex-col gap-3">
                <span className="text-orange-500 font-semibold text-base uppercase tracking-wider">
                  About Us
                </span>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                  Where Property Meets Simplicity
                </h1>
                <p className="text-sm md:text-base text-[#605E5E] font-normal leading-relaxed">
                  We are a modern real estate platform built to simplify the way
                  people buy, rent, and sell properties. Our goal is to remove
                  the stress, confusion, and unnecessary costs often associated
                  with property transactions by creating a seamless and
                  transparent experience for everyone.
                </p>
              </div>
              <button
                type="button"
                className="rounded-xl mx-auto lg:mx-0 bg-[#7065F0] hover:bg-[#5a51d4] px-7 py-3.5 w-auto cursor-pointer text-white font-medium shadow-md transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Why Choose Us */}
          <div>
            <span className="text-orange-500 font-semibold text-base uppercase tracking-wider block text-center mb-2">
              Why choose us
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Why Choose Vista Reality
            </h1>
            <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reasons.map((reason) => {
                const { id, icons: Icon, title, text } = reason;
                return (
                  <div
                    key={id}
                    className="flex flex-col gap-4 items-center text-center w-full rounded-2xl bg-white shadow-sm hover:shadow-lg border border-gray-200/80 py-8 px-6 transition-shadow"
                  >
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F1F0FE]">
                      <Icon className="w-7 h-7 text-[#7065F0]" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                    <p className="text-sm text-[#605E5E] leading-relaxed">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <span className="text-orange-500 font-semibold text-base uppercase tracking-wider block text-center mb-2">
              Testimonials
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              What Our Satisfied Clients Say
            </h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-7">
              {testimonials.map((testimonial) => {
                const { id, position, image, title, text, line } = testimonial;
                return (
                  <div
                    key={id}
                    className="flex flex-col justify-between gap-5 w-full text-[#403F3F] rounded-2xl bg-white shadow-sm hover:shadow-lg border border-gray-200/80 p-6 transition-shadow"
                  >
                    <p className="text-sm text-[#605E5E] leading-relaxed italic">"{text}"</p>
                    {line && <img src={line} alt="Line" className="w-full opacity-30" />}
                    <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                      <img
                        src={image}
                        alt={title}
                        className="w-13 h-13 rounded-full object-cover ring-2 ring-purple-100"
                      />
                      <div>
                        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
                        <p className="text-xs text-[#605E5E]">{position}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Newsletter Banner */}
          <div
            style={{ backgroundImage: `url(${bg})` }}
            className="bg-cover bg-center bg-no-repeat h-[480px] rounded-3xl w-full flex items-center justify-center p-4 shadow-xl overflow-hidden"
          >
            <div className="flex py-10 px-6 text-center text-white flex-col items-center w-full max-w-xl gap-6 backdrop-blur-md bg-black/40 border border-white/20 rounded-3xl shadow-2xl">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  No Spam Promise
                </h1>
                <p className="text-sm md:text-base text-gray-200 mt-2">
                  Are you a landlord? Discover ways to increase your home's
                  value and get listed.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <input
                  type="email"
                  className="text-white border border-white/40 bg-white/10 px-5 py-3.5 w-full placeholder-white/70 outline-none rounded-xl focus:border-white focus:bg-white/20 transition-all text-sm"
                  placeholder="Enter your email"
                />
                <button
                  type="button"
                  className="rounded-xl bg-[#7065F0] hover:bg-[#5a51d4] px-7 py-3.5 w-full sm:w-auto shrink-0 cursor-pointer text-white font-medium shadow-md transition-colors"
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
