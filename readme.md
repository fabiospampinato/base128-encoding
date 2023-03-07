# Base128

Base128 encoding, the intersection of latin1 and utf-8, which is basically ASCII, the most memory-efficient string encoding that can be written to disk as utf-8 without ballooning in size.

## Comparison

> Note: This works differently from the "ascii" encoding of Node's Buffer, which isn't really an encoding since you can't convert back and forth from it without losing data in general.

In JavaScript there are 3 noteworthy encodings for encoding arbitrary binary data to string: base64, base128, and [base256](https://github.com/fabiospampinato/base256-encoding).

- **base64**: it uses only 64 out of 256 characters that can be encoded with 1 byte, it's therefore memory inefficient, but it produces human-friendly and url-friendly strings.
- **base256**: it uses all 256 characters that can be encoded with 1 byte, it's therefore the most memory efficient encoding, but it produces human-unfriendly strings and when persistented to disk it's only efficient as long as the latin1 encoding is used when writing the file, otherwise it will balloon in size. Most notably you can't import a latin1-encoded JS file, so this is not the most appropriate encoding for shipping a binary blob with your library.
- **base128**: it uses the first 128 out of 256 characters that can be encoded with 1 byte, it's therefore not the most memory efficient encoding and it still produces human-unfriendly strings, but it's a subset of both latin1 and utf-8, that means it's the most efficient encoding for embedding a binary blob with your library in a JS file that you can just import without issues.

## Install

```sh
npm install --save base128-encoding
```

## Usage

```ts
import Base128 from 'base128-encoding';

// Uint8Array encoding & decoding

{
  const raw = 'Hello 😃';
  const uint8 = new TextEncoder ().encode ( raw );
  console.log ( uint8 ); // => Uint8Array(10) [ 72, 101, 108, 108, 111,  32, 240, 159, 152, 131 ]

  const encoded = Base128.encode ( uint8 );
  console.log ( encoded ); // => '$\x19-Fc<ApOf\x100\x04'

  const decoded = Base128.decodeStr ( encoded );
  console.log ( decoded ); // => // => Uint8Array(10) [ 72, 101, 108, 108, 111,  32, 240, 159, 152, 131 ]
}

// String encoding & decoding

{
  const raw = 'Hello 😃';
  const encoded = Base128.encodeStr ( raw );
  console.log ( encoded ); // => '$\x19-Fc<ApOf\x100\x04'

  const decoded = Base128.decodeStr ( encoded );
  console.log ( decoded ); // => 'Hello 😃'
}

// Check if a string is base128-encoded

{
  console.log ( Base128.is ( 'Hello' ) ); // => true
  console.log ( Base128.is ( '😃' ) ); // => false
}
```

## License

MIT © Fabio Spampinato
