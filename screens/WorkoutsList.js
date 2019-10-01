import React, { Component } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Button } from 'react-native-material-ui';

const WorkoutButton = ({ navigation, workoutId, name, usePrimary }) => (
  <Button 
    raised
    primary={usePrimary} 
    onPress={() => navigation.navigate('Workout', { workoutId, workoutName: name })}
    text={name} 
  /> 
);

// is sub necessary?
export default class WorkoutsList extends Component {
  state = {
    workouts: [],
    error: null,
  };

  async componentDidMount () {
    this.subscriptionHandlers = [
      this.subscribeToWorkouts(),
    ];
  }

  componentWillUnmount() {
    this.subscriptionHandlers.forEach(subscriptionHandler => subscriptionHandler())
  }

  subscribeToWorkouts() {
    return firestore()
      .collection('workouts')
      .onSnapshot((querySnapshot) => {
        this.setState({
          workouts: querySnapshot.docs,
        });
      }, (error) => {
        this.setState({
          workouts: [],
          error,
        });
      })
  }

  render() {
    return this.state.workouts.map((workout, index) => {
      if (!workout.exists) return null;

      const usePrimary = index % 2 === 0;

      return (
        <WorkoutButton 
          key={workout.id}
          navigation={this.props.navigation} 
          usePrimary={usePrimary}
          workoutId={workout.id}
          {...workout.data()}
        />
      );
    });
  }
}
