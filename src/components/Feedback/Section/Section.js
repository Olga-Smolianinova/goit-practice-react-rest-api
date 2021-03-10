import React from 'react';

import PropTypes from 'prop-types';

const Section = ({ title, children }) => {
  return (
    <section className="Section">
      <h2 className="Title">{title}</h2>
      {children}
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Section;
