import { Colors } from "@/constants/Colors"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import TagCustom from "./TagCustom";
import { brandImg } from "@/constants/BrandImg";
import { amenities } from "@/constants/TagMock";

type Brand = {
    name: string,
    logo: string
}

type Amenities = {
    name: string,
    icon: string
}

type restItemProps = {
    img: string,
    name: string,
    review: number,
    via: number,
    gas: number,
    brands: Brand[],
    amenities: Amenities[]
}

const MainRestItem = () => {
    const router = useRouter();
    return(
        <View style={styles.restItem}>
            <Pressable onPress={()=>router.push('/RestArea')}>
            <Image style={styles.restImg} source={require('@/assets/images/test-rest-area.png')}/>
            <View style={styles.restDetail}>
                <Text style={[styles.text,{fontSize:15}]}>동명휴게소(춘천방향)</Text>
                <Text style={[styles.text,{fontSize:13, color: Colors.yellow}]}>★★★★☆</Text>
                <Text style={[styles.text,{marginVertical:3}]}>경유 1,234  휘발유 1,352</Text>
                <View style={styles.row}>
                    <Text style={[styles.text,{marginVertical:3, marginRight:17}]}>브랜드</Text>
                    <View style={styles.tagContainer}>
<<<<<<< Updated upstream
                        <TagCustom isRestItem={true}  name="CU" isbrand={true} icon={brandImg.CU.icon}/>
                        <TagCustom isRestItem={true}  name="던킨도너츠" isbrand={true} icon={brandImg.던킨도너츠.icon}/>
                        <TagCustom isRestItem={true}  name="베스킨라빈스" isbrand={true} icon={brandImg.베스킨라빈스.icon}/>
=======
                        <TagCustom isRestItem={true}  name="CU" isbrand={true} icon={brandImg.CU.icon}/><TagCustom isRestItem={true}  name="던킨도너츠" isbrand={true} icon={brandImg.던킨도너츠.icon}/><TagCustom isRestItem={true}  name="베스킨라빈스" isbrand={true} icon={brandImg.베스킨라빈스.icon}/>
>>>>>>> Stashed changes
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.text,{marginVertical:3, marginRight:8}]}>편의시설</Text>
                    <View style={styles.tagContainer}>
<<<<<<< Updated upstream
                        <TagCustom isRestItem={true} name="병원" icon={amenities[6].icon}/>
                        <TagCustom isRestItem={true} name="약국" icon={amenities[2].icon}/>
                        <TagCustom isRestItem={true} name="경정비소" icon={amenities[9].icon}/>
=======
                        <TagCustom isRestItem={true} name="병원" icon={amenities[6].icon}/><TagCustom isRestItem={true} name="약국" icon={amenities[2].icon}/><TagCustom isRestItem={true} name="경정비소" icon={amenities[9].icon}/>
>>>>>>> Stashed changes
                    </View>
                </View>
            </View>
            <View style={styles.reaction}>
                <AntDesign name="heart" size={15} color={Colors.lightGrey} style={styles.icon} /><Text style={styles.reactState}>12</Text>
                <Entypo name="message" size={15} color={Colors.lightGrey} style={styles.icon} /><Text style={styles.reactState}>12</Text>
                <Ionicons name="bookmark" size={15} color={Colors.lightGrey} style={styles.icon} />
            </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    restItem: {
        width: 180,
        height: 240,
        backgroundColor: 'white',
        borderRadius: 5,
        overflow: 'hidden',
        marginRight: 15
    },
    restImg: {
        width: '100%',
        height: 100
    },
    restDetail: {
        padding: 11,
    },
    text: {
        fontFamily: 'Paperlogy',
        fontWeight: 500,
        fontSize: 10,
    },
    reaction: {
        flexDirection: 'row',
        marginLeft:10
    },
    icon: {
        marginRight: 3
    },
    reactState: {
        color: Colors.lightGrey,
        width: 25,
        fontSize: 12
    },
    row: {
        flexDirection: 'row',
    },
    tagContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap:'wrap',
    },
});

export default MainRestItem;
