import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';

function FilteredOutfitsScreen({ route }) {
  const { outfits } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>Outfits for Today</Text>
      <FlatList
        data={outfits}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export default FilteredOutfitsScreen;
