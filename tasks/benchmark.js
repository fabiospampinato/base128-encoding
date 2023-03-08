
/* IMPORT */

import benchmark from 'benchloop';
import fs from 'node:fs';
import U8 from 'uint8-encoding';
import Base128 from '../dist/index.js';

/* HELPERS */

const WAP = fs.readFileSync ( './tasks/fixture.txt', 'utf8' );
const WAP_UINT8 = U8.encode ( WAP );
const WAP_ENCODED = Base128.encodeStr ( WAP );
const WAP_ENCODED_UINT8 = Base128.encode ( WAP_UINT8 );

/* MAIN */

benchmark.config ({
  iterations: 1
});

benchmark ({
  name: 'encode',
  fn: () => {
    Base128.encode ( WAP_UINT8 );
  }
});

benchmark ({
  name: 'encodeStr',
  fn: () => {
    Base128.encode ( WAP );
  }
});

benchmark ({
  name: 'decode',
  fn: () => {
    Base128.decode ( WAP_ENCODED_UINT8 );
  }
});

benchmark ({
  name: 'decodeStr',
  fn: () => {
    Base128.decode ( WAP_ENCODED );
  }
});

benchmark ({
  name: 'is',
  fn: () => {
    Base128.is ( WAP_ENCODED );
  }
});

benchmark.summary ();
