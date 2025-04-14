import MainHeader from "@/components/ui/MainHeader";
import { Colors } from "@/constants/Colors";
import { StyleSheet, View, ScrollView } from "react-native";
import RestItem from "@/components/ui/RestItem";

const list = [{id:1},{id:2},{id:3},{id:4}]

const RouteQuest = () => {
  return (
    <View>
      <MainHeader isRoute={true}/>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>       
        {
            list.map((item)=>(
              <RestItem />
            ))
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    marginLeft:20,
  }, 
})
  
export default RouteQuest;