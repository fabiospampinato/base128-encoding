
/* MAIN */

const Uint7Array = {

  /* API */

  encode: ( bits: Uint8Array ): Uint8Array => {

    const uint7 = new Uint8Array ( Math.ceil ( bits.length / 7 ) + 1 );

    for ( let cursor = 0, i = 0, l = bits.length; i < l; i += 7 ) {

      const b1 = bits[i];
      const b2 = bits[i + 1] | 0;
      const b3 = bits[i + 2] | 0;
      const b4 = bits[i + 3] | 0;
      const b5 = bits[i + 4] | 0;
      const b6 = bits[i + 5] | 0;
      const b7 = bits[i + 6] | 0;

      uint7[cursor++] = ( b1 << 6 ) | ( b2 << 5 ) | ( b3 << 4 ) | ( b4 << 3 ) | ( b5 << 2 ) | ( b6 << 1 ) | b7;

    }

    uint7[uint7.length - 1] = 7 - ( ( bits.length % 7 ) || 7 ); // The last item contains the number of extra bits used for padding, that should be trimmed when decoding

    return uint7;

  },

  decode: ( uint7: Uint8Array ): Uint8Array => {

    const bits = new Uint8Array ( Math.max ( 0, ( ( uint7.length - 1 ) * 7 ) - ( uint7[uint7.length - 1] || 0 ) ) );

    for ( let cursor = 0, i = 0, l = uint7.length - 1; i < l; i++ ) {

      const byte = uint7[i];

      bits[cursor++] = ( byte >> 6 ) & 1;
      bits[cursor++] = ( byte >> 5 ) & 1;
      bits[cursor++] = ( byte >> 4 ) & 1;
      bits[cursor++] = ( byte >> 3 ) & 1;
      bits[cursor++] = ( byte >> 2 ) & 1;
      bits[cursor++] = ( byte >> 1 ) & 1;
      bits[cursor++] = byte & 1;

    }

    return bits;

  }

};

/* EXPORT */

export default Uint7Array;
