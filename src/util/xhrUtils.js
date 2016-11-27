export function executeXHR(properties) {
  let xhr = new XMLHttpRequest();
  xhr.open(properties.method, properties.endpoint, true);
  xhr.onload = properties.action.bind(this, xhr);
  
  if(properties.errorCallback) {
    xhr.addEventListener('error', properties.errorCallback);
  }
  
  if(properties.contentType) {
    xhr.setRequestHeader("Content-Type", properties.contentType);
  }
  
  xhr.send(properties.data);
}
