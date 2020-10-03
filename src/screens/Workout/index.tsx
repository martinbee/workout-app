import React from 'react';
import { Card, Text } from 'react-native-paper';

import Page from '../../components/Page';

export default function WorkoutScreen(): JSX.Element {
  return (
    <Page>
      <Card>
        <Card.Content>
          <Text>Workout 1</Text>
        </Card.Content>
      </Card>
    </Page>
  );
}
