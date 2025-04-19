import * as React from "react";
import { Dimensions, Image, ImageSourcePropType, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";
import bn1 from "@/assets/images/banner/bn1.jpg"
import bn2 from "@/assets/images/banner/bn2.jpg";
import bn3 from "@/assets/images/banner/bn3.jpg";
const data2 = [...new Array(6).keys()];
const width = Dimensions.get("window").width;
const data = [
    {
        id: 1,
        image: bn1,
    },
    {
        id: 2,
        image: bn2,
    },
    {
        id: 3,
        image: bn3,
    }
];

function BannerHome() {
    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            /**
             * Calculate the difference between the current index and the target index
             * to ensure that the carousel scrolls to the nearest index
             */
            count: index - progress.value,
            animated: true,
        });
    };

    return (
        <View style={{ flex: 1, marginTop:35 }}>
            <Carousel
                ref={ref}
                width={width}
                height={width / 4}
                data={data}
                onProgressChange={progress}
                renderItem={({ item, index }) => (

                    <View>
                        <Image style={{
                            width: width,
                            height: width / 3.7,

                            resizeMode: "cover"
                        }} source={item.image} />

                    </View>
                )}
            />

            <Pagination.Basic
                progress={progress}
                data={data}
                dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50, height: 5, width: 5 }}
                containerStyle={{ gap: 5, marginTop: 10 }}
                onPress={onPressPagination}
            />
        </View>
    );
}

export default BannerHome;