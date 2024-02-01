import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const JobDetailPage = ({ JobDetail, handleSubmitReview, reviewRef }) => {
    return (
        <>
            <div className="min-w-5xl w-[600px] shadow-[0_0_70px_#E0E0E0] dark:shadow-[0_0_50px_#122827] px-8 py-4 bg-white rounded-lg  dark:bg-gray-900">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-gray-600 dark:text-slate-300">
                        Deadline : {JobDetail.deadline}
                    </span>
                    <button className="px-3 py-1 text-sm font-bold text-gray-100 transition-duration-300 transform bg-gray-600 rounded cursor-pointer ">
                        {JobDetail.category}
                    </button>
                </div>
                <div className="mt-2">
                    <p className="text-xl font-bold text-gray-700 dark:text-slate-300 dark:hover:text-gray-200 ">
                        {JobDetail?.jobtitle}
                    </p>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{JobDetail.description}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                    {/* Review Job Button */}
                    <button
                        className="text-black dark:text-slate-300 border p-1 hover:border-gray-700 hover:scale-95 transition duration-300 font-semibold w-[100px] "
                        onClick={() =>
                            document.getElementById("my_modal_1").showModal()
                        }
                    >
                        Review job
                    </button>
                    {/* Modal For Review Job */}
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box pt-14">
                            <textarea
                                ref={reviewRef}
                                className="border-2 border-main flex p-4  justify-center ml-8 rounded-xl"
                                name="text-area"
                                id=""
                                cols="40"
                                rows="6"
                                placeholder="Your Review"
                            ></textarea>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button>Cancel</button>
                                    <button
                                        onClick={() => handleSubmitReview(JobDetail._id)}
                                        className="ml-4"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                    {/* Seller Information */}
                    <div className="flex items-center">
                        <img
                            className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
                            src={JobDetail.sellerPhoto}
                            alt="Seller Image"
                        />
                        <a
                            className="font-bold text-gray-700 cursor-pointer dark:text-gray-200"
                            tabIndex="0"
                        >
                            {JobDetail.sellerName}
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobDetailPage;


JobDetailPage.propTypes = {
    JobDetail: PropTypes.obj,
    handleSubmitReview: PropTypes.func
}