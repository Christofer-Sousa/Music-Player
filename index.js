import songs_list from "./src/music_list.js"

let music_name = document.querySelector("#musicName");
let music_image = document.querySelector("#music_image");
let play_btn = document.querySelector("#play"); // Botão de play
let prev_btn = document.querySelector("#pre"); // Botão de voltar a musica
let next_btn = document.querySelector("#next"); // Botão de proxima
let range = document.querySelector("#range"); // Barra de tempo da musica
let play_img = document.querySelector("#play_img") // IMG do Botão Play
let total_time = 0;
let recent_volume = document.querySelector(".volume");
let index_music = 0; // Tempo total da musica
let currentTime = 0; // Tempo atual
let isPlaying = false; // Definindo se esta tocando ou não 
let song = new Audio(); // song recebendo a classe Audio
window.onload = playSong; // quando carregar a pagina, chama a função playsong q ativa tudo

function playSong(){

    let all_Songs = songs_list;//Lista das musicas


    function load_track(index){
        song.src = all_Songs[index].path;//Local
        music_name.innerHTML = all_Songs[index].name;//Nome
        music_image.src = "./src/IMG/music_img/image.jpg"; //Image
    }

    recent_volume.addEventListener("change", function(){
        song.volume = recent_volume.value / 100
    })

    load_track(index_music)

    prev_btn.addEventListener("click", function(){

        if(index_music == 0){
            index_music = 0    
        }else {
            load_track(index_music - 1)
            index_music -= 1
        }
        song.play()
        play_img.src = "./src/IMG/pause.png"
        isPlaying = true;
        
    })
    next_btn.addEventListener("click", function(){
        
        if(index_music == songs_list.length - 1){
            index_music = 0;
            load_track(index_music)
        }else {
            load_track(index_music + 1)
            index_music += 1
        }
        song.play()
        play_img.src = "./src/IMG/pause.png"
        isPlaying = true;
    })

    
    play_btn.addEventListener("click", function(){
        if(!isPlaying){
            song.play()
            song.volume = recent_volume.value / 100
            isPlaying = true;
            total_time = song.duration;
            range.max = total_time;
            play_img.src = "./src/IMG/pause.png";
        }else {
            song.pause();
            isPlaying = false;
            play_img.src = "./src/IMG/play.png"
        }
    })

    song.addEventListener("timeupdate", function(){
        range.value = song.currentTime;
        range.max = song.duration;
    })

    range.addEventListener("change", function(){
        song.currentTime = range.value;
    })
    song.addEventListener("ended", function(){

        if(index_music < songs_list.length - 1){
            song.currentTime = 0;
            load_track(index_music += 1)
            song.play()
            isPlaying = true;
            range.value = 0;
            play_img.src = "./src/IMG/pause.png"
        }else{
            song.pause();
            play_img.src = "./src/IMG/play.png"
            isPlaying = false;
            range.value = 0;
            song.currentTime = 0;
        }
        
    })
}
