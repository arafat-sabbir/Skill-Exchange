import React, { useState } from "react";

const Faq = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveAccordion(index === activeAccordion ? null : index);
  };

  const faqData = [
    {
      question: "Can I cancel at any time?",
      answer:
        "Yes, you can cancel anytime. No questions are asked while you cancel, but we would highly appreciate if you will give us some feedback.",
    },
    {
      question: "My team has credits. How do we use them?",
      answer:
        "Once your team signs up for a subscription plan, this is where we sit down, grab a cup of coffee, and dial in the details.",
    },
    {
      question: "How does Preline's pricing work?",
      answer:
        "Our subscriptions are tiered. Understanding the task at hand and ironing out the wrinkles is key.",
    },
    {
      question: "How secure is Preline?",
      answer:
        "Protecting the data you trust to Preline is our first priority. This part is really crucial in keeping the project in line to completion.",
    },
    {
      question: "How do I get access to a theme I purchased?",
      answer:
        "If you lose the link for a theme you purchased, don't panic! We've got you covered. You can log in to your account, tap your avatar in the upper right corner, and tap Purchases. If you didn't create a login or can't remember the information, you can use our handy Redownload page. Just remember to use the same email you originally made your purchases with.",
    },
    {
      question: "Upgrade License Type",
      answer:
        "There may be times when you need to upgrade your license from the original type you purchased, and we have a solution that ensures you can apply your original purchase cost to the new license purchase.",
    },
  ];

  return (
    <div className=" my-20">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto bg-[#faf6eb7a] rounded-3xl">
        <div className=" w-[296px] my-10 text-center mx-auto h-[56px] bg-no-repeat flex bg-hero-pattern">
          <h3 className="text-white text-2xl ml-[48px]  mt-3  font-bold">
            Frequanlty Asked
          </h3>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="hs-accordion-group">
            {faqData.map((item, index) => (
              <div
                className={`hs-accordion ${
                  index === activeAccordion
                    ? "hs-accordion-active:bg-gray-100"
                    : ""
                } rounded-xl p-6 dark:hs-accordion-active:bg-white/[.05]`}
                key={index}
              >
                <button
                  className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  onClick={() => handleAccordionClick(index)}
                  aria-controls={`hs-basic-with-title-and-arrow-stretched-collapse-${index}`}
                >
                  {item.question}
                  <svg
                    className={`hs-accordion-active:${
                      index === activeAccordion ? "block" : "hidden"
                    } flex-shrink-0 w-5 h-5 text-gray-600 group-hover:text-gray-500 dark:text-gray-400`}
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
