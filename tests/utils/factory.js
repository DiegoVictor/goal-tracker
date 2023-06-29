import { faker } from '@faker-js/faker';
import factory from 'factory-girl';

factory.define('Goal', {}, () => {
  const done = faker.datatype.boolean();
  return {
    id: () => faker.date.past().getTime(),
    title: faker.lorem.words,
    description: faker.lorem.sentence,
    deadline: faker.date.future,
    done,
    completedAt: () => (done ? faker.date.past() : ''),
    tasks: [
      {
        id: () => faker.date.past().getTime(),
        title: faker.lorem.words,
        done,
        completedAt: () => (done ? faker.date.past() : ''),
      },
    ],
  };
});

export default factory;
