import cityBikeImg from "../assets/city-bikes.jpeg";

export const HomePageInfoCard = () => {
    return (
        <div className="w-full py-12">
            <h1 className="py-5 text-4xl font-bold text-center">City Bikes</h1>
            <img
                className="w-full max-w-[700px] mx-auto px-4"
                src={cityBikeImg}
                alt="city bikes"
            />
            <p className="p-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita reiciendis labore nihil, vel vitae, animi distinctio
                earum ab, accusantium beatae nostrum sit consectetur deserunt.
                Consectetur quo adipisci totam tenetur obcaecati. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Iusto nostrum illo
                doloremque sequi, eveniet aliquam molestias cumque ullam
                incidunt, hic saepe veritatis nihil, rerum natus ducimus aperiam
                atque at fugit?
            </p>
        </div>
    );
};
