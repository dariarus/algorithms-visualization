import React from 'react';
import renderer from 'react-test-renderer';

import { Circle } from './circle';
import {ElementStates} from "../../../types/element-states";

it('Circle without letter', () => {
  const tree = renderer
    .create(<Circle />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle with letter', () => {
  const tree = renderer
    .create(<Circle symbol="A" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle with head', () => {
  const tree = renderer
    .create(<Circle head="head" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle with head has react-element inside', () => {
  const tree = renderer
    .create(<Circle head={<Circle isSmall={true} />} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle with tail', () => {
  const tree = renderer
    .create(<Circle tail="tail" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle with tail has react-element inside', () => {
  const tree = renderer
    .create(<Circle tail={<Circle isSmall={true} />} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle with index', () => {
  const tree = renderer
    .create(<Circle index={1} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle is small', () => {
  const tree = renderer
    .create(<Circle isSmall={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle in Default state', () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Default} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle in Changing state', () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Changing} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle in Modified state', () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Modified} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});