import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from '../components/Select';
import { setChainedSelectState } from '../actions';

/**
 * @typedef {Object} Option
 * @prop {string} name
 * @prop {string} value
 */

/**
 * @typedef {Option[]} Options
 */

/**
 * @typedef {Object} SelectState
 * @property {string} name название селекта (ключ, по которому в объекте опций можно получить наименование опции)
 * @property {string} value значение селекта
 * @property {string} key название свойство, по которому в данных можно получить список опций селекта
 */

/**
 * Рекурсивно проходит по структуре данных,
 * предполагается, что данные для следующего селекта
 * зранятся в свойствах текущего.
 *
 * {
 *  marks: [
 *    {
 *      "mark": "BMW",
 *      "models": [
 *        {
 *          "model": "X1",
 *          "engines": [
 *            {
 *              "volume": "3.2"
 *              "types": [
 *                "Бензиновый",
 *                "Дизельный"
 *              ]
 *            },
 *            ...
 *          ]
 *        },
 *        ...
 *      ]
 *    },
 *    ...
 *  ]
 * }
 *
 * @function
 * @param {Options[]} result список массивов опций отображаемых селектов
 * @param {Object} data данные, из которых будут строиться селекты
 * @param {SelectState[]} states список данных для отображения селектов
 *
 */
const addOptions = (result, data, states) => {
  const currentState = states[0];

  if (!currentState) {
    return;
  }

  let current;

  result.push(data[currentState.key].map((el) => {
    if (typeof el !== 'object') {
      return { name: el, value: el };
    }

    const name = el[currentState.name];

    if (name === currentState.value) {
      current = el;
    }

    return { name, value: name };
  }));

  if (current) {
    addOptions(result, current, states.slice(1));
  }
}

const mapStateToProps = (state, ownState) => {
  let data = ownState.data
  let states = state.chainedSelect[ownState.name] || ownState.states;
  let options = [];

  if (Array.isArray(data)) {
    data = {
      [states[0].key]: data
    };
  }

  addOptions(options, data, states, true);

  return {
    data: data,
    states,
    options
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    onChange(name, state) {
      dispatch(setChainedSelectState(name, state));
    }
  };
};

class ChainedSelect extends Component {
  static propTypes = {
    states: PropTypes.array.isRequired,
    options: PropTypes.array.isRequired,
    data: PropTypes.object
  }

  // если ChainedSelect несколько, не обновляем компоненты,
  // которые не менялись
  shouldComponentUpdate(nextProps) {
    return nextProps.states !== this.props.states;
  }

  onChange(el) {
    const { onChange, states } = this.props;
    const { name, value } = el.target;

    let isClear = false;

    const newStates = states.map((state) => {
      let isChanged = false;

      if (state.name === name) {
        state.value = value;
        isChanged = true;
        isClear = true;
      }

      // для всех следующих (после измененного) селектов в цепочке сбрасываем установленные значения
      if (isClear && !isChanged) {
        state.value = '';
      }

      return state;
    });

    onChange(this.props.name, newStates);
  }

  render() {
    const { states, options } = this.props;

    return (
      <div className="chained-select">
        {states.map((select, i) => {
          return (<Select
            key={i}
            name={select.name}
            value={select.value}
            options={options[i] || []}
            onChange={::this.onChange}
          />);
        })}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChainedSelect);
