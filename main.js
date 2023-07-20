import { client } from "@gradio/client";

const input = document.getElementById("input")

let result
let img = document.getElementById("img")


input.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const blob = new Blob([file],  { type: file?.type });
            
  const app = await client("https://saadshahrour-classification2.hf.space/");
  result = await app.predict("/predict", [
        blob, 	// blob in 'img' Image component
	]);

  let fileReader = new FileReader();
  fileReader.onloadend = (e) => {
    img.src = fileReader.result;
  }
  fileReader.readAsDataURL(file);
  console.log(img);
    
  document.getElementById("app").innerHTML += `
  <h2> the image is for a ${result?.data[0].label} </h2>
  `

  document.getElementById("img").style.display = 'block'

})







