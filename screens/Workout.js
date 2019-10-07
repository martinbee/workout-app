import React, { Component } from 'react';
import { Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Exercise from '@components/Exercise'

// load workout
// load all exercises
// maybe have a promise.all thing
// maybe have errors and exercisesLoaded in workout and count the exercisesLoaded
// if any errors show error :shrug

// alternative is to set workout on exercise but that seems weird

// how do we handle loading and errors?? is this sufficient?
// no subscription /:
const getAll = async (collectionName, ids) => {
  const docs = await Promise.all(ids.map(id => firestore().collection(collectionName).doc(id).get()));
  return docs;
};

export default class Workout extends Component {
  state = {
    exercises: [],
    isLoading: true,
    hasError: false,
  };

  async componentDidMount() {
    try {
      const workout = await firestore()
        .collection('workouts')
        .doc(this.props.navigation.getParam('workoutId', ''))
        .get();
      
      console.log(workout);
      const exercises = await getAll('exercises', workout.data().exercises);
      console.log(exercises);

      this.setState({ 
        isLoading: false,
        exercises, 
      });

    //   this.subscriptionHandler = firestore()
    //     .collection('exercises')
    //     .doc(this.props.exerciseId)
    //     .onSnapshot((exercise) => {
    //       this.setState({
    //         isLoading: false,
    //         exercise,
    //       });
    //     }, (error) => {
    //       console.log(error); // add bugsnag later
    //       this.setState({
    //         isLoading: false,
    //         hasError: true,
    //       });
    //     });
    //     this.setState({
    //       isLoading: false,
    //       workout,
    //     });
    } catch (e) {
      this.setState({
        isLoading: false,
        hasError: true,
      });
    }
  }

  render() {
    const {
      isLoading,
      hasError,
      exercises,
    } = this.state;

    if (isLoading) return <Text>Loading...</Text>;
    if (hasError) return <Text>Error!</Text>;
    if (!exercises.length) return <Text>Could not get workout data.</Text>;

    return exercises.map(exercise => <Text key={exercise.id}>{exercise.data().name}</Text>);
  }
}
