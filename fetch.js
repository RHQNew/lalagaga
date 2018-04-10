/**
 * Created by acer acer on 2018/2/24.
 */
const fetchLa=(url,context)=>{
	let myHeaders = new Headers({
		"Content-Type": "application/json"
	});
	let fetchConfig={
		method:'POST',
		headers: myHeaders,
		mode: 'cors',
		body:JSON.stringify(context)
	};
	return fetch(url,fetchConfig)
}
export default fetchLa