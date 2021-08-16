
/* MAIN */

const Uint1Array = {

  /* API */

  encode: ( bytes: Uint8Array ): Uint8Array => {

    const bits = new Uint8Array ( bytes.length * 8 );

    for ( let cursor = 0, i = 0, l = bytes.length; i < l; i++ ) {

      const byte = bytes[i];

      bits[cursor++] = ( byte >> 7 ) & 1;
      bits[cursor++] = ( byte >> 6 ) & 1;
      bits[cursor++] = ( byte >> 5 ) & 1;
      bits[cursor++] = ( byte >> 4 ) & 1;
      bits[cursor++] = ( byte >> 3 ) & 1;
      bits[cursor++] = ( byte >> 2 ) & 1;
      bits[cursor++] = ( byte >> 1 ) & 1;
      bits[cursor++] = byte & 1;

    }

    return bits;

  },

  decode: ( bits: Uint8Array ): Uint8Array => {

    const bytes = new Uint8Array ( Math.ceil ( bits.length / 8 ) );

    for ( let cursor = 0, i = 0, l = bits.length; i < l; i += 8 ) {

      const b1 = bits[i];
      const b2 = bits[i + 1] | 0;
      const b3 = bits[i + 2] | 0;
      const b4 = bits[i + 3] | 0;
      const b5 = bits[i + 4] | 0;
      const b6 = bits[i + 5] | 0;
      const b7 = bits[i + 6] | 0;
      const b8 = bits[i + 7] | 0;

      bytes[cursor++] = ( b1 << 7 ) | ( b2 << 6 ) | ( b3 << 5 ) | ( b4 << 4 ) | ( b5 << 3 ) | ( b6 << 2 ) | ( b7 << 1 ) | b8;

    }

    return bytes;

  }

};

/* EXPORT */

export default Uint1Array;
