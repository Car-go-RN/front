import { StyleSheet, Text, View } from "react-native"
import TagCustom from "./TagCustom";

import { brandImg } from "@/constants/BrandImg";
import { amenities } from "@/constants/TagMock";

const RestDetail = () => {
    return(
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <Text style={[styles.text,styles.subject]}>운영시간</Text>
                <Text style={[styles.text,{paddingTop: 4}]}>09:30~23:30</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={[styles.text,styles.subject]}>주유소</Text>
                <Text style={[styles.text,{paddingTop: 4}]}>경유 1,504원  휘발유 1,639원  LPG 1,117원</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={[styles.text,styles.subject]}>브랜드</Text>
                <View style={styles.tagContainer}><TagCustom name="CU" isbrand={true} icon={brandImg.CU.icon}/><TagCustom  name="던킨도너츠" isbrand={true} icon={brandImg.던킨도너츠.icon}/><TagCustom  name="베스킨라빈스" isbrand={true} icon={brandImg.베스킨라빈스.icon}/></View>
            </View>
            <View style={styles.itemContainer}>
                <Text style={[styles.text,styles.subject]}>편의시설</Text>
                <View style={styles.tagContainer}><TagCustom name="병원" icon={amenities[6].icon} /><TagCustom name="약국" icon={amenities[2].icon} /><TagCustom name="경정비소" icon={amenities[9].icon}/></View>
            </View>
            <View style={[styles.itemContainer,{flexDirection:'column'}]}>
                <Text style={[styles.text,styles.subject]}>메뉴</Text>
                <View style={{marginTop: 15, flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={styles.text}>한우비빔밥</Text>
                    <Text style={styles.text}>15000원</Text>
                </View>
                <View style={{marginTop: 15, flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={styles.text}>육회비빔밥</Text>
                    <Text style={styles.text}>9000원</Text>
                </View>
                <View style={{marginTop: 15, flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={styles.text}>유부우동</Text>
                    <Text style={styles.text}>8500원</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10

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