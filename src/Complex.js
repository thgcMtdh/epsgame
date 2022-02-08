export default class Complex {
  constructor(re, im) {
    this.re = re;
    this.im = im;
  }

  static cadd (a, b) {
    return new Complex(a.re+b.re, a.im+b.im);
  }
  
  static csub (a, b) {
    return new Complex(a.re-b.re, a.im-b.im);
  }
  
  static cmul (a, b) {
    return new Complex(a.re*b.re-a.im*b.im, a.re*b.im+a.im*b.re);
  }
  
  static cdiv (a, b) {
    const r2 = b.re*b.re + b.im*b.im;
    return new Complex((a.re*b.re+a.im*b.im)/r2, (-a.re*b.im+a.im*b.re)/r2);
  }
  
  static cconj (a) {
    return new Complex(a.re, -a.im);
  }
  
  static cexp (a) {
    return new Complex(Math.exp(a.re)*Math.cos(a.im),Math.exp(a.re)*Math.sin(a.im));
  
  }
  
  static clog (a) {
    const r2 = a.re*a.re + a.im*a.im;
    return new Complex(0.5*Math.log(r2), Math.atan2(a.im,a.re));
  }
  
  static cpow (a, b) {
    return this.cexp(this.cmul(this.clog(a),b));
  }
  
  static cabs (a) {
    return Math.sqrt(a.re*a.re+a.im*a.im);
  }
  
  static carg (a) {
    return Math.atan2(a.im,a.re);
  }

}



// https://sci.tea-nifty.com/blog/2010/05/javascript-c0b8.html
