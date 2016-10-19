export function executeXHR(method, endpoint, action, data, contentType) {
	let xhr = new XMLHttpRequest();

	xhr.open(method, endpoint, true);
    xhr.onload = action.bind(this, xhr);
    if(contentType) {
      xhr.setRequestHeader("Content-Type", contentType);
    }
    xhr.send(data);
}
