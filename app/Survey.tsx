import ButtonCustom from "@/components/ui/ButtonCustom";
import HeaderCustom from "@/components/ui/HeaderCustom";
import SurveyOption from "@/components/ui/SurveyOption";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View, ScrollView } from "react-native"

const surveyChoice = [
    {name:'전기 충전소'},
    {name:'수소 충전소'},
    {name:'브랜드 매장'},
    {name:'편의시설'},
];

const Survey = () => {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderCustom />
                <Text style={[styles.text,{fontWeight: 700,fontSize:22, width:'85%', margin:'auto'}]}>휴게소 설문조사</Text>
            </View>
            <ScrollView style={styles.contents}>
                <Text style={styles.text}>휴게소에 꼭 있었으면 하는 시설은 무엇인가요?</Text>
                <Text style={[styles.text, {color:Colors.tint, fontSize: 13, marginTop:3, marginBottom: 30}]}>*복수선택 가능</Text>
                
                {
                    surveyChoice.map((item, index) => (
                        <SurveyOption key={index} name={item.name} />
                    ))
                }
            </ScrollView>
            <View style={styles.buttonContainer}>
                <ButtonCustom text="설문조사 완료하기"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    header:{
        borderBottomWidth:1,
        borderBottomColor: Colors.lightGrey,
        height:170,
        paddingBottom: 10
    },
    text:{
        fontFamily:'Paperlogy',
        fontWeight: 400,
        fontSize: 18,
    },
    contents:{
        width: '85%',
        flex:1,
        margin:'auto',
        paddingVertical: 40
    },
    buttonContainer:{
        borderTopColor: Colors.lightGrey,
        borderTopWidth: 1,
        height: 120,
        justifyContent: 'center'
    }
});

export default Survey;