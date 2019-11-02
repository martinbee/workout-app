// grab all workout plans (no sub)
// on click of workout plan, create workout and then route to workout
// workout: grab workout and then sub to all exercises
// if modifying weight, update exercise,
// only on finish of workout do we save weight

import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { View, Text } from 'react-native';
import { Button } from 'react-native-material-ui';

const WorkoutPlans = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [workoutPlans, setWorkoutPlans] = useState([]);

  useEffect(() => {
    const getWorkoutPlans = async () => {
      try {
        const workoutPlansQuery = await firestore().collection('workoutPlans')
          .where('userId', '==', '1')
          .get();

        setLoading(false);
        setWorkoutPlans(workoutPlansQuery.docs);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    };

    getWorkoutPlans();
  }, []);

  if (loading) return <View><Text>Loading</Text></View>;
  if (error) return <View><Text>{error}</Text></View>;

  if (workoutPlans.empty) return <View><Text>Blank State</Text></View>;

  return workoutPlans.map((plan, index) => {
    if (!plan.exists) return null;

    const usePrimaryColor = index % 2 === 0;
    const { name } = plan.data();

    return (
      <Button 
        raised
        primary={usePrimaryColor} 
        onPress={() => console.log(name)}
        // onPress={() => navigation.navigate('Workout', { workoutId, workoutName: name })} // create workout
        text={name}
      />
    );
  });
};

export default WorkoutPlans;
