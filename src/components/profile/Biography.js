const Biography = ({ biography }) => {
    return <p>{biography || "This user leaves his biography blank."}</p>;
};

export default Biography;
