let audio = document.querySelector('.quranPlayer'),
    surahsContainer = document.querySelector('.surahs'),
    ayah = document.querySelector('.ayah'),
    next = document.querySelector('.next'),
    prev = document.querySelector('.prev'),
    play = document.querySelector('.play')
    
    getSurahs()
      
const isPlay = false;
function getSurahs() {
    fetch('https://quran-endpoint.vercel.app/quran')
        .then(res => res.json())
        .then(data => {
            // console.log(data.data)
            for (let surah in data.data) {
                // console.log(data.data[surah].asma.en.short)
                surahsContainer.innerHTML +=
              ` 
                 <div>
                    <p>${data.data[surah].asma.ar.long}</p>
                     <p>${data.data[surah].asma.en.long}</p>
                </div>
               `
            }
            let allSurahs= document.querySelectorAll('.surahs div'),
            ayahAudios,
            ayahText;
            //  console.log(allS)
            allSurahs.forEach((surah,index)=>{
                surah.addEventListener('click',()=>{
                    fetch(`https://quran-endpoint.vercel.app/quran/${index +1}`)
                    .then(res =>res.json())
                    .then(data =>{
                        let ayahs =data.data.ayahs
                        ayahAudios=[],
                        ayahText= [];
                        ayahs.forEach((onlyAyah)=>{
                            ayahAudios.push(onlyAyah.audio.url)
                            ayahText.push(onlyAyah.text.ar)
                           
                        })

                        let ayahIndex = 0;
                        changeAyah(ayahIndex)
                        audio.addEventListener('ended',()=>{
                            ayahIndex++
                            if(ayahIndex < ayahAudios.length){
                                changeAyah(ayahIndex)
                                // ayahIndex++
                            }
                            else{
                                ayahIndex = 0
                                changeAyah(ayahIndex)
                                alert("خلصت")
                                audio.pause();
                            }


                        })
                        next.addEventListener('click',()=>{
                            ayahIndex < ayahAudios.length -1 ? ayahIndex++ : ayahIndex=0
                            changeAyah(ayahIndex)
                        })
                        prev.addEventListener('click',()=>{
                            ayahIndex > 0 ? ayahIndex-- : ayahIndex= ayahAudios.length -1
                            changeAyah(ayahIndex)
                        })

                        let isPlay =false;
                        function toggle(){
                            if(isPlay){
                                audio.pause()
                                play.innerHTML = `<i class="fas fa-play">`
                                isPlay= false
                            } else{
                                audio.play()
                                play.innerHTML = `<i class="fas fa-pause">`
                                isPlay= true
                            }
                        }
                        play.addEventListener('click',toggle)



                        function changeAyah(index){

                            ayah.innerHTML = ayahText[index];
                            audio.src = ayahAudios[index]
                        }
                        
                    })
                })
            })

            
        })
}

// audio.play()
// next.addEventListener('click',()=>{
//     ayahIndex++
//     ayah.innerHTML = ayahText[ayahIndex];
// audio.src = ayahAudios[ayahIndex]
// audio.play()
// })

// prev.addEventListener('click',()=>{
//     ayahIndex--
//     ayah.innerHTML = ayahText[ayahIndex];
// audio.src = ayahAudios[ayahIndex]
// audio.play()
// })
// play.addEventListener('click',()=>{
//     isPlay != isPlay
//     ayah.innerHTML = ayahText[ayahIndex];
// audio.src = ayahAudios[ayahIndex]
// {isPlay && audio.play()}
// })








