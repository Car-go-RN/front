import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { SearchDataType } from "./MainHeader"
import { Colors } from "@/constants/Colors"
import { useRouter } from "expo-router"

const SearchList = ({data, reset}: {data: SearchDataType[], reset: ()=>void}) => {
    const router = useRouter();

    return(
        <View style={style.List}>
        {
            data.length > 0 && 
            <Pressable style={style.closeButton} onPress={()=>reset()}>
                <Text style={{color: Colors.lightGrey, fontSize: 18, fontWeight: 700}}>X</Text>
            </Pressable>
        }
            <ScrollView bounces={false} overScrollMode="never">
                {
                    data.map((item)=> (
                        <Pressable 
                            key={item.id} 
                            style={style.SearchItem}
                            onPress={()=>router.push({pathname:'/RestArea', params: {stdRestNm:item.stdRestNm}})}
                        >
                            <Text>{item.restAreaNm}</Text>
                        </Pressable>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    List:{
        position: 'relative',
        flex: 1,
    },
    SearchItem: {
        display: 'flex',
        height: 50,
        backgroundColor: Colors.backgroundGrey,
        fontSize: 16,
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: Colors.background,
        paddingHorizontal: 30
    },
    closeButton:{
        position: 'absolute',
        right: 20,
        zIndex: 1,
        top: 10
    }
})

export default SearchList