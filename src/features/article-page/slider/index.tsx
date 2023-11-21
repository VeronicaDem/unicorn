import ImageInterface from "@/shared/image/ImageInterface";
import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import Carousel from "react-material-ui-carousel";
interface SliderProps extends PropsWithChildren {
    img: ImageInterface[]
}

const Slider: FC<SliderProps> = (props) => {
    return (
        <Carousel
            animation="slide"
            interval={5000}
            cycleNavigation={true}
            sx={{ width: 350, height: 200 }}
        >
            {props.img.map((img) => {
                return <Image src={img.src} alt={img.alt} />
            })}
        </Carousel>
    )
}
export default Slider;

function Image({ src, alt }: { src: string, alt?: string }) {
    return (<Box
        component="div"
        sx={{ backgroundImage: `url(${src})`, backgroundSize: "cover", width: 350, height: 200 }}

    />)
}