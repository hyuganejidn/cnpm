import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

export default function AnimatedMulti(props) {
  return (
    <Select
      closeMenuOnSelect={true}
      components={animatedComponents}
      {...props}
    />
  );
}
