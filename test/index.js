
/* IMPORT */

const fc = require ( 'fast-check' );
const {describe} = require ( 'fava' );
const {default: Base128} = require ( '../dist' );
const Fixtures = require ( './fixtures' );

/* MAIN */

describe ( 'Base128', it => {

  it ( 'works with strings', t => {

    for ( const fixture of Fixtures ) {

      const encoded = Base128.encodeStr ( fixture );
      const decoded = Base128.decodeStr ( encoded );

      t.is ( decoded, fixture );

    }

  });

  it ( 'works with Uint8Arrays', t => {

    const encoder = new TextEncoder ();

    for ( const fixture of Fixtures ) {

      const fixtureU8 = encoder.encode ( fixture );

      const encoded = Base128.encode ( fixtureU8 );
      const decoded = Base128.decode ( encoded );

      t.deepEqual ( decoded, fixtureU8 );

    }

  });

  it ( 'works with fc-generated codepoints', t => {

    const assert = str => t.is ( Base128.decodeStr ( Base128.encodeStr ( str ) ), str );
    const property = fc.property ( fc.fullUnicode (), assert );

    fc.assert ( property, { numRuns: 1000000 } );

  });

  it ( 'works with fc-generated strings', t => {

    const assert = str => t.is ( Base128.decodeStr ( Base128.encodeStr ( str ) ), str );
    const property = fc.property ( fc.fullUnicodeString (), assert );

    fc.assert ( property, { numRuns: 1000000 } );

  });

  it ( 'can detect base128-encoded strings', t => {

    const fixtures = [
      ['', true],
      ['abc', true],
      ['\u0079', true],
      ['\u0080', false],
      ['\u0000\u00ff', false],
      ['\u0100', false],
      ['\uffff', false],
      ['😃', false],
      ['👪', false]
    ];

    for ( const [fixture, result] of fixtures ) {

      t.is ( Base128.is ( fixture ), result );

    }

  });

});
