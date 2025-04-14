import { Colors } from "@/constants/Colors"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";

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
                <Text style={[styles.text,{marginVertical:3}]}>브랜드</Text>
                <Text style={[styles.text,{marginVertical:3}]}>편의시설</Text>
            </View>
            <View style={styles.reaction}>
                <AntDesign name="heart" size={15} color={Colors.lightGrey} style={styles.icon} /><Text style={styles.reactState}>12</Text>
                <Entypo name="message" size={15} color={Colors.lightGrey} style={styles.icon} /><Text style={styles.reactState}>12</Text>
                <Ionicons name="bookmark" size={15} color={Colors.lightGrey} style={styles.icon} /><Text style={styles.reactState}>12</Text>
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
    }
});

export default MainRestItem;