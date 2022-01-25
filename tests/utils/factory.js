import faker from 'faker';
import factory from 'factory-girl';

factory.define('Goal', {}, () => {
  const done = faker.datatype.boolean();
  return {
    id: () => faker.date.past().getTime(),
    title: faker.name.title,
    description: faker.lorem.sentence,
    deadline: faker.date.future,
    done,
    completedAt: () => (done ? faker.date.past() : ''),
    tasks: [
      {
        id: () => faker.date.past().getTime(),
        title: faker.name.title,
        done,
        completedAt: () => (done ? faker.date.past() : ''),
      },
    ],
  };
});

export default factory;
