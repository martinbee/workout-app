import firestore from '@react-native-firebase/firestore';

export default async function generateWorkout({ exerciseIds, name, id }) {
  const exerciseDocs = await Promise.all(
    exerciseIds.map(id => firestore().collection('exercises').doc(id).get())
  );
  // refactor
  const exercises = exerciseDocs.reduce((exercises, doc) => {
    const { sets, ...rest } = doc.data();
    const setsMap = {};

    for (let i = 0; i < doc.data().sets; i++) {
      setsMap[i] = null;
    }

    return {
      ...exercises,
      [doc.id]: { 
        sets: setsMap, 
        ...rest,
      },
    }
  }, {});

  const newWorkout = {
    name,
    workoutPlanId: id,
    userId: '1',
    isActive: true,
    exercises,
  };

  return firestore().collection('workouts').add(newWorkout);
}
