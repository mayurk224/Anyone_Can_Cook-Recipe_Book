import { useRef, useState } from "react";
import Image from "../assets/muffin.jpg";

const Slider = () => {
  // State and ref to handle the active slide and scrolling
  const [activeIndex, setActiveIndex] = useState(0);
  const slideGroupRef = useRef(null);

  // Function to scroll to the selected slide
  const scrollToSlide = (index) => {
    if (slideGroupRef.current) {
      const slideWidth = slideGroupRef.current.children[0].offsetWidth;
      const scrollPosition = slideWidth * index;
      slideGroupRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  // Handler for the next button
  const handleNext = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = Math.min(prevIndex + 1, 1); // Change 1 to the number of slides - 1
      scrollToSlide(newIndex);
      return newIndex;
    });
  };

  // Handler for the previous button
  const handlePrev = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      scrollToSlide(newIndex);
      return newIndex;
    });
  };

  return (
    <div className="">
      <div
        ref={slideGroupRef}
        className="slideGroup flex flex-nowrap overflow-hidden scroll-smooth rounded-3xl"
      >
        {/* Slide 1 */}
        <div className="bg-slate-500 w-full rounded-3xl h-[550px] flex overflow-hidden flex-shrink-0">
          <div className="w-1/2 px-14 pt-10">
            <h3 className=" bg-slate-100 w-fit px-3 py-2 rounded-3xl text-base font-semibold">
              📃 Hot Recipes
            </h3>
            <h1 className="text-6xl font-semibold leading-tight mt-5">
              Spicy delicious chicken wings
            </h1>
            <p className="mt-5">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
              maiores quo in incidunt sed, ipsa animi illum ut aut vel nisi
              quisquam obcaecati. Illum aperiam, veniam possimus a cupiditate.
            </p>
            <div className="flex mt-6 gap-7">
              <h3 className="px-3 py-2 rounded-3xl font-semibold bg-slate-600">
                🕧 30 minutes
              </h3>
              <h3 className="px-3 py-2 rounded-3xl font-semibold bg-slate-600">
                🍴 Dinner
              </h3>
            </div>
            <button className="bg-black text-white text-lg rounded-xl font-semibold px-4 py-2 mt-7">
              View Recipe <span className="rotate-90 scale-125">🔺</span>
            </button>
          </div>
          <div className="w-1/2">
            <img
              src={Image}
              alt="Recipe"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Slide 2 */}
        <div className="bg-slate-500 w-full rounded-3xl h-[550px] flex overflow-hidden flex-shrink-0">
          <div className="w-1/2 px-14 pt-10">
            <h3 className=" bg-slate-100 w-fit px-3 py-2 rounded-3xl text-base font-semibold">
              📃 Hot Recipes
            </h3>
            <h1 className="text-6xl font-semibold leading-tight mt-5">
              Delicious Grilled Steak
            </h1>
            <p className="mt-5">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae,
              mollitia. Animi fugiat repellat reprehenderit corporis maiores!
            </p>
            <div className="flex mt-6 gap-7">
              <h3 className="px-3 py-2 rounded-3xl font-semibold bg-slate-600">
                🕧 45 minutes
              </h3>
              <h3 className="px-3 py-2 rounded-3xl font-semibold bg-slate-600">
                🍴 Lunch
              </h3>
            </div>
            <button className="bg-black text-white text-lg rounded-xl font-semibold px-4 py-2 mt-7">
              View Recipe <span className="rotate-90 scale-125">🔺</span>
            </button>
          </div>
          <div className="w-1/2">
            <img
              src={Image}
              alt="Recipe"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="buttonGroup flex justify-end gap-2 mt-3">
        <button
          onClick={handlePrev}
          className={`${activeIndex === 0 ? "opacity-50" : ""}`}
          disabled={activeIndex === 0}
        >
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/pulsar-line/48/circled-chevron-left.png"
            alt="Previous"
          />
        </button>
        <button
          onClick={handleNext}
          className={`${activeIndex === 1 ? "opacity-50" : ""}`}
          disabled={activeIndex === 1}
        >
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/pulsar-line/48/circled-chevron-right.png"
            alt="Next"
          />
        </button>
      </div>
    </div>
  );
};

export default Slider;
