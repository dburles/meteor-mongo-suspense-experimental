/** @jsx jsx */
import { Button } from '@theme-ui/components';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { jsx } from 'theme-ui';
import BooksList from './BooksList';

const Page = () => {
  const [count, setCount] = useState(0);

  useTracker(() => {
    Meteor.subscribe('books');
  });

  return (
    <React.Fragment>
      <div>
        <BooksList />
      </div>
      <Button onClick={() => setCount(count + 1)}>Pressed {count} times</Button>
    </React.Fragment>
  );
};

export default Page;
