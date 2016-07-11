import React, { Component } from 'react';
import ChainedSelect from './ChainedSelect';
import { MARKS } from '../constants/marks';

const carsSelectsStates = [
  { name: 'mark', value: '', key: 'marks' },
  { name: 'model', value: '', key: 'models' },
  { name: 'volume', value: '', key: 'engines' },
  { name: 'type', value: '', key: 'types' }
];

const departmentsSelectsStates = [
  { name: 'department', value: '', key: 'departments' },
  { name: 'name', value: 'key', key: 'employees' }
];

const departments = [
  {
    department: 'QA',
    employees: [
      'Mila K.',
      'Yaroslav F.',
      'Yaraslav V.'
    ]
  },
  {
    department: 'Front-end',
    employees: [
      'Roman V.',
      'Sergey C.',
      'Sergey F.',
      'Anton B.',
      'Anton K.',
      'Grigory K.'
    ]
  }
];

export default class App extends Component {
  render() {
    return (
      <div>
        <ChainedSelect name="cars" states={carsSelectsStates} data={MARKS} />
        <ChainedSelect name="departments" states={departmentsSelectsStates} data={departments} />
      </div>
    );
  }
}
