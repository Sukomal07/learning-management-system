import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Particle = ({ option }) => {
    const particlesInit = async (main) => {
        await loadFull(main);
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={option}
        />
    );
};

export default Particle;
