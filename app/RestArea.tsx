import HeaderCustom from "@/components/ui/HeaderCustom";
import RestDetail from "@/components/ui/RestDetail";
import RestReview from "@/components/ui/RestReview";
import RestWriteReview from "@/components/ui/RestWriteReview";
import { Colors } from "@/constants/Colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { StyleSheet, View, Text, Image, Pressable, ScrollView, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native"



const RestArea = () => {
    type navType = 'detail'|'review'|'write';
    const [nav, setNav] = useState<navType>('detail');

    return(
        <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <HeaderCustom />
                    </View>
                    <Image style={styles.restImg} source={require('@/assets/images/test-rest-area.png')}/>
                    <View style={[container.all,container.title,{paddingVertical: 35}]}>
                        <Text style={[styles.text,{fontSize: 24, fontWeight:700}]}>동명휴게소(춘천방향)</Text>
                        <View style={styles.reaction}>
                            <AntDesign name="heart" size={17} color={Colors.lightGrey} style={styles.icon} /><Text style={styles.reactState}>12</Text>
                            <Ionicons name="bookmark" size={17} color={Colors.lightGrey} style={styles.icon} />
                        </View>
                    </View>
                    <View style={[container.all,container.title]}>
                        <Text style={[styles.text,{color:Colors.yellow, fontSize: 16}]}>★★★★☆ 3.0</Text>
                        <Text style={[styles.text,{color:Colors.tint, fontSize: 14, alignSelf:'center'}]}>휴게소까지 거리 28km</Text>
                    </View>
                    <View style={container.nav}>
                        <View style={[container.all,{flexDirection:'row', paddingVertical: 15}]}>
                            <Pressable onPress={()=>setNav('detail')} style={{marginRight: 25}}>
                                <Text 
                                    style={[styles.text, styles.nav, nav=='detail' ? styles.activeNav : undefined]}>상세정보
                                </Text>
                            </Pressable>
                            <Pressable onPress={()=>setNav('review')}><Text style={[styles.text,styles.nav, nav!=='detail' ? styles.activeNav : undefined]}>리뷰</Text></Pressable>
                        </View>
                    </View>
                    
                        <ScrollView style={[container.all, {flex: 1}]}>
                        {
                            nav=='detail' ? (
                                <RestDetail />
                            ) : nav=='review' ?  (
                                <RestReview restAreaName={'동명휴게소'} />
                            ) : (
                                <RestWriteReview setNav={setNav} />
                            )
                        }
                        </ScrollView>
                        
                        {
                            nav!=='write' && (
                                <View style={container.writeButton}>
                                    <Pressable onPress={()=>setNav('write')}><Ionicons name="chatbox-ellipses" size={30} color="white" /></Pressable>
                                </View>
                            )
                        }
                        
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
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
        fontSize: 15
    },
    text: {
        fontFamily: 'Paperlogy'
    },
    nav:{
        fontSize: 14,
        color: Colors.placeholder
    },
    activeNav:{
        color: Colors.tint,
        textDecorationColor: Colors.tint,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline'                                                                     
    }
});

const container = StyleSheet.create({
    all: {
        width: '80%',
        alignSelf: 'center',
    },
    title:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nav: {
        marginVertical: 15,
        borderColor: Colors.lightGrey,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    writeButton:{
        position: 'absolute',
        bottom: 40,
        right: 30,
        backgroundColor: Colors.tint,
        width: 60, 
        height: 60,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
})

export default RestArea;