import EnableDOMEmulation from 'mocha-jsdom';
import sinon from 'sinon';

export default function withBrowserFunctionality (func) {
  EnableDOMEmulation();
  
  /*
   Monkey patch for JSDom usage with XMLHttpRequest object.
   Bug URL: https://github.com/sinonjs/sinon/issues/657
   */
  global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
  
  func.call(this);
};
