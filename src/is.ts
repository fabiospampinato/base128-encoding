
/* MAIN */

const is = ( data: string ): boolean => {

  return !/[\u0080-\uffff]/.test ( data );

};

/* EXPORT */

export default is;
