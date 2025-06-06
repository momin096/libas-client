import NewArrivals from "../components/NewArrivals/NewArrivals";
import NavBar from "../components/shared/NavBar";
import Slider from "../components/Slider/Slider";

const Home = () => {
    return (
        <div>
            <Slider />
            <NewArrivals />
        </div>
    );
};

export default Home;