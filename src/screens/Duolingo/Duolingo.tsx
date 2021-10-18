/**
 *
 * https://youtu.be/tHWGKdpj1rs
 *
 */

import React from 'react';
import {View} from '@components';
import WordList from './WordList';
import Word from './Word';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './styles';

const words = [
  {id: 1, word: 'Er'},
  {id: 8, word: 'hungrig'},
  {id: 2, word: 'isst'},
  {id: 7, word: 'er'},
  {id: 6, word: 'weil'},
  {id: 9, word: 'ist'},
  {id: 5, word: ','},
  {id: 3, word: 'einen'},
  {id: 4, word: 'Apfel'},
];

const Duolingo: React.FC<TProps> = () => {
  // Duolingo screen data.

  return (
    <View style={styles.container}>
      <Header />
      <WordList>
        {words.map((word) => (
          <Word key={word.id} {...word} />
        ))}
      </WordList>
      <Footer />
    </View>
  );
};

export default Duolingo;

type TProps = {};
