import React from "react"
import { StyleSheet, View } from "react-native"

type Tag = {
    name: string
}

type ToggleListProps = {
    title: string,
    tagList: Tag[]
}

const ToggleListCustom:React.FC<ToggleListProps> = ({title,tagList}) => {
    return(
        <View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{

    },
    subject:{

    },
    tagContainer:{

    }
})

export default ToggleListCustom;