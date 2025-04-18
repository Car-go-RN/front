import React, { useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import TagCustom from "./TagCustom"
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from "@/constants/Colors";

type Tag = {
    name: string
}

type ToggleListProps = {
    title: string,
    tagList: Tag[]
}

const ToggleListCustom:React.FC<ToggleListProps> = ({title,tagList}) => {
    const [open, setOpen] = useState(false);
    return(
        <View style={styles.container}>
            <View style={styles.subjectContainer}>
                <Pressable onPress={()=>setOpen(!open)}>
                    {
                        open ? (
                            <AntDesign name="caretdown" size={13} color={Colors.placeholderGreen} />
                        ) : (
                            <AntDesign name="caretright" size={13} color={Colors.placeholderGreen} />
                        )
                    }
                </Pressable>
                <Text style={styles.subject}>{title}</Text>
            </View>
            {
                open && (
                    <View style={styles.tagContainer}>
                        {
                            tagList.map((item, index)=>(
                                <TagCustom key={index} name={item.name} select={true}/>
                            ))
                        }
                    </View>
                )
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingBottom: 30
    },
    subjectContainer:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.placeholder,
        paddingBottom: 10
    },
    subject:{
        fontFamily: 'Paperlogy',
        fontSize: 15,
        fontWeight: 600,
        marginLeft: 7,
        color: Colors.grey
    },
    tagContainer:{
        flexDirection: 'row',
        marginTop: 15,
        marginLeft: 20,
        flexWrap: 'wrap'
    }
})

export default ToggleListCustom;