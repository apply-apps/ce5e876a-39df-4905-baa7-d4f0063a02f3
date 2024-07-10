// Filename: index.js
// Combined code from all files

import React from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, ActivityIndicator, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

const TweetList = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.post(API_URL, {
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant. Please provide answers for given requests.',
            },
            {
              role: 'user',
              content: 'Generate 5 sample tweets with usernames, profile pictures, and content.',
            },
          ],
          model: 'gpt-4o',
        });
        const resultString = response.data.response;
        const tweetsData = JSON.parse(resultString); // Assuming the response is in JSON format
        setTweets(tweetsData);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {tweets.map((tweet, index) => (
        <View key={index} style={styles.tweet}>
          <Image source={{ uri: tweet.profilePicture }} style={styles.profileImage} />
          <View style={styles.tweetContent}>
            <Text style={styles.username}>{tweet.username}</Text>
            <Text style={styles.content}>{tweet.content}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    padding: 10,
  },
  tweet: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  tweetContent: {
    marginLeft: 10,
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    color: '#333',
  },
});

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Twitter Clone</Text>
      <TweetList />
    </SafeAreaView>
  );
}

export default App;