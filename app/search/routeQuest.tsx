import MainHeader from "@/components/ui/MainHeader";
import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import RestItem from "@/components/ui/RestItem";

const RouteQuest = () => {
  return (
    <View>
      <MainHeader isRoute={true}/>
      <View style={styles.container}>       
        <RestItem />
        <RestItem />
        <RestItem />
        <RestItem />
      </View>
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