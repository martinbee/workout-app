import React, { useState, useEffect } from 'react';
import { Card } from 'react-native-material-ui';
import { View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Exercise from '@components/Exercise';

const Workout = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const getWorkout = async () => {
      try {
        const workoutDoc = await firestore()
          .collection('workouts')
          .doc(navigation.getParam('workoutId', ''))
          .get();
        const workout = {
          id: workoutDoc.id,
          ...workoutDoc.data(),
        };

        setLoading(false);
        setWorkout(workout);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    };

    getWorkout();
  }, []);

  if (loading) return <View><Text>Loading</Text></View>;
  if (error) return <View><Text>{error}</Text></View>;

  if (!workout) return <View><Text>Blank State</Text></View>;

  const exercisesArray = Object.entries(workout.exercises)
    .map(([id, exercise]) => ({ id, ...exercise }));
  
  return (
    <Card style={{ padding: 15 }}>
      {exercisesArray.map(exercise => (
        <Exercise key={exercise.id} exercise={exercise} workoutId={workout.id} />
      ))}
    </Card>
  );
};

export default Workout;
