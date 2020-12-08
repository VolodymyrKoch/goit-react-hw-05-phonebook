import React from 'react';
import PropTypes from 'prop-types';
import classes from './Filter.module.css';
import { CSSTransition } from 'react-transition-group';
import '../../components/anime.css';

export default function Filter({ filter, filterRender }) {
  return (
    <CSSTransition
      in={true}
      timeout={1000}
      appear={true}
      classNames="filterAnime"
      unmountOnExit
    >
      <label>
        <h2 className={classes.title}>Filter</h2>
        <input
          type="text"
          name="filter"
          placeholder="Finder"
          value={filter}
          onChange={e => filterRender(e.target.value)}
        />
      </label>
    </CSSTransition>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  filterRender: PropTypes.func.isRequired,
};
