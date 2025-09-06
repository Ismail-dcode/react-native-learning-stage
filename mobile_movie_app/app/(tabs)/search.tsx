import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import { useRouter } from 'expo-router'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'
import { updateSeachCount } from '@/services/appwrite'

const search = () => {

  const [searchQuery, setSearchQuery] = useState('')
  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset
  } = useFetch(() => fetchMovies({
    query: searchQuery

  }), false);

  useEffect(() => {


    const timeOutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();

        if (movies?.length > 0 && movies?.[0]) {
          await updateSeachCount(searchQuery, movies[0]);
        }
        } else {
          reset()
        }
      }, 500)
    return () => clearTimeout(timeOutId);
  }, [searchQuery])


  return (
    <View className='flex-1 bg-primary '>
      <Image source={images.bg} className=" flex-1 absolute w-full z-0"
        resizeMode='cover' />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard{...item} />}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}

        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className='flex-row mt-20 justify-center items-center'>
              <Image source={icons.logo} className="w-12 h-10 mt-20 " />
            </View>
            <View className='my-5'>
              <SearchBar placeholder='Search For Movies...'
                value={searchQuery}
                onCHangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className='my-3'
              />
            )}
            {error && (
              <Text className='text-red px-5 my-3'>
                Error: {error.message}
              </Text>
            )}

            {
              !loading && !error && 'searchQuery'.trim()
              && movies?.length > 0 && (
                <Text className='text-white text-xl font-bold '>
                  Search Results for{' '}
                  <Text className='text-accent'>{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className='mt-10 px-5' >
              <Text className='text-center text-gray-500'>
                {searchQuery.trim() ? 'No results found for ' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}

export default search