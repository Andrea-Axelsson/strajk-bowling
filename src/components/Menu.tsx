import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ onClickMenu }: { onClickMenu: () => void }) => {
  return (
    <section className="menu__container">
      <article className="menu__content">
        <Link className="no-underline" to="/booking">
          <h2 onClick={onClickMenu}>BOOKING</h2>
        </Link>
        <Link className="no-underline" to="/confirmation">
          <h2 onClick={onClickMenu}>CONFIRMATION</h2>
        </Link>
      </article>
    </section>
  );
};

export default Menu;