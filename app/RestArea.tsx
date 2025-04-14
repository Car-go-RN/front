import HeaderCustom from "@/components/ui/HeaderCustom";
import { Colors } from "@/constants/Colors";
import { StyleSheet, View, Text, Image } from "react-native"

const RestArea = () => {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderCustom isDetail={true} />
            </View>
            <Image style={styles.restImg} source={require('@/assets/images/test-rest-area.png')}/>
            <Text>asㅇㄻㄴㅇㅇ</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'fixed',
        width: '100%',
        zIndex: 1
    },
    container: {
        backgroundColor: Colors.background,
        flex: 1,
        zIndex: 0
    },
    restImg: {
        width: '100%',
        height: 250
    }
});

export default RestArea;