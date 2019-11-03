// grab all workout plans (no sub)
// on click of workout plan, create workout and then route to workout
// workout: grab workout and then sub to all exercises
// if modifying weight, update exercise,
// only on finish of workout do we save weight

import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { View, Text } from 'react-native';
import { Button } from 'react-native-material-ui';

async function generateWorkout(plan) {
  const { id, name, exerciseIds } = plan;
  const exerciseDocs = await Promise.all(
    exerciseIds.map(id => firestore().collection('exercises').doc(id).get())
  );
  const exercises = exerciseDocs.reduce((exercises, doc) => ({
    id: doc.id,
    ...doc.data(),
  }), {});
  const newWorkout = {
    name,
    workoutPlanId: id,
    userId: '1',
    isActive: true,
    exercises,
  };

  return firestore().collection('workouts').add(newWorkout);
}

const WorkoutPlans = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [workoutPlans, setWorkoutPlans] = useState([]);

  // this is a temp hack until I figure out sign in/sign out control logic and move this to that same spot
  useEffect(() => {
    const getActiveWorkouts = async () => {
      const activeWorkoutsQuery = await firestore()
        .collection('workouts')
        .where('userId', '==', '1')
        .where('isActive', '==', true)
        .get();

      if (!activeWorkoutsQuery.empty) {
        const activeWorkout = activeWorkoutsQuery.docs[0];

        navigation.navigate('Workout', { 
          workoutId: activeWorkout.id, 
          workoutName: activeWorkout.data().name,
        });
      }
    };

    getActiveWorkouts();
  }, []);

  useEffect(() => {
    const getWorkoutPlans = async () => {
      try {
        const workoutPlansQuery = await firestore()
          .collection('workoutPlans')
          .where('userId', '==', '1')
          .get();
        const workoutPlans = workoutPlansQuery.docs
          .map(workout => ({ id: workout.id, ...workout.data() }))

        setLoading(false);
        setWorkoutPlans(workoutPlans);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    };

    getWorkoutPlans();
  }, []);

  if (loading) return <View><Text>Loading</Text></View>;
  if (error) return <View><Text>{error}</Text></View>;

  if (!workoutPlans.length) return <View><Text>Blank State</Text></View>;

  return workoutPlans.map((plan, index) => {
    const usePrimaryColor = index % 2 === 0;
    const { id, name } = plan;

    return (
      <Button 
        key={id}
        raised
        primary={usePrimaryColor} 
        onPress={async () => {  // probably should debounce here
          const newWorkout = await generateWorkout(plan);

          navigation.navigate('Workout', { 
            workoutId: newWorkout.id, 
            workoutName: name 
          });
        }}
        text={name}
      />
    );
  });
};

export default WorkoutPlans;
