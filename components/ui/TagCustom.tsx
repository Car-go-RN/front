import { Colors } from "@/constants/Colors";
import { View, Text, Image, StyleSheet } from "react-native"

const TagCustom = () => {
    return(
        <View style={styles.container}>
            <Image style={styles.icon} source={require('@/assets/brands/CU.png')}/>
            <Text style={styles.text}>CU</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 5,
        borderColor: Colors.lightGrey,
        borderWidth: 1,
        marginRight: 5,
        marginBottom:5,
        height: 23
    },
    icon: {
        width: 20,
        height: 10,
        marginTop: 3
    },
    text:{
        fontFamily: 'Paperlogy',
        fontSize: 10,
        paddingTop: 2,
        marginLeft: 5
    }
});

export default TagCustom