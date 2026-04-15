import React from "react";
import { Link } from "react-router-dom";

const WhoWeAre = () => {
    return (
        <section className="relative w-full bg-dark-50 py-16 md:py-24 overflow-hidden"
            style={{
                backgroundImage: "url('https://res.cloudinary.com/doo2og4l3/image/upload/v1776255236/home-about_dp5sbb.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}>
            {/* White Opacity Overlay - using white with 90% opacity */}
            <div className="absolute inset-0 bg-dark-100/90"></div>


            {/* Background Circle Decoration */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-dark-200 opacity-40"></div>
            </div>

            <div className="relative z-10">

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">

                    {/* LEFT IMAGES */}
                    <div className="hidden lg:flex flex-col gap-10 items-end">
                        <img
                            src="https://res.cloudinary.com/doo2og4l3/image/upload/v1776266399/wwr-1_ydgx8g.jpg"
                            alt="lamp"
                            className="w-48 xl:w-56 rounded-lg object-cover shadow-md mr-20"
                        />
                        <img
                            src="https://res.cloudinary.com/doo2og4l3/image/upload/v1776266663/beautiful-kitchen-interior-design_edy1jk.jpg"
                            alt="chair"
                            className="w-52 xl:w-60 h-62 rounded-lg object-cover shadow-md mr-8"
                        />
                    </div>

                    {/* CENTER CONTENT */}
                    <div className="text-center">
                        <p className="text-sm tracking-widest text-primary-500 mb-3 uppercase">
                            Who We Are
                        </p>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-dark-900 leading-snug mb-6">
                            The Journey Behind Our <br />
                            Professional Interior Design
                        </h2>

                        <p className="text-dark-600 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-8">
                            Buildcare turkey interior contractor is a professional interior design company known for delivering innovative solutions for both residential and commercial spaces. We specialize in space planning and design, customized to fit your needs, preferences, and budget. We encourage our clients to be involved at every stage, ensuring that the design truly reflects their vision. With our experienced team of designers and decorators, we guarantee excellent value for your investment. Our approach is personalized, working closely with you to plan the space, understand the requirements, and create a style that fits your lifestyle perfectly.
                        </p>

                        <Link to='/about/process'>
                            <button className="px-6 py-3 border border-primary-300 text-primary-600 text-sm tracking-wide hover:bg-primary-500 hover:text-white transition-all duration-300 cursor-pointer">
                                DISCOVER MORE
                            </button>
                        </Link>
                    </div>

                    {/* RIGHT IMAGES */}
                    <div className="hidden lg:flex flex-col gap-10 items-start">
                        <img
                            src="https://res.cloudinary.com/doo2og4l3/image/upload/v1776266661/2148899443_gc8atd.jpg"
                            alt="table"
                            className="w-52 xl:w-60 ml-20 rounded-lg object-cover shadow-md"
                        />
                        <img
                            src="https://res.cloudinary.com/doo2og4l3/image/upload/v1776266660/3d-rendering-white-wood-living-room-near-bedroom-upstair_g1utjz.jpg"
                            alt="stairs"
                            className="w-48 xl:w-56 h-62 rounded-lg object-cover shadow-md ml-8"
                        />
                    </div>
                </div>

                {/* MOBILE IMAGE GRID */}
                <div className="grid grid-cols-2 gap-4 mt-10 lg:hidden">
                    <img src="https://res.cloudinary.com/doo2og4l3/image/upload/v1776266399/wwr-1_ydgx8g.jpg" className="rounded-lg object-cover" />
                    <img src="https://res.cloudinary.com/doo2og4l3/image/upload/v1776266663/beautiful-kitchen-interior-design_edy1jk.jpg" className="rounded-lg object-cover" />
                    <img src="https://res.cloudinary.com/doo2og4l3/image/upload/v1776266661/2148899443_gc8atd.jpg" className="rounded-lg object-cover" />
                    <img src="https://res.cloudinary.com/doo2og4l3/image/upload/v1776266660/3d-rendering-white-wood-living-room-near-bedroom-upstair_g1utjz.jpg" className="rounded-lg object-cover" />
                </div>

            </div>
        </section>
    );
};

export default WhoWeAre;