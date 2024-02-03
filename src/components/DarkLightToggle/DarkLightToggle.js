"use client";
import React from 'react';
import VisuallyHidden from '../VisuallyHidden';
import { Moon, Sun } from 'react-feather';
import Cookie from 'js-cookie';
import { DARK_TOKENS, LIGHT_TOKENS } from '@/constants';

import styles from './DarkLightToggle.module.css';

function DarkLightToggle({ initialTheme }) {
  const [theme, setTheme] = React.useState(initialTheme);

  const Icon = (theme === 'light') ? Sun : Moon;

  function handleClick() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    Cookie.set('color-theme', nextTheme, {
      expires: 1000,
    });

    const root = document.documentElement;
    root.setAttribute(
      'data-color-theme',
      nextTheme
    );
    const newTokens = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;

    Object.entries(newTokens).forEach(
      ([key, val]) => {
        root.style.setProperty(key, val);
      }
    );
  }

  return (
    <button
      className={styles.action}
      onClick={handleClick}
    >
      <Icon size="1.5rem" />
      <VisuallyHidden>
        Toggle dark / light mode
      </VisuallyHidden>
    </button>
  )
}

export default DarkLightToggle;
