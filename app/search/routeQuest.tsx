import { FlatList, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addRestAreas, incrementPage, toggleFavorite, resetRestAreas, setStartCoord, setEndCoord, setRestAreas } from "../../store/slices/restAreaSlice";
import { getRestAreaAlong, getRestAreaList, postMyFavorite  } from "@/api/RestAreaAPI";
import RestItem from "@/components/ui/RestItem";
import { useEffect, useState } from "react";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import MainHeader from "@/components/ui/MainHeader";
import { RestArea } from "../types/RestArea";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { LocationObject } from "expo-location";

const RouteQuest = () => {
  const dispatch = useDispatch();
  const {location} = useCurrentLocation();
  const { list, page, hasMore, startCoord, endCoord } = useSelector((state: RootState) => state.restArea);
  const userId = useSelector((state: RootState) => state.user.user?.userId);

  const loadRestAreas = async (location:LocationObject) => {
    const data = await getRestAreaList({page, latitude:location.coords.latitude, longitude:location.coords.longitude});
    dispatch(addRestAreas(data));
    dispatch(incrementPage());
  };

  useEffect(()=> {
    if(!location){
      return;
    }
    if (!startCoord || !endCoord) {
      dispatch(resetRestAreas()); 
      loadRestAreas(location);
    }
  },[location, startCoord, endCoord]);

  const onToggleFavorite = async (restAreaId: number) => {
    if (!userId) return;

    const res = await postMyFavorite({ restAreaId, userId });
    if (res.pass) {
      dispatch(toggleFavorite(restAreaId));
    }
  };  

  useEffect(() => {
    
  }, [startCoord, endCoord]);

  return (
    <View style={{ flex: 1 }}>
      <MainHeader isRoute={true}/>
      <FlatList
        data={list}
        extraData={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: RestArea }) => (
          <RestItem
            key={item.id}
            restId={item.id}
            stdRestNm={item.stdRestNm}
            restName={item.restAreaNm}
            gasPrice={item.gasolinePrice}
            diselPrice={item.diselPrice}
            lpgPrice={item.lpgPrice}
            address={item.roadAddress}
            phone={item.phone}
            latitude={item.latitude}
            longitude={item.longitude}
            brands={item.brands}
            facilities={item.facilities}
            foods={item.foods}
            bookMarkChange={() => onToggleFavorite(item.id)}
            isMark={item.isFavorite} 
            reviewAVG={0}          
          />
        )}
        //  onEndReached={() => {
        //   if (hasMore && (!startCoord || !endCoord)) loadRestAreas(); // 좌표 있을 땐 페이지네이션 중지
        // }}
        onEndReachedThreshold={0.7}
        ListFooterComponent={hasMore && (!startCoord || !endCoord) ? <LoadingIndicator /> : null}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
})

export default RouteQuest;