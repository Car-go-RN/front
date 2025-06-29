import { ScrollView, StyleSheet, Text, View } from "react-native"
import TagCustom from "./TagCustom";

import { brandImg } from "@/constants/BrandImg";
import { RestInfo } from "@/app/RestArea";
import { AmenitiesIcon } from "@/constants/AmenitiesIcon";

const RestDetail = ({data}:{data:RestInfo}) => {
    return(
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <Text style={[styles.text,styles.subject]}>운영시간</Text>
                <Text style={[styles.text,{paddingTop: 4}]}>09:30~23:30</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={[styles.text,styles.subject]}>주유소</Text>
                <Text style={[styles.text,{paddingTop: 4}]}>경유 {data.diselPrice}  휘발유 {data.gasolinePrice}  LPG {data.lpgPrice}</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={[styles.text,styles.subject]}>브랜드</Text>
                <View style={styles.tagContainer}>
                {
                    data.brands.map((brand)=>{
                        if(!brandImg[brand])return;
                        return <TagCustom key={brand} name={brand} isbrand={true} icon={brandImg[brand].icon}/>
                    })
                }
                </View>
            </View>
            <View style={styles.itemContainer}>
                <Text style={[styles.text,styles.subject]}>편의시설</Text>
                <View style={styles.tagContainer}>
                {
                    data.facilities.map((facil)=>{
                        if(!AmenitiesIcon[facil])return;
                        return <TagCustom key={facil} name={facil} icon={AmenitiesIcon[facil].icon}/>
                    })
                }
                </View>
            </View>
            <View style={[styles.itemContainer,{flexDirection:'column'}]}>
                <Text style={[styles.text,styles.subject]}>메뉴</Text>
                {
                    data.foods.map((food) => (
                        <View key={food.foodNm} style={{marginTop: 15, flexDirection: 'row', justifyContent:'space-between'}}>
                            <Text style={styles.text}>{food.foodNm}</Text>
                            <Text style={styles.text}>{food.foodCost}원</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    text:{
        fontFamily: 'Paperlogy',
        fontWeight: "400",
        fontSize: 13
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 20
    },
    subject:{
        fontSize: 17,
        fontWeight: 700,
        width: 75
    },
    tagContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap:'wrap'
    }
})


export default RestDetail;