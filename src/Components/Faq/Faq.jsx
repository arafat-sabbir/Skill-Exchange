import React, { useState } from "react";

const Faq = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveAccordion(index === activeAccordion ? null : index);
  };

  const faqData = [
    {
      question: "Can I Reject My Job  Bid Request?",
      answer:
        "Yes, you can reject anytime. No questions are asked while you reject, but we would highly appreciate if you will give The Bidder  some feedback about Why You rejected The Bid.",
    },
    {
      question: "Can I Update My Job Post Info  if something Goes Wrong?",
      answer:
        "Once your'e signs up ,You can See A Option On Navbar My Posted Job There You can See ALl of your Job With Detail info You can Update the Job From There...",
    },
    {
      question: "How can I see All the Job Post I have been Bidded For..?",
      answer:
        "Once Your'e Logged In You can See A Option On Navbar As My Bids You can See All the job You have Been Bidded On there.",
    },
    {
      question: "How Can I see All of Job Bid Request?",
      answer:
        "You can See ALl of Your Job Post Bid Request Once You're logged In You can see Them all On the Bid Requests Option From Navbar..",
    },
    {
      question: "Can I Delete A Job Post If I Have A Change Of mind?",
      answer:
        "Yes You Can! If You have Change of Mind You Can See All the Job On My Posted Job Section Once Your'e Logged From There You Can Delete The Job Post You Want..",
    },
  ];

  return (
    <div className=" my-20">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto bg-[#fcf9ffc4] rounded-3xl">
        <div className=" w-[296px] my-10 text-center mx-auto h-[56px] bg-no-repeat flex bg-hero-pattern">
          <h3 className="text-white text-2xl ml-[48px]  mt-3  font-bold">
            Frequanlty Asked
          </h3>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="hs-accordion-group ">
            {faqData.map((item, index) => (
              <div
                className={`hs-accordion ${
                  index === activeAccordion
                    ? "hs-accordion-active:bg-gray-100"
                    : ""
                } rounded-xl p-6 dark:hs-accordion-active:bg-white/[.05] border border-main mb-4`}
                key={index}
              >
                <button
                  className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-main dark:text-gray-200 dark:hover:text-main dark:focus:outline-none  dark:focus:ring-1 dark:focus:ring-gray-600"
                  onClick={() => handleAccordionClick(index)}
                  aria-controls={`hs-basic-with-title-and-arrow-stretched-collapse-${index}`}
                >
                  {item.question}
                  <svg
                    className={`hs-accordion-active:${
                      index === activeAccordion ? "block" : "hidden"
                    } flex-shrink-0 w-5 h-5 text-gray-600 group-hover:text-main dark:text-main`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div
                  id={`hs-basic-with-title-and-arrow-stretched-collapse-${index}`}
                  className={`hs-accordion-content ${
                    index === activeAccordion ? "w-full" : "hidden"
                  } overflow-hidden transition-[height] duration-300`}
                  aria-labelledby={`hs-basic-with-title-and-arrow-stretched-heading-${index}`}
                >
                  <p className="text-gray-800 dark:text-gray-200">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
