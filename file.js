let btn=document.querySelector("#sendBtn");
let Feedback=document.querySelector("#feedback");
let word=document.querySelector("#userInput");
let messageList=document.querySelector("#messageList");
let count=0;



btn.addEventListener("click",async()=>{
    let  url=`https://api.api-ninjas.com/v1/profanityfilter?text=${word.value}`;
     console.log(word.value);
    let response=await fetch(url,{
        headers:{
            "X-Api-Key": "tnzikRGiraER4TTBITtjuA==naBKsCtw0mxfWSWG"
        }
    });
    let data=await response.json();
    console.log(data);
       let censoredCount = (data.censored.match(/\*{3,}/g) || []).length;
    console.log("Censored words:", censoredCount);

    let detect=document.createElement("p");
    // ❌ Block if 2 or more bad words found
    if (censoredCount >= 2) {
        detect.innerText = "❌ Message blocked: too many bad words.";
        detect.style.color = "red";
        detect.style.fontWeight = "bold";
        Feedback.appendChild(detect);
        return;
    }

       if(censoredCount<2 && data.has_profanity===true){

        detect.innerText = "⚠️ Profanity detected, but message allowed";
        detect.style.color = "orange";
        Feedback.appendChild(detect);

         if (messageList.children.length >= 5) {
            messageList.removeChild(messageList.firstElementChild);
        }


       let para=document.createElement("p");
         para.innerText=`-${data.censored}`;
        para.style.color="green";
       
        para.style.fontWeight="bold";
        para.style.fontSize="16px";

         messageList.appendChild(para);
    
    }
   
    if(data.has_profanity===false ){

         if (messageList.children.length >= 5) {
            messageList.removeChild(messageList.firstElementChild);
        }


       let para=document.createElement("p");
         para.innerText=`-${word.value}`;
        para.style.color="green";
        Feedback.innerText="No profanity found";
        para.style.fontWeight="bold";
        para.style.fontSize="20px";

         messageList.appendChild(para);
    
    }
    
})

