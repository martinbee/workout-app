import React, { Component } from 'react';
import { Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default class Exercise extends Component {
  state = {
    exercise: null,
    isLoading: true,
    hasError: false,
  };

  componentDidMount() {
    this.subscriptionHandler = firestore()
      .collection('exercises')
      .doc(this.props.exerciseId)
      .onSnapshot((exercise) => {
        this.setState({
          isLoading: false,
          exercise,
        });
      }, (error) => {
        console.log(error); // add bugsnag later
        this.setState({
          isLoading: false,
          hasError: true,
        });
      });
  }

  componentWillUnmount() {
    this.subscriptionHandler();
  }

  render() {
    const {
      isLoading,
      hasError,
      exercise,
    } = this.state;
    const { exerciseId } = this.props;

    if (isLoading) return <Text key={exerciseId}>Loading...</Text>;
    if (hasError) return <Text key={exerciseId}>Error!</Text>;
    if (!exercise) return <Text key={exerciseId}>Could not get exercise data.</Text>;

    return <Text key={exerciseId}>{exercise.data().name}</Text>;
  }
}
