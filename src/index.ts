
/* IMPORT */

import fromCharCodes from 'string-from-charcodes';
import U8 from 'uint8-encoding';
import is from './is';
import Uint1Array from './uint1array';
import Uint7Array from './uint7array';

/* MAIN */

const Base128 = {

  /* API */

  encode: ( data: Uint8Array ): string => {

    return fromCharCodes ( Uint7Array.encode ( Uint1Array.encode ( data ) ) );

  },

  encodeStr: ( data: string ): string => {

    return Base128.encode ( U8.encode ( data ) );

  },

  decode: ( data: string ): Uint8Array => {

    const uint7 = new Uint8Array ( data.length );

    for ( let i = 0, l = data.length; i < l; i++ ) {

      uint7[i] = data.charCodeAt ( i );

    }

    return Uint1Array.decode ( Uint7Array.decode ( uint7 ) );

  },

  decodeStr: ( data: string ): string => {

    return U8.decode ( Base128.decode ( data ) );

  },

  is

};

/* EXPORT */

export default Base128;
