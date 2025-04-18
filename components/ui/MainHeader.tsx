import { Colors } from "@/constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { View, StyleSheet, Text, Pressable, TextInput } from "react-native";
import CategoryCustom from "./CategoryCustom";


const MainHeader = () => {
    return(
        <View>
            <View style={styles.header}>
                <View style={styles.container}>
                    <Text style={styles.text}><Text style={styles.textBold}>카Go바지</Text>를 통해{'\n'}편하게 쉴 수 있는 휴게소를{'\n'}<Text style={styles.textBold}>추천</Text> 받아보세요!</Text>
                    <Pressable><Ionicons name="person-outline" size={24} color="white" /></Pressable>
                </View>
                <View style={styles.searchBox}>
                    <Pressable><AntDesign name="search1" size={18} color={Colors.placeholderGreen} /></Pressable>
                    <TextInput 
                        style={styles.searchInput}
                        placeholder="검색어/키워드를 입력해 보세요."
                        placeholderTextColor={Colors.placeholderGreen}
                    />
                </View>
            </View>
            <CategoryCustom />
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: Colors.tint,
        width: '100%',
        height: 200

    },
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: 50,
        marginBottom: 18,
        width: '85%',
        alignSelf:'center'
    },
    text:{
        fontFamily: 'Paperlogy',
        fontSize: 16,
        fontWeight: 400,
        color: Colors.background,
        lineHeight: 23,
    },
    textBold:{
        fontWeight: 600
    },
    searchBox:{
        width: '85%',
        height: 40,
        backgroundColor: Colors.tintDark,
        alignSelf:'center',
        alignItems:'center',
        borderRadius: 5,
        paddingHorizontal: 10,
        display:'flex',
        flexDirection:'row'
    },
    searchInput:{
        fontFamily:'Paperlogy',
        fontSize: 14,
        paddingLeft:10
    }
});

export default MainHeader;