export default function Complex(x, y) {
    this.re = x;
    this.im = y;
    return this;
}

Complex.cadd = function (a, b) {
    return Complex(a.re+b.re, a.im+b.im);
}

Complex.csub = function (a, b) {
    return Complex(a.re-b.re, a.im-b.im);
}

Complex.cmul = function (a, b) {
    return Complex(a.re*b.re-a.im*b.im, a.re*b.im+a.im*b.re);
}

Complex.cdiv = function (a, b) {
    const r2 = b.re*b.re + b.im*b.im;
    return Complex((a.re*b.re+a.im*b.im)/r2, (-a.re*b.im+a.im*b.re)/r2);
}

Complex.cconj = function (a) {
    return Complex(a.re, -a.im);
}

Complex.cexp = function (a) {
    return Complex(Math.exp(a.re)*Math.cos(a.im),Math.exp(a.re)*Math.sin(a.im));

}

Complex.clog = function (a) {
    const r2 = a.re*a.re + a.im*a.im;
    return Complex(0.5*Math.log(r2), Math.atan2(a.im,a.re));
}

Complex.cpow = function (a, b) {
    return Complex.cexp(Complex.cmul(Complex.clog(a),b));
}

Complex.cabs = function (a) {
    return Math.sqrt(a.re*a.re+a.im*a.im);
}

Complex.carg = function (a) {
    return Math.atan2(a.im,a.re);
}

// https://sci.tea-nifty.com/blog/2010/05/javascript-c0b8.html
