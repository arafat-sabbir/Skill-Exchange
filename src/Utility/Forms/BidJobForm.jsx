const BidJobForm = ({ handleBid, isButtonDisabled, user, JobDetail }) => {
    return (
        <form
            onSubmit={handleBid}
            className="lg:w-1/2 px-20 rounded-md py-20 mt-10 w-[90%] mx-auto mb-20 dark:shadow-[0_0_50px_#132827] shadow-[0_0_70px_#E0E0E0]"
        >
            <h3 className="font-semibold  text-2xl mb-6 text-center text-main dark:text-slate-300">
                Bidding Info
            </h3>
            <div className="md:flex gap-4">
                <div className="form-control lg:w-full">
                    <label className="label">
                        <span className="label-text">Your Email</span>
                    </label>
                    <input
                        type="text"
                        name="email"
                        placeholder="your email"
                        className="input rounded-sm bg-transparent text-black dark:text-slate-300 border border-gray-500 focus:ring-0 focus:outline-none focus:border-main"
                        required
                        defaultValue={user?.email}
                        disabled
                    />
                </div>
                <div className="form-control md:w-full">
                    <label className="label">
                        <span className="label-text">Seller Email</span>
                    </label>
                    <input
                        type="text"
                        name="sellerEmail"
                        className="input rounded-sm bg-transparent text-black dark:text-slate-300 border border-gray-500 focus:ring-0 focus:outline-none focus:border-main"
                        required
                        defaultValue={JobDetail.sellerEmail}
                        disabled
                    />
                </div>
            </div>
            <div className="md:flex gap-4">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Bidding Amount</span>
                    </label>
                    <input
                        type="text"
                        name="biddingAmount"
                        placeholder="bidding amount"
                        className="input rounded-sm bg-transparent text-black dark:text-slate-300 border border-gray-500 focus:ring-0 focus:outline-none focus:border-main"
                        required
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Deadline</span>
                    </label>
                    <div className="form-control relative">
                        <input
                            type="date"
                            name="deadline"
                            className="input rounded-sm bg-transparent text-black dark:text-slate-300 border border-gray-500 focus:ring-0 focus:outline-none focus:border-main"
                            required
                        />

                        <div className="my-1 text-red-400 font-medium"></div>
                        <span className="absolute top-4 right-2"></span>
                    </div>
                </div>
            </div>
            <div className="form-control mt-6">
                <button type="submit" className="border transition duration-300 hover:scale-95 font-semibold  py-2 rounded-sm border-gray-500">Bid Now</button>
            </div>
        </form>
    );
};

export default BidJobForm;