
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-center md:w-4/12 mb-10">
            <p className="text-yellow-500 ">---{subHeading}---</p>
            <h3 className="text-4xl uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;