import cityBikeImg from "../assets/city-bikes.jpeg";

export const HomePageInfoCard = () => {
    return (
        <div className="w-full py-8">
            <h1 className="py-5 text-4xl font-bold text-center">City Bikes</h1>
            <img
                className="w-full max-w-[700px] mx-auto px-4"
                src={cityBikeImg}
                alt="city bikes"
            />
            <p className="p-8">
                Welcome to our City Bike service! We're proud to offer a
                convenient, eco-friendly transportation option that's loved by
                thousands of happy customers. With hundreds of stations
                scattered across the city, you're never far from your next ride.
                Our bikes are not only a green alternative that contributes to a
                healthier environment, but they also provide a fun and efficient
                way to navigate the city. Join us in making our city cleaner,
                greener, and more connected. Enjoy the ride!
            </p>
        </div>
    );
};
