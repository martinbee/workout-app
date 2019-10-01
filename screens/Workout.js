import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Workout = ({ navigation }) => {
  const [workout, setWorkout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    return firestore()
      .collection('workouts')
      .doc(navigation.getParam('workoutId', ''))
      .onSnapshot((workoutDoc) => {
        if (workoutDoc.exists) setWorkout(workoutDoc);
        setIsLoading(false);
      }, (error) => {
        console.log(error); // add bugsnag later
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  // header
  // exercises map

  if (isLoading) return <Text>Loading...</Text>;
  if (hasError) return <Text>Error!</Text>;
  if (!workout) return <Text>Could not find workout</Text>;

  console.log(workout);

  return (
    <View>
      <Text>
        {workout.data().exercises[0]}
      </Text>
    </View>
  );
};

export default Workout;
