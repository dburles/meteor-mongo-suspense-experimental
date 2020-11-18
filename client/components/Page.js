/** @jsx jsx */
import { Button } from '@theme-ui/components';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { jsx } from 'theme-ui';
import queryCache from '../queryCache';
import BooksList from './BooksList';

const Page = () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useTracker(() => {
    Meteor.subscribe('books');
  });

  return (
    <React.Fragment>
      <button
        onClick={() => {
          setVisible(!visible);
          console.log(queryCache);
        }}
      >
        {visible ? 'Hide' : 'Show'}
      </button>
      <div>{visible && <BooksList />}</div>
      <Button onClick={() => setCount(count + 1)}>Pressed {count} times</Button>
    </React.Fragment>
  );
};

export default Page;
