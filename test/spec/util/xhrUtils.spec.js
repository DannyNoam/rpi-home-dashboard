import {executeXHR} from '../../../src/util/xhrUtils.js';
import {expect, sinon} from '../../util/testUtils';
import withBrowserFunctionality from '../../lib/withBrowserFunctionality';

withBrowserFunctionality(() => {
  
  describe('Given the xhrUtils utility file', () => {
    const ENDPOINT = "http://www.test.com";
    const METHOD = "GET";
    const DATA = "DATA";
    const ACTION = sinon.spy();
    const ERROR_CALLBACK = sinon.spy();
    const CONTENT_TYPE = "CONTENT_TYPE";
    
    describe('when the executeXHR function is called', () => {
      let xhr,
        requests,
        sentData;
      
      before(() => {
        xhr = global.XMLHttpRequest;
        requests = [];
        sentData = [];
        
        xhr.onCreate = function (xhr) {
          requests.push(xhr);
        };
        
        xhr.prototype.send = function (data) {
          sentData.push(data);
        };
      });
      
      describe('with the four mandatory properties passed in (method, endpoint, action, data) with NO optional properties' +
        '(errorCallback, contentType)', () => {
        before(() => {
          executeXHR({
            method: METHOD,
            endpoint: ENDPOINT,
            action: ACTION,
            data: DATA
          });
        });
        
        it('should open exactly ONE XMLHttpRequest', () => {
          expect(requests.length).to.equal(1);
        });
        
        it('should open an XMLHttpRequest with the correct method', () => {
          expect(requests[0].method).to.equal(METHOD);
        });
  
        it('should open an XMLHttpRequest with the correct URL', () => {
          expect(requests[0].url).to.equal(ENDPOINT);
        });
  
        it('should open an XMLHttpRequest in an asynchronous fashion', () => {
          expect(requests[0].async).to.be.true;
        });
  
        it('should set the onload function of the XMLHttpRequest', () => {
          expect(requests[0].onload).to.not.be.undefined;
        });
        
        it('should invoke the send method of the XMLHttpRequest with the given data as its argument', () => {
          expect(sentData.length).to.equal(1);
          expect(sentData[0]).to.equal(DATA);
        });
  
        it('should NOT set an error callback on the XMLHttpRequest object', () => {
          expect(requests[0].eventListeners.error[1]).to.be.undefined;
        });
  
        it('should NOT set the content type on the XMLHttpRequest object', () => {
          expect(requests[0].requestHeaders["Content-Type"]).to.be.undefined;
        });
        
        describe('and with the two optional properties additionally passed in (errorCallback, contentType)', () => {
          before(() => {
            requests = [];

            executeXHR({
              method: METHOD,
              endpoint: ENDPOINT,
              action: ACTION,
              data: DATA,
              errorCallback: ERROR_CALLBACK,
              contentType: CONTENT_TYPE
            });
          });

          it('should set the error callback for the XMLHttpRequest', () => {
            expect(requests[0].eventListeners.error[1]).to.equal(ERROR_CALLBACK);
          });

          it('should set the content type for the XMLHttpRequest', () => {
            expect(requests[0].requestHeaders["Content-Type"]).to.equal(CONTENT_TYPE);
          });
        });
      });
    });
  });
});
