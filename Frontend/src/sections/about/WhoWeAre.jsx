import React from "react";

const WhoWeAre = () => {
  return (
    <section className="relative w-full bg-dark-50 py-16 md:py-24 overflow-hidden">
      
      {/* Background Circle Decoration */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-dark-200 opacity-40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          
          {/* LEFT IMAGES */}
          <div className="hidden lg:flex flex-col gap-10 items-end">
            <img
              src="/images/lamp.jpg"
              alt="lamp"
              className="w-48 xl:w-56 rounded-lg object-cover shadow-md"
            />
            <img
              src="/images/chair.jpg"
              alt="chair"
              className="w-52 xl:w-60 rounded-lg object-cover shadow-md"
            />
          </div>

          {/* CENTER CONTENT */}
          <div className="text-center">
            <p className="text-sm tracking-widest text-dark-500 mb-3 uppercase">
              Who We Are
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-dark-900 leading-snug mb-6">
              The Journey Behind Our <br />
              Professional Interior Design Studio
            </h2>

            <p className="text-dark-500 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-8">
              Penatibus primis ullamcorper litora lacus cursus maximus. Nullam
              sociosqu mauris lorem cras volutpat donec adipiscing vitae
              praesent fermentum parturient. Facilisis si odio donec morbi
              congue eu. Nullam sem inceptos pulvinar iaculis hendrerit a
              posuere.
            </p>

            <button className="px-6 py-3 border border-dark-300 text-dark-700 text-sm tracking-wide hover:bg-primary-500 hover:text-white transition-all duration-300">
              DISCOVER MORE
            </button>
          </div>

          {/* RIGHT IMAGES */}
          <div className="hidden lg:flex flex-col gap-10 items-start">
            <img
              src="/images/table.jpg"
              alt="table"
              className="w-52 xl:w-60 rounded-lg object-cover shadow-md"
            />
            <img
              src="/images/stairs.jpg"
              alt="stairs"
              className="w-48 xl:w-56 rounded-lg object-cover shadow-md"
            />
          </div>
        </div>

        {/* MOBILE IMAGE GRID */}
        <div className="grid grid-cols-2 gap-4 mt-10 lg:hidden">
          <img src="/images/lamp.jpg" className="rounded-lg object-cover" />
          <img src="/images/table.jpg" className="rounded-lg object-cover" />
          <img src="/images/chair.jpg" className="rounded-lg object-cover" />
          <img src="/images/stairs.jpg" className="rounded-lg object-cover" />
        </div>

      </div>
    </section>
  );
};

export default WhoWeAre;